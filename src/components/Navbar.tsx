"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">
              MAGICAL <span className="text-blue-500">SLUMBER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#reviews" className="text-gray-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link
              href="/book"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all glow"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="#products"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#reviews"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
