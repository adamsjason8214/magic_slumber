import Stripe from "stripe";

// Server-side Stripe instance (lazy initialization to avoid build-time errors)
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });
  }
  return stripeInstance;
}

// Backwards compatible export
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Calculate Stripe amount (in cents)
export function toStripeAmount(dollars: number): number {
  return Math.round(dollars * 100);
}

// Format Stripe amount back to dollars
export function fromStripeAmount(cents: number): number {
  return cents / 100;
}
