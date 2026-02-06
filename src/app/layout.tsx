import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://magicalslumber.com"),
  title: "Magical Slumber Orlando | Premium Sleep Pod Rentals",
  description: "Rent premium Slumber Pods, fans, baby monitors, and toddler mattresses for your Orlando resort stay. Convenient delivery to Disney, Universal, and all Orlando area resorts.",
  keywords: "slumber pod rental, orlando, disney, universal, baby sleep, travel crib, toddler mattress, baby monitor rental",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Magical Slumber Orlando | Premium Sleep Pod Rentals",
    description: "Make your Orlando vacation magical with restful sleep for the whole family.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
