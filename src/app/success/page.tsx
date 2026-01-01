"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Mail, Calendar, MapPin, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // In production, you could verify the session with Stripe here
    if (sessionId) {
      setIsVerified(true);
    }
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Invalid session. Please try booking again.</p>
          <Link href="/book" className="text-blue-500 hover:underline mt-4 inline-block">
            Return to booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Booking <span className="gradient-text">Confirmed!</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Thank you for your order. Your magical sleep setup is on its way!
          </p>
        </div>

        {/* Confirmation details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          {/* Email confirmation */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Confirmation Email Sent</h3>
              <p className="text-gray-400 text-sm">
                Check your inbox for order details and delivery information.
              </p>
            </div>
          </div>

          {/* What happens next */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">What Happens Next</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll contact you before your check-in date to confirm delivery details
                and coordinate the best time to meet you at your resort.
              </p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Resort Delivery</h3>
              <p className="text-gray-400 text-sm">
                Your items will be delivered directly to your resort. You can meet us
                in the lobby or coordinate through bell services.
              </p>
            </div>
          </div>
        </div>

        {/* Important info */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Security Deposit</h3>
          <p className="text-gray-400 text-sm">
            Your $50 security deposit will be automatically refunded within 5-7 business days
            after items are returned in good condition on your checkout date.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Questions? Contact us at{" "}
            <a href="mailto:slumbermagicorlando@gmail.com" className="text-blue-500 hover:underline">
              slumbermagicorlando@gmail.com
            </a>
          </p>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-400"
          >
            <span>Return to Home</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
