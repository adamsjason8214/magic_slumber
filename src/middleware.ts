import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create rate limiter using Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limits per route type
const apiRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 requests per minute for API
  analytics: true,
  prefix: "ratelimit:api",
});

const checkoutRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 checkout attempts per minute
  analytics: true,
  prefix: "ratelimit:checkout",
});

// Get client IP from request
function getIP(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0].trim() : "127.0.0.1";
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only rate limit API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = getIP(request);

  // Use stricter rate limit for checkout endpoint
  const limiter = pathname === "/api/checkout" ? checkoutRatelimit : apiRatelimit;
  const identifier = `${ip}:${pathname}`;

  try {
    const { success, limit, reset, remaining } = await limiter.limit(identifier);

    // Add rate limit headers to response
    const response = success
      ? NextResponse.next()
      : NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );

    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());

    return response;
  } catch (error) {
    // If rate limiting fails (Redis down), allow the request
    console.error("Rate limiting error:", error);
    return NextResponse.next();
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/api/:path*"],
};
