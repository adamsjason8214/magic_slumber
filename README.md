# Magical Slumber Orlando

Premium baby sleep equipment rentals for Orlando area resorts. Built with Next.js, Stripe, and Tailwind CSS.

**Live Site:** [magicalslumber.com](https://magicalslumber.com)

## Features

- Modern, responsive dark theme design
- Product bundles and individual rentals
- Multi-step booking with date selection
- Stripe payment integration
- Email notifications (business + customer)
- Rate limiting with Upstash Redis
- Promo code system

## Pricing

| Item | Price |
|------|-------|
| Ultimate Slumber Bundle | $16/night |
| Slumber Pod | $12/night |
| Slumber Tot | $10/night |
| Slumber Tot Add-on | $8/night (with bundle/pod) |
| Delivery Fee | $15 (free on 5+ nights) |
| Security Deposit | $50 (refundable) |

## Promo Codes

| Code | Discount |
|------|----------|
| `magicbreak` | 10% off (3+ nights) |
| `noahdavid2026` | Test mode ($0.50 total) |
| `noahdavid112622` | Test mode ($0.50 total) |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout
- **Database:** Upstash Redis (reviews, rate limiting)
- **Email:** Nodemailer + Gmail
- **Hosting:** Vercel
- **Maps:** Mapbox (address autocomplete)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `EMAIL_USER` / `EMAIL_PASS`
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_BASE_URL`

### 3. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

```bash
npx vercel --prod
```

Or push to GitHub and connect to Vercel for auto-deploys.

### Update Stripe Webhook

After deploying, set webhook endpoint to:
```
https://magicalslumber.com/api/webhook
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/       # Stripe checkout
│   │   ├── reviews/        # Customer reviews
│   │   ├── verify-session/ # Session verification
│   │   └── webhook/        # Stripe webhooks
│   ├── book/               # Booking flow
│   ├── success/            # Order confirmation
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/             # UI components
├── lib/
│   ├── products.ts         # Products, pricing, promo codes
│   ├── stripe.ts           # Stripe config
│   └── email.ts            # Email templates
└── types/                  # TypeScript types
```

## Support

Contact: magicalslumberorlando@gmail.com
