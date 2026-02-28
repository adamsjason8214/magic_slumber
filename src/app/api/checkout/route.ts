import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe, toStripeAmount } from "@/lib/stripe";
import { products, DELIVERY_FEE, SALES_TAX_RATE, SURCHARGE_RATE, calculateItemPrice, validatePromoCode, calculatePromoDiscount } from "@/lib/products";

// Input validation schema
const CheckoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(10),
  })).nonempty("Cart cannot be empty"),
  customerInfo: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10).max(20),
    resortName: z.string().min(1).max(200),
    resortAddress: z.string().max(500).optional(),
    checkInDate: z.string().min(1),
    checkOutDate: z.string().min(1),
    deliveryTime: z.string().min(1),
    specialRequests: z.string().max(1000).optional(),
  }),
  nights: z.number().int().min(1).max(30),
  promoCode: z.string().max(50).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parseResult = CheckoutSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { items, customerInfo, nights, promoCode } = parseResult.data;

    // Validate promo code if provided
    const promo = promoCode ? validatePromoCode(promoCode, nights) : null;

    // Calculate base subtotal
    let baseSubtotal = 0;
    const itemsWithPrices = items.map((item) => {
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
    let lineItems: Array<{
      price_data: {
        currency: string;
        product_data: { name: string; description: string };
        unit_amount: number;
      };
      quantity: number;
    }> = [];

    // For fixed_total promo (test mode), charge only the fixed amount
    if (promoResult.isFixedTotal && promoResult.fixedTotal !== undefined) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Order",
            description: `${nights} night rental (${promo?.description || "Test discount"})`,
          },
          unit_amount: toStripeAmount(promoResult.fixedTotal),
        },
        quantity: 1,
      });
    } else {
      // Normal pricing - add each product
      lineItems = itemsWithPrices.map(({ product, item, itemPrice }: { product: typeof products[0]; item: { quantity: number }; itemPrice: number }) => {
        let finalPrice = itemPrice;
        if (promo && promo.type === "percentage") {
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

      // Check if any product has free delivery
      const hasFreeDelivery = itemsWithPrices.some(({ product }) => product.freeDelivery);

      // Calculate delivery fee
      const deliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE;

      // Add delivery fee
      if (!hasFreeDelivery) {
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
      }

      // Calculate discounted subtotal for tax/fee basis
      let taxableSubtotal = baseSubtotal;
      if (promo && promo.type === "percentage") {
        taxableSubtotal = baseSubtotal * (1 - promo.value / 100);
      }

      // Add 7% Florida sales tax (on rental subtotal only)
      const salesTax = taxableSubtotal * SALES_TAX_RATE;
      if (salesTax > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sales Tax (7%)",
              description: "Florida sales tax",
            },
            unit_amount: toStripeAmount(salesTax),
          },
          quantity: 1,
        });
      }

      // Add 3% processing/service fee (on subtotal + delivery + tax)
      const surcharge = (taxableSubtotal + deliveryFee + salesTax) * SURCHARGE_RATE;
      if (surcharge > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Service Fee (3%)",
              description: "Payment processing fee",
            },
            unit_amount: toStripeAmount(surcharge),
          },
          quantity: 1,
        });
      }
    }

    // Build order description for metadata
    const orderDescription = itemsWithPrices
      .map(({ product, item }) => `${product.name}${item.quantity > 1 ? ` x${item.quantity}` : ""}`)
      .join(", ") + ` - ${nights} night${nights > 1 ? "s" : ""}`;

    // Ensure BASE_URL is properly formatted
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://magicalslumber.com";
    baseUrl = baseUrl.trim().replace(/\/$/, "");
    if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
      baseUrl = "https://" + baseUrl;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book`,
      customer_email: customerInfo.email,
      metadata: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        resortName: customerInfo.resortName,
        resortAddress: customerInfo.resortAddress || "",
        checkInDate: customerInfo.checkInDate,
        checkOutDate: customerInfo.checkOutDate,
        deliveryTime: customerInfo.deliveryTime,
        specialRequests: customerInfo.specialRequests || "",
        nights: nights.toString(),
        items: JSON.stringify(items),
        promoCode: promoCode || "",
        orderDescription,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: "Unable to process checkout. Please try again." },
      { status: 500 }
    );
  }
}
