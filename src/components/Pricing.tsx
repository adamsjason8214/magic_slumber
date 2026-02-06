import { Check, Sparkles, Moon, Star } from "lucide-react";
import Link from "next/link";
import {
  ULTIMATE_BUNDLE_DAILY_RATE,
  SLUMBER_POD_DAILY_RATE,
  SLUMBER_TOT_DAILY_RATE,
  SLUMBER_TOT_ADDON_DAILY_RATE,
  FREE_DELIVERY_MIN_DAYS,
  DELIVERY_FEE,
} from "@/lib/products";

const packages = [
  {
    name: "Ultimate Slumber Bundle",
    description: "Everything you need for perfect sleep",
    items: ["Slumber Pod", "Portable Fan", "Sound Machine", "Video Baby Monitor"],
    pricePerNight: ULTIMATE_BUNDLE_DAILY_RATE,
    popular: true,
    icon: Sparkles,
    color: "blue",
    addon: `+$${SLUMBER_TOT_ADDON_DAILY_RATE}/night for Slumber Tot add-on`,
    href: "/book?type=bundle",
  },
  {
    name: "Slumber Pod",
    description: "Blackout sleep pod for babies & toddlers",
    items: ["99.9% blackout canopy", "Fits over pack n plays & travel cribs", "Easy setup in minutes"],
    pricePerNight: SLUMBER_POD_DAILY_RATE,
    popular: false,
    icon: Moon,
    color: "purple",
    addon: `+$${SLUMBER_TOT_ADDON_DAILY_RATE}/night for Slumber Tot add-on`,
    href: "/book?type=pod",
  },
  {
    name: "Slumber Tot",
    description: "Portable mattress for toddlers",
    items: ["Inflatable mattress", "Waterproof cover", "SlumberPod can go over it"],
    pricePerNight: SLUMBER_TOT_DAILY_RATE,
    popular: false,
    icon: Star,
    color: "green",
    href: "/book?type=tot",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            No minimum rental period. Per-night pricing with free delivery on longer stays.
          </p>
          <p className="text-sm text-blue-400">
            Delivery is free on rentals of {FREE_DELIVERY_MIN_DAYS} nights or more. ${DELIVERY_FEE} delivery fee for shorter rentals.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  pkg.popular
                    ? "bg-gradient-to-b from-blue-600/20 to-blue-900/10 border-2 border-blue-500"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  pkg.color === "blue" ? "bg-blue-500/20" :
                  pkg.color === "purple" ? "bg-purple-500/20" :
                  "bg-green-500/20"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    pkg.color === "blue" ? "text-blue-400" :
                    pkg.color === "purple" ? "text-purple-400" :
                    "text-green-400"
                  }`} />
                </div>

                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${
                    pkg.color === "blue" ? "text-blue-400" :
                    pkg.color === "purple" ? "text-purple-400" :
                    "text-green-400"
                  }`}>${pkg.pricePerNight}</span>
                  <span className="text-gray-400">/night</span>
                </div>

                {/* Items included */}
                <ul className="space-y-3 mb-4">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Addon option */}
                {pkg.addon && (
                  <div className="flex items-start text-yellow-400 text-sm mb-4 bg-yellow-500/10 rounded-lg p-3">
                    <span>{pkg.addon}</span>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={pkg.href}
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                    pkg.popular
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "border border-white/20 hover:border-white/40 text-white"
                  }`}
                >
                  Book Now
                </Link>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-gray-400 text-sm">
            All prices are per night. Sales tax (7%) and processing fee (3%) added at checkout.
          </p>
          <p className="text-gray-500 text-sm">
            $50 refundable security deposit required.
          </p>
        </div>
      </div>
    </section>
  );
}
