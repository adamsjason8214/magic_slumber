import Stripe from "stripe";

// Server-side Stripe instance
function createStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

// Lazy singleton
let _stripe: Stripe | null = null;

export const stripe = {
  get checkout() {
    if (!_stripe) _stripe = createStripeClient();
    return _stripe.checkout;
  },
  get webhooks() {
    if (!_stripe) _stripe = createStripeClient();
    return _stripe.webhooks;
  },
};

// Calculate Stripe amount (in cents)
export function toStripeAmount(dollars: number): number {
  return Math.round(dollars * 100);
}

// Format Stripe amount back to dollars
export function fromStripeAmount(cents: number): number {
  return cents / 100;
}
