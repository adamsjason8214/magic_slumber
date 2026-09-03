import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Moon } from "lucide-react";
import { SLUMBER_POD_DAILY_RATE, SLUMBER_TOT_DAILY_RATE, SLUMBER_TOT_ADDON_DAILY_RATE } from "@/lib/products";

export const metadata: Metadata = {
  title: "SlumberPod for Toddlers | Magical Slumber Orlando",
  description:
    "Rent a SlumberPod blackout tent with the Slumber Tot inflatable mattress for a toddler sleep setup delivered to your Disney, Universal, or Orlando area resort.",
};

const comboPrice = SLUMBER_POD_DAILY_RATE + SLUMBER_TOT_ADDON_DAILY_RATE;

export default function SlumberPodForToddlersPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-blue-400 mb-4">
          Toddler Sleep Setup
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
          <span className="gradient-text">SlumberPod for Toddlers</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-10">
          A blackout privacy tent and an inflatable toddler mattress, delivered to your Orlando
          area resort — so your toddler gets their own dark, familiar sleep space instead of a
          pack &apos;n play they&apos;ve outgrown or a shared hotel bed.
        </p>

        {/* How it works for toddlers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">How it works for toddlers</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The SlumberPod is a 99.9% blackout canopy that sets up over a sleeping surface in
            minutes. For toddlers who&apos;ve outgrown a pack &apos;n play, we pair it with the
            Slumber Tot — an inflatable, waterproof mattress sized for toddlers — so the SlumberPod
            has something to fit over. Same blackout privacy your toddler is used to at home, just
            packed into a hotel room.
          </p>
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-white/5">
            <Image src="/images/slumber-pod.png" alt="SlumberPod set up over a toddler mattress" fill className="object-cover" />
          </div>
        </section>

        {/* Age range */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Age range</h2>
          <p className="text-gray-300 leading-relaxed">
            The SlumberPod fits over most standard pack &apos;n plays and travel cribs, suitable
            for babies through toddlers (typically up to age 3). The Slumber Tot mattress is built
            for kids who have outgrown the crib (typically ages 2&ndash;5) — the two together cover
            the full range from crib-age to big-kid bed.
          </p>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-1">SlumberPod only</h3>
              <p className="text-gray-400 text-sm mb-3">Fits over your own pack &apos;n play or the Slumber Tot.</p>
              <p className="text-2xl font-bold text-purple-400">${SLUMBER_POD_DAILY_RATE}<span className="text-sm text-gray-400">/night</span></p>
            </div>
            <div className="border-2 border-blue-500 rounded-2xl p-6 relative">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                MOST BOOKED FOR TODDLERS
              </div>
              <h3 className="font-semibold mb-1">SlumberPod + Slumber Tot</h3>
              <p className="text-gray-400 text-sm mb-3">The full toddler setup — tent and mattress.</p>
              <p className="text-2xl font-bold text-blue-400">${comboPrice}<span className="text-sm text-gray-400">/night</span></p>
            </div>
            <div className="border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-1">Slumber Tot only</h3>
              <p className="text-gray-400 text-sm mb-3">Just the mattress, if you already have a SlumberPod.</p>
              <p className="text-2xl font-bold text-green-400">${SLUMBER_TOT_DAILY_RATE}<span className="text-sm text-gray-400">/night</span></p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What&apos;s included</h2>
          <ul className="space-y-2">
            {[
              "99.9% blackout SlumberPod canopy",
              "Inflatable, waterproof Slumber Tot mattress",
              "Delivery to your Disney, Universal, Legoland, or Orlando area resort",
              "Cleaned and sanitized with hospital-grade disinfectant before every rental",
            ].map((item) => (
              <li key={item} className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-white/10 pt-12">
          <Moon className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to book your toddler&apos;s sleep setup?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            No minimum rental period. We deliver directly to your resort and meet you at the lobby
            or bell services.
          </p>
          <Link
            href="/book?type=pod"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all glow"
          >
            Book Your Rental
          </Link>
        </section>
      </div>
    </div>
  );
}
