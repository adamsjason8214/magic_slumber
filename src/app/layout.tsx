import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

const TITLE = "SlumberPod Rentals for Babies & Toddlers | Magical Slumber Orlando";
const DESCRIPTION =
  "Rent a SlumberPod blackout sleep tent, toddler mattress, and baby monitor delivered to your Disney, Universal, or Orlando area resort. Give babies and toddlers their own dark, private sleep space while you travel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: "SlumberPod rental, SlumberPod for toddlers, orlando, disney, universal, baby sleep, travel crib, toddler mattress, baby monitor rental",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Magical Slumber Orlando",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.png"],
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Magical Slumber Orlando",
  description: DESCRIPTION,
  url: SITE_URL,
  email: "magicalslumberorlando@gmail.com",
  image: `${SITE_URL}/images/og-image.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: ["Walt Disney World Resort", "Universal Orlando Resort", "Legoland Florida Resort", "Orlando, FL"],
  sameAs: [
    "https://www.instagram.com/magicalslumberorlando/",
    "https://www.tiktok.com/@magical.slumber.orlando",
    "https://facebook.com/share/1G2ZsxwP2g/",
  ],
};

const PRODUCTS_JSON_LD = products.map((product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: `${SITE_URL}${product.image}`,
  offers: {
    "@type": "Offer",
    price: product.basePrice,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/book`,
  },
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {PRODUCTS_JSON_LD.map((product) => (
          <script
            key={product.name}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
          />
        ))}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
