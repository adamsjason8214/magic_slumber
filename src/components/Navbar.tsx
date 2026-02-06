"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Instagram, Facebook } from "lucide-react";

// Custom TikTok icon (lucide-react doesn't have one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

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
            <Link href="/#products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/#reviews" className="text-gray-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="/#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </Link>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
              <a
                href="https://www.instagram.com/magicalslumberorlando/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/share/1G2ZsxwP2g/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@magical.slumber.orlando?_r=1&_t=ZP-934aheudYIo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>

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
              href="/#products"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#reviews"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/terms"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            {/* Social Media Icons */}
            <div className="flex items-center justify-center space-x-6 py-2">
              <a
                href="https://www.instagram.com/magicalslumberorlando/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/share/1G2ZsxwP2g/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@magical.slumber.orlando?_r=1&_t=ZP-934aheudYIo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
            </div>

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
