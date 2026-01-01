import Stripe from "stripe";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Calculate Stripe amount (in cents)
export function toStripeAmount(dollars: number): number {
  return Math.round(dollars * 100);
}

// Format Stripe amount back to dollars
export function fromStripeAmount(cents: number): number {
  return cents / 100;
}
