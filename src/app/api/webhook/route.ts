import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  SALES_TAX_RATE,
  SURCHARGE_RATE,
  DELIVERY_FEE,
  products,
  calculateItemPrice,
  calculatePromoDiscount,
} from "@/lib/products";
import { sendOrderNotification, sendCustomerConfirmation, sendUpgradeNotification, sendUpgradeConfirmation } from "@/lib/email";
import { BookingFormData, OrderSummary } from "@/types";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      console.error("No metadata in session");
      return NextResponse.json({ received: true });
    }

    try {
      // Handle upgrade payments separately
      if (metadata.type === "upgrade") {
        const nights = parseInt(metadata.nights || "1");
        const originalProductId = metadata.originalProductId || "slumber-pod";
        const originalProductName = originalProductId === "slumber-pod" ? "Slumber Pod" : "Slumber Tot";
        const upgradeAmount = (session.amount_total || 0) / 100; // Convert from cents

        const booking: BookingFormData = {
          firstName: metadata.firstName || "",
          lastName: metadata.lastName || "",
          email: metadata.email || "",
          phone: metadata.phone || "",
          resortName: metadata.resortName || "",
          resortAddress: metadata.resortAddress || "",
          agentReferralEmail: "",
          checkInDate: metadata.checkInDate || "",
          checkOutDate: metadata.checkOutDate || "",
          deliveryTime: metadata.deliveryTime || "",
          specialRequests: "",
          items: [],
        };

        const orderId = `SM-UPG-${Date.now().toString(36).toUpperCase()}`;
        console.log(`Processing upgrade order ${orderId}`);

        try {
          await Promise.all([
            sendUpgradeNotification(booking, orderId, originalProductName, upgradeAmount, nights),
            sendUpgradeConfirmation(booking, orderId, originalProductName, upgradeAmount, nights),
          ]);
          console.log(`Upgrade ${orderId} completed and emails sent successfully`);
        } catch (emailErr) {
          console.error(`Upgrade email sending failed for ${orderId}:`, emailErr);
        }

        return NextResponse.json({ received: true });
      }

      const nights = parseInt(metadata.nights || "1");
      const promoCode = metadata.promoCode || "";

      // Reconstruct order from items metadata
      let itemsList: Array<{ productId: string; quantity: number }> = [];
      try {
        itemsList = JSON.parse(metadata.items || "[]");
      } catch {
        itemsList = [];
      }

      // Calculate base subtotal from actual items
      let baseSubtotal = 0;
      let hasFreeDelivery = false;
      for (const item of itemsList) {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          baseSubtotal += calculateItemPrice(product, nights) * item.quantity;
          if (product.freeDelivery) hasFreeDelivery = true;
        }
      }

      // Apply promo discount
      let subtotal = baseSubtotal;
      if (promoCode) {
        const promoResult = calculatePromoDiscount(promoCode, baseSubtotal, nights);
        if (promoResult.isFixedTotal && promoResult.fixedTotal !== undefined) {
          subtotal = promoResult.fixedTotal;
        } else {
          subtotal = baseSubtotal - promoResult.discountAmount;
        }
      }

      // Build booking data
      const booking: BookingFormData = {
        firstName: metadata.firstName || "",
        lastName: metadata.lastName || "",
        email: metadata.email || "",
        phone: metadata.phone || "",
        resortName: metadata.resortName || "",
        resortAddress: metadata.resortAddress || "",
        agentReferralEmail: metadata.agentReferralEmail || "",
        checkInDate: metadata.checkInDate || "",
        checkOutDate: metadata.checkOutDate || "",
        deliveryTime: metadata.deliveryTime || "",
        specialRequests: metadata.specialRequests || "",
        items: [],
      };

      // Determine delivery fee
      const deliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE;

      // Calculate 7% sales tax (on rental subtotal only)
      const salesTax = subtotal * SALES_TAX_RATE;

      // Calculate 3% processing fee (on subtotal + delivery + tax)
      const surcharge = (subtotal + deliveryFee + salesTax) * SURCHARGE_RATE;

      const orderSummary: OrderSummary = {
        items: [],
        subtotal,
        deliveryFee,
        surcharge,
        salesTax,
        deposit: 0,
        total: subtotal + deliveryFee + salesTax + surcharge,
        nights,
      };

      // Generate order ID
      const orderId = `SM-${Date.now().toString(36).toUpperCase()}`;

      // Build order description from items or use metadata
      const orderDescription = metadata.orderDescription || itemsList
        .map(item => {
          const product = products.find(p => p.id === item.productId);
          return product ? `${product.name}${item.quantity > 1 ? ` x${item.quantity}` : ""}` : item.productId;
        })
        .join(", ") + ` - ${nights} night${nights > 1 ? "s" : ""}`;

      // Check upgrade eligibility for email CTA
      const upgradeableItem = itemsList.find(
        i => (i.productId === "slumber-pod" || i.productId === "slumber-tot") && i.quantity === 1
      );
      const hasBundle = itemsList.some(i => i.productId === "ultimate-bundle");
      const isUpgradeEligible = !!upgradeableItem && !hasBundle && itemsList.length === 1;

      // Send emails with order description
      console.log(`Attempting to send emails for order ${orderId}`);

      try {
        await Promise.all([
          sendOrderNotification(booking, orderSummary, orderId, orderDescription),
          sendCustomerConfirmation(booking, orderSummary, orderId, orderDescription,
            isUpgradeEligible ? {
              eligible: true,
              sessionId: session.id,
              originalProductId: upgradeableItem!.productId,
              nights,
            } : undefined
          ),
        ]);
        console.log(`Order ${orderId} completed and emails sent successfully`);
      } catch (emailErr) {
        console.error(`Email sending failed for order ${orderId}:`, emailErr);
        // Log the specific error for debugging
        if (emailErr instanceof Error) {
          console.error(`Email error message: ${emailErr.message}`);
          console.error(`Email error stack: ${emailErr.stack}`);
        }
      }
    } catch (err) {
      console.error("Error processing order:", err);
      if (err instanceof Error) {
        console.error(`Order processing error message: ${err.message}`);
        console.error(`Order processing error stack: ${err.stack}`);
      }
      // Don't return error - we still received the webhook
    }
  }

  return NextResponse.json({ received: true });
}
