import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Magical Slumber Orlando | Premium Sleep Pod Rentals",
  description: "Rent premium Slumber Pods, fans, baby monitors, and toddler mattresses for your Orlando resort stay. Convenient delivery to Disney, Universal, and all Orlando area resorts.",
  keywords: "slumber pod rental, orlando, disney, universal, baby sleep, travel crib, toddler mattress, baby monitor rental",
  openGraph: {
    title: "Magical Slumber Orlando | Premium Sleep Pod Rentals",
    description: "Make your Orlando vacation magical with restful sleep for the whole family.",
    type: "website",
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
      </body>
    </html>
  );
}
