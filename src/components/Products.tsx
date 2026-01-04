"use client";

import { products } from "@/lib/products";
import { Moon, Fan, Monitor, BedDouble } from "lucide-react";
import Link from "next/link";

const iconMap: { [key: string]: React.ReactNode } = {
  "slumber-pod": <Moon className="h-12 w-12" />,
  "fan-sound-machine": <Fan className="h-12 w-12" />,
  "baby-monitor": <Monitor className="h-12 w-12" />,
  "toddler-mattress": <BedDouble className="h-12 w-12" />,
};

export default function Products() {
  return (
    <section id="products" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Rental Products</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need for peaceful nights during your Orlando vacation.
            All items are thoroughly cleaned and sanitized between rentals.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                {iconMap[product.id]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-blue-500">${product.basePrice}</span>
                  <span className="text-gray-500">for {product.baseNights} nights</span>
                </div>
                <div className="text-sm text-gray-500">
                  +${product.additionalNightPrice}/night after
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Add to order */}
              <Link
                href="/book"
                className="block w-full text-center border border-blue-500/50 text-blue-500 hover:bg-blue-500 hover:text-white py-2 rounded-lg transition-all"
              >
                Add to Order
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
