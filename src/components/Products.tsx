"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, Moon, Star } from "lucide-react";
import {
  ULTIMATE_BUNDLE_DAILY_RATE,
  SLUMBER_POD_DAILY_RATE,
  SLUMBER_TOT_DAILY_RATE,
  SLUMBER_TOT_ADDON_DAILY_RATE,
} from "@/lib/products";

export default function Products() {
  return (
    <section id="products" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Rental Options</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Everything you need for peaceful nights during your Orlando vacation.
            All rentals are thoroughly cleaned and sanitized.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>No minimum rental period. Delivered right to your resort!</span>
          </div>
        </div>

        {/* Three Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Ultimate Bundle */}
          <div className="relative bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent border-2 border-blue-500 rounded-2xl p-6 md:p-8">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              BEST VALUE
            </div>

            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>

            <h4 className="text-xl md:text-2xl font-bold mb-2">Ultimate Slumber Bundle</h4>
            <p className="text-gray-400 text-sm mb-4">
              Complete sleep setup with everything included.
            </p>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-blue-400">${ULTIMATE_BUNDLE_DAILY_RATE}</span>
                <span className="text-gray-400">/night</span>
              </div>
            </div>

            {/* Product Image Collage */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="relative h-16 rounded-lg overflow-hidden bg-white/5">
                <Image src="/images/slumber-pod.png" alt="Slumber Pod" fill className="object-cover" />
              </div>
              <div className="relative h-16 rounded-lg overflow-hidden bg-white/5">
                <Image src="/images/fan.png" alt="Portable Fan" fill className="object-cover" />
              </div>
              <div className="relative h-16 rounded-lg overflow-hidden bg-white/5">
                <Image src="/images/sound-machine.png" alt="Sound Machine" fill className="object-cover" />
              </div>
              <div className="relative h-16 rounded-lg overflow-hidden bg-white/5">
                <Image src="/images/monitor.png" alt="Baby Monitor" fill className="object-cover" />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Includes:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Slumber Pod
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Portable Fan
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Sound Machine
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Video Baby Monitor
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
              <p className="text-yellow-400 text-sm">
                +${SLUMBER_TOT_ADDON_DAILY_RATE}/night for Slumber Tot add-on
              </p>
            </div>

            <Link
              href="/book?type=bundle"
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-full font-medium transition-all glow"
            >
              Book Bundle
            </Link>
          </div>

          {/* Slumber Pod Only */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <Moon className="h-6 w-6 text-purple-400" />
            </div>

            <h4 className="text-xl md:text-2xl font-bold mb-2">Slumber Pod</h4>
            <p className="text-gray-400 text-sm mb-4">
              Blackout sleep pod for babies & toddlers.
            </p>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-purple-400">${SLUMBER_POD_DAILY_RATE}</span>
                <span className="text-gray-400">/night</span>
              </div>
            </div>

            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-white/5">
              <Image
                src="/images/slumber-pod.png"
                alt="Slumber Pod"
                fill
                className="object-cover"
              />
            </div>

            <div className="mb-6">
              <ul className="space-y-1 text-sm">
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  99.9% blackout canopy
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Fits over pack n plays
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Easy setup in minutes
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
              <p className="text-yellow-400 text-sm">
                +${SLUMBER_TOT_ADDON_DAILY_RATE}/night for Slumber Tot add-on
              </p>
            </div>

            <Link
              href="/book?type=pod"
              className="block w-full text-center border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white py-3 rounded-full font-medium transition-all"
            >
              Book Slumber Pod
            </Link>
          </div>

          {/* Slumber Tot Only */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-green-400" />
            </div>

            <h4 className="text-xl md:text-2xl font-bold mb-2">Slumber Tot</h4>
            <p className="text-gray-400 text-sm mb-4">
              Portable mattress for toddlers.
            </p>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-green-400">${SLUMBER_TOT_DAILY_RATE}</span>
                <span className="text-gray-400">/night</span>
              </div>
            </div>

            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-white/5">
              <Image
                src="/images/mattress.png"
                alt="Slumber Tot Mattress"
                fill
                className="object-cover"
              />
            </div>

            <div className="mb-6">
              <ul className="space-y-1 text-sm">
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Inflatable mattress
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Waterproof cover
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  SlumberPod can go over it
                </li>
              </ul>
            </div>

            <Link
              href="/book?type=tot"
              className="block w-full text-center border border-green-500 text-green-400 hover:bg-green-500 hover:text-white py-3 rounded-full font-medium transition-all"
            >
              Book Slumber Tot
            </Link>
          </div>
        </div>

        {/* Bundle contents display */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Fan, Sound Machine, and Baby Monitor are only available as part of the Ultimate Bundle.
          </p>
        </div>
      </div>
    </section>
  );
}
