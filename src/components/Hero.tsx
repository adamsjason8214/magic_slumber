import Link from "next/link";
import { Star, Shield, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden starfield">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      {/* Animated glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          Sleep Like Magic
          <br />
          <span className="gradient-text">On Your Vacation</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Premium Slumber Pod rentals delivered to Disney, Universal & Legoland resorts.
          Give your little ones the dark, peaceful sleep they need so everyone can enjoy the magic.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link
            href="/book"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all glow"
          >
            Book Your Rental
          </Link>
          <Link
            href="#products"
            className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all backdrop-blur-sm"
          >
            View Products
          </Link>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <Truck className="h-6 w-6 text-blue-500" />
            <span>Free Delivery on 5+ Nights</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <Shield className="h-6 w-6 text-blue-500" />
            <span>Sanitized & Safe</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <Star className="h-6 w-6 text-blue-500" />
            <span>5-Star Reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
