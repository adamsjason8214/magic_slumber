import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products, DELIVERY_FEE, DEPOSIT_AMOUNT } from "@/lib/products";
import { sendOrderNotification, sendCustomerConfirmation } from "@/lib/email";
import { BookingFormData, CartItem, OrderSummary } from "@/types";
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
      // Parse items from metadata
      const itemsData = JSON.parse(metadata.items || "[]");
      const nights = parseInt(metadata.nights || "1");

      // Build cart items
      const cartItems: CartItem[] = itemsData.map((item: { productId: string; quantity: number }) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          product,
          quantity: item.quantity,
          nights,
        };
      });

      // Build booking data
      const booking: BookingFormData = {
        firstName: metadata.firstName || "",
        lastName: metadata.lastName || "",
        email: metadata.email || "",
        phone: metadata.phone || "",
        resortName: metadata.resortName || "",
        resortAddress: metadata.resortAddress || "",
        roomNumber: metadata.roomNumber || "",
        checkInDate: metadata.checkInDate || "",
        checkOutDate: metadata.checkOutDate || "",
        deliveryTime: metadata.deliveryTime || "",
        specialRequests: metadata.specialRequests || "",
        items: cartItems,
      };

      // Calculate order summary
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity * nights,
        0
      );

      const orderSummary: OrderSummary = {
        items: cartItems,
        subtotal,
        deliveryFee: DELIVERY_FEE,
        deposit: DEPOSIT_AMOUNT,
        total: subtotal + DELIVERY_FEE + DEPOSIT_AMOUNT,
        nights,
      };

      // Generate order ID
      const orderId = `SM-${Date.now().toString(36).toUpperCase()}`;

      // Send emails
      await Promise.all([
        sendOrderNotification(booking, orderSummary, orderId),
        sendCustomerConfirmation(booking, orderSummary, orderId),
      ]);

      console.log(`Order ${orderId} completed and emails sent`);
    } catch (err) {
      console.error("Error processing order:", err);
      // Don't return error - we still received the webhook
    }
  }

  return NextResponse.json({ received: true });
}
