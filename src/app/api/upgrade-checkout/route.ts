import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe, toStripeAmount } from "@/lib/stripe";
import { ULTIMATE_BUNDLE_DAILY_RATE, SLUMBER_POD_DAILY_RATE, SLUMBER_TOT_DAILY_RATE } from "@/lib/products";

const UpgradeSchema = z.object({
  originalSessionId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = UpgradeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { originalSessionId } = parseResult.data;

    // Retrieve original session from Stripe
    const originalSession = await stripe.checkout.sessions.retrieve(originalSessionId);

    if (originalSession.payment_status !== "paid" || originalSession.status !== "complete") {
      return NextResponse.json({ error: "Original payment not completed" }, { status: 400 });
    }

    const metadata = originalSession.metadata;
    if (!metadata) {
      return NextResponse.json({ error: "Original order data not found" }, { status: 400 });
    }

    // Parse items from original order
    let items: Array<{ productId: string; quantity: number }> = [];
    try {
      items = JSON.parse(metadata.items || "[]");
    } catch {
      items = [];
    }

    const nights = parseInt(metadata.nights || "1");

    // Validate upgrade eligibility
    const upgradeableItem = items.find(
      i => (i.productId === "slumber-pod" || i.productId === "slumber-tot") && i.quantity === 1
    );
    const hasBundle = items.some(i => i.productId === "ultimate-bundle");

    if (!upgradeableItem || hasBundle || items.length !== 1) {
      return NextResponse.json({ error: "Order not eligible for upgrade" }, { status: 400 });
    }

    // Calculate upgrade price difference (no tax, no delivery, no service fee)
    const originalRate = upgradeableItem.productId === "slumber-pod"
      ? SLUMBER_POD_DAILY_RATE
      : SLUMBER_TOT_DAILY_RATE;
    const priceDifference = (ULTIMATE_BUNDLE_DAILY_RATE - originalRate) * nights;

    const originalProductName = upgradeableItem.productId === "slumber-pod"
      ? "Slumber Pod" : "Slumber Tot";

    // Build base URL
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://magicalslumber.com";
    baseUrl = baseUrl.trim().replace(/\/$/, "");
    if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
      baseUrl = "https://" + baseUrl;
    }

    // Create Stripe checkout session - ONLY the price difference, no fees
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Bundle Upgrade",
              description: `Upgrade from ${originalProductName} to Ultimate Slumber Bundle - ${nights} night${nights > 1 ? "s" : ""} ($${(ULTIMATE_BUNDLE_DAILY_RATE - originalRate).toFixed(2)}/night difference)`,
            },
            unit_amount: toStripeAmount(priceDifference),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/upgrade?session_id=${originalSessionId}`,
      customer_email: metadata.email,
      metadata: {
        type: "upgrade",
        originalSessionId,
        originalProductId: upgradeableItem.productId,
        firstName: metadata.firstName || "",
        lastName: metadata.lastName || "",
        email: metadata.email || "",
        phone: metadata.phone || "",
        resortName: metadata.resortName || "",
        resortAddress: metadata.resortAddress || "",
        checkInDate: metadata.checkInDate || "",
        checkOutDate: metadata.checkOutDate || "",
        deliveryTime: metadata.deliveryTime || "",
        nights: nights.toString(),
        items: JSON.stringify([{ productId: "ultimate-bundle", quantity: 1 }]),
        orderDescription: `Bundle Upgrade (from ${originalProductName}) - ${nights} night${nights > 1 ? "s" : ""}`,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Upgrade checkout error:", error);
    return NextResponse.json(
      { error: "Unable to process upgrade. Please try again." },
      { status: 500 }
    );
  }
}
