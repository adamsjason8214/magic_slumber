"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Mail, Calendar, MapPin, ArrowRight, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verificationState, setVerificationState] = useState<"loading" | "verified" | "failed">("loading");
  const [orderDescription, setOrderDescription] = useState("");

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setVerificationState("failed");
        return;
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.verified) {
          setVerificationState("verified");
          setOrderDescription(data.orderDescription || "");
        } else {
          setVerificationState("failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationState("failed");
      }
    }

    verifySession();
  }, [sessionId]);

  // Loading state
  if (verificationState === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Failed state
  if (verificationState === "failed") {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Payment <span className="text-red-500">Not Verified</span>
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              We couldn&apos;t verify your payment. If you believe this is an error, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Try Again
              </Link>
              <a
                href="mailto:magicalslumberorlando@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white/40 rounded-lg transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
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
          {orderDescription && (
            <p className="text-gray-500 text-sm mt-2">
              Order: {orderDescription}
            </p>
          )}
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

        {/* Contact */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Questions? Contact us at{" "}
            <a href="mailto:magicalslumberorlando@gmail.com" className="text-blue-500 hover:underline">
              magicalslumberorlando@gmail.com
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
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
