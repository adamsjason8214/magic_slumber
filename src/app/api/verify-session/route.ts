import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { verified: false, error: "No session ID provided" },
      { status: 400 }
    );
  }

  try {
    // Verify the session with Stripe
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { verified: false, error: "Invalid session" },
        { status: 400 }
      );
    }

    const session = await response.json();

    // Check if payment was successful
    if (session.payment_status === "paid" && session.status === "complete") {
      return NextResponse.json({
        verified: true,
        customerEmail: session.customer_details?.email || session.customer_email,
        orderDescription: session.metadata?.orderDescription || "",
      });
    }

    return NextResponse.json(
      { verified: false, error: "Payment not completed" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { verified: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
