import { Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "Essential",
    description: "Perfect for babies who need a dark sleep space",
    items: ["Slumber Pod"],
    pricePerNight: 25,
    popular: false,
  },
  {
    name: "Complete",
    description: "Our most popular package for a full sleep setup",
    items: ["Slumber Pod", "Portable Fan", "Baby Monitor"],
    pricePerNight: 45,
    popular: true,
  },
  {
    name: "Family",
    description: "Everything you need for babies and toddlers",
    items: ["Slumber Pod", "Portable Fan", "Baby Monitor", "Toddler Mattress"],
    pricePerNight: 60,
    popular: false,
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose individual items or save with our bundled packages.
            All rentals include a $15 delivery fee and $50 refundable security deposit.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">${pkg.pricePerNight}</span>
                <span className="text-gray-400">/night</span>
              </div>

              {/* Items included */}
              <ul className="space-y-3 mb-8">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/book"
                className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                  pkg.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "border border-white/20 hover:border-white/40 text-white"
                }`}
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Want to customize your order? You can also select individual items on the booking page.
          </p>
        </div>
      </div>
    </section>
  );
}
