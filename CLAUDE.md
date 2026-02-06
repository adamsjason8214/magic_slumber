# Claude Project Context - Magical Slumber Orlando

## Overview
Baby sleep equipment rental website for Orlando resorts. Customers book Slumber Pods, mattresses, and bundles online, pay via Stripe, and get delivery to their resort.

## Live Site
- **Production:** https://magicalslumber.com
- **Vercel Dashboard:** https://vercel.com/adamsjason8214s-projects/magic-slumber

## Key Files

### Pricing & Products
- `src/lib/products.ts` - All pricing, products, and promo codes
  - `PROMO_CODES` - Test codes: `noahdavid2026`, `noahdavid112622`
  - Daily rates: Bundle $18, Pod $12, Tot $10

### Booking Flow
- `src/app/book/page.tsx` - Multi-step booking form
- `src/app/api/checkout/route.ts` - Creates Stripe checkout session

### Payments
- `src/lib/stripe.ts` - Stripe initialization (lazy loaded)
- `src/app/api/webhook/route.ts` - Handles Stripe webhooks, sends emails

### Email
- `src/lib/email.ts` - Email templates and sending

## Common Tasks

### Deploy to Production
```bash
npx vercel --prod
```

### Test Promo Codes
1. Go to /book
2. Add items, select dates
3. Enter `noahdavid2026` in promo field
4. Total becomes $0.50

### Add New Promo Code
Edit `src/lib/products.ts`, add to `PROMO_CODES` object:
```typescript
"newcode": {
  type: "percentage" | "fixed_total",
  value: 10,        // 10% or $0.50
  minNights: 1,
  description: "Description"
}
```

### Check Vercel Deployments
```bash
npx vercel ls magic-slumber
```

## Environment Variables
Located in `.env.local` (local) and Vercel dashboard (production):
- Stripe keys
- Gmail credentials
- Upstash Redis
- Mapbox token

## Git Branch
Working branch: `claude/slumber-pod-rental-site-HFZxV`
