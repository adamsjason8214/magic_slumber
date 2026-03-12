import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Redis credentials not configured");
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

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
    const redis = getRedis();
    const reviews = await redis.get<Review[]>("reviews") || [];
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json([]);
  }
}

// Sanitize string input - remove any potential HTML/script tags
function sanitizeString(str: string | undefined | null): string {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").trim().substring(0, 1000);
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

    // Sanitize all user input
    const sanitizedName = sanitizeString(name).substring(0, 100);
    const sanitizedLocation = sanitizeString(location).substring(0, 100) || "Orlando, FL";
    const sanitizedText = sanitizeString(text);

    const newReview: Review = {
      id: `review_${Date.now()}`,
      name: sanitizedName,
      email: email || undefined,
      location: sanitizedLocation,
      rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
      text: sanitizedText,
      createdAt: new Date().toISOString(),
      ownerResponse: "Thank you for choosing Magical Slumber Orlando! We appreciate your feedback and look forward to helping your family sleep soundly on your next visit!",
      ownerResponseDate: new Date().toISOString(),
    };

    const redis = getRedis();
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

    // Admin key check - ONLY use environment variable
    if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const redis = getRedis();
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
