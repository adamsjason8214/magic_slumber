import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
  approved: boolean;
}

// GET - Fetch all approved reviews
export async function GET() {
  try {
    const reviews = await kv.get<Review[]>("reviews") || [];
    const approvedReviews = reviews.filter(r => r.approved);
    return NextResponse.json(approvedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json([]);
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "Name, rating, and review text are required" },
        { status: 400 }
      );
    }

    const newReview: Review = {
      id: `review_${Date.now()}`,
      name,
      location: location || "Orlando, FL",
      rating: Math.min(5, Math.max(1, rating)),
      text,
      createdAt: new Date().toISOString(),
      approved: true, // Auto-approve for now, change to false for moderation
    };

    const reviews = await kv.get<Review[]>("reviews") || [];
    reviews.unshift(newReview);
    await kv.set("reviews", reviews);

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
