# Slumber Magic Orlando

Premium Slumber Pod rental website for Orlando area resorts. Built with Next.js, Stripe, and a SpaceX-inspired dark theme.

## Features

- Modern, responsive design with SpaceX-style dark theme
- Product catalog (Slumber Pods, fans, baby monitors, toddler mattresses)
- Multi-step booking form with date selection
- Stripe payment integration with refundable security deposit
- Email notifications to business and customer
- Resort delivery information

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout
- **Email**: Nodemailer with Gmail
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd magic_slumber
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `STRIPE_SECRET_KEY` - From Stripe Dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe Webhooks
- `EMAIL_USER` - Gmail address (slumbermagicorlando@gmail.com)
- `EMAIL_PASS` - Gmail App Password
- `NEXT_PUBLIC_BASE_URL` - Your site URL

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Dashboard](https://dashboard.stripe.com/apikeys)
3. Create a webhook endpoint pointing to `your-domain.com/api/webhook`
4. Select "checkout.session.completed" event

### 4. Set Up Gmail App Password

1. Enable 2-Step Verification on your Gmail account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASS`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

### Environment Variables in Vercel

Add these in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (use live key for production) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail app password |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel URL (e.g., https://your-site.vercel.app) |

### Configure Stripe Webhook for Production

After deploying, update your Stripe webhook endpoint to:
```
https://your-site.vercel.app/api/webhook
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/     # Stripe checkout session
│   │   └── webhook/      # Stripe webhook handler
│   ├── book/             # Booking page
│   ├── success/          # Order confirmation
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── CTA.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   ├── Pricing.tsx
│   └── Products.tsx
├── lib/
│   ├── email.ts          # Email sending functions
│   ├── products.ts       # Product data
│   └── stripe.ts         # Stripe configuration
└── types/
    └── index.ts          # TypeScript types
```

## Pricing

| Item | Price/Night |
|------|-------------|
| Slumber Pod | $25 |
| Portable Fan | $10 |
| Baby Monitor | $15 |
| Toddler Mattress | $20 |
| Delivery Fee | $15 (flat) |
| Security Deposit | $50 (refundable) |

## Support

For questions or issues, contact: slumbermagicorlando@gmail.com

## License

Private - All rights reserved
