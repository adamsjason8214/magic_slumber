import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface Review {
  id: string;
  name: string;
  email?: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
  ownerResponse?: string;
  ownerResponseDate?: string;
}

// GET - Fetch all reviews
export async function GET() {
  try {
    const reviews = await redis.get<Review[]>("reviews") || [];
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json([]);
  }
}

// POST - Submit a new review (auto-approved)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, location, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "Name, rating, and review text are required" },
        { status: 400 }
      );
    }

    const newReview: Review = {
      id: `review_${Date.now()}`,
      name,
      email: email || undefined,
      location: location || "Orlando, FL",
      rating: Math.min(5, Math.max(1, rating)),
      text,
      createdAt: new Date().toISOString(),
    };

    const reviews = await redis.get<Review[]>("reviews") || [];
    reviews.unshift(newReview);
    await redis.set("reviews", reviews);

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// PATCH - Add owner response to a review
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, response, adminKey } = body;

    // Simple admin key check (you can change this in Vercel env vars)
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== "magicalslumber2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviews = await redis.get<Review[]>("reviews") || [];
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    reviews[reviewIndex].ownerResponse = response;
    reviews[reviewIndex].ownerResponseDate = new Date().toISOString();
    await redis.set("reviews", reviews);

    return NextResponse.json({ success: true, review: reviews[reviewIndex] });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
