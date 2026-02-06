import { NextRequest, NextResponse } from "next/server";
import { stripe, toStripeAmount } from "@/lib/stripe";
import { products, DELIVERY_FEE, DEPOSIT_AMOUNT, calculateItemPrice, validatePromoCode, calculatePromoDiscount } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo, nights, promoCode } = body;

    // Validate promo code if provided
    const promo = promoCode ? validatePromoCode(promoCode, nights) : null;

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Calculate base subtotal
    let baseSubtotal = 0;
    const itemsWithPrices = items.map((item: { productId: string; quantity: number; nights: number }) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      const itemPrice = calculateItemPrice(product, nights);
      baseSubtotal += itemPrice * item.quantity;
      return { product, item, itemPrice };
    });

    // Calculate promo discount
    const promoResult = promoCode ? calculatePromoDiscount(promoCode, baseSubtotal, nights) : { discountAmount: 0, isFixedTotal: false };

    // Build line items for Stripe
    const lineItems = itemsWithPrices.map(({ product, item, itemPrice }: { product: typeof products[0]; item: { quantity: number }; itemPrice: number }) => {
      // For fixed_total promo, we set a minimal price and handle the total separately
      let finalPrice = itemPrice;
      if (promoResult.isFixedTotal && promoResult.fixedTotal !== undefined) {
        // Distribute the fixed total across items proportionally
        finalPrice = (promoResult.fixedTotal / items.length) / item.quantity;
      } else if (promo && promo.type === "percentage") {
        finalPrice = itemPrice * (1 - promo.value / 100);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: promo ? `${nights} night rental (${promo.description})` : `${nights} night rental`,
          },
          unit_amount: toStripeAmount(Math.max(0.01, finalPrice)),
        },
        quantity: item.quantity,
      };
    });

    // Add delivery fee
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
          description: "Resort delivery and pickup",
        },
        unit_amount: toStripeAmount(DELIVERY_FEE),
      },
      quantity: 1,
    });

    // Add security deposit
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Security Deposit (Refundable)",
          description: "Refunded within 5-7 days after items returned in good condition",
        },
        unit_amount: toStripeAmount(DEPOSIT_AMOUNT),
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
      customer_email: customerInfo.email,
      metadata: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        resortName: customerInfo.resortName,
        resortAddress: customerInfo.resortAddress || "",
        roomNumber: customerInfo.roomNumber || "",
        checkInDate: customerInfo.checkInDate,
        checkOutDate: customerInfo.checkOutDate,
        deliveryTime: customerInfo.deliveryTime,
        specialRequests: customerInfo.specialRequests || "",
        nights: nights.toString(),
        items: JSON.stringify(items),
        promoCode: promoCode || "",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
