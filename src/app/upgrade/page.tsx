"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUp, ArrowRight, Check, Loader2, XCircle } from "lucide-react";

function UpgradeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [state, setState] = useState<"loading" | "eligible" | "ineligible" | "error">("loading");
  const [originalItem, setOriginalItem] = useState("");
  const [nights, setNights] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkEligibility() {
      if (!sessionId) {
        setState("error");
        return;
      }

      try {
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await res.json();

        if (!data.verified) {
          setState("error");
          return;
        }

        const items = data.items || [];
        const upgradeableItem = items.find(
          (i: { productId: string; quantity: number }) =>
            (i.productId === "slumber-pod" || i.productId === "slumber-tot") && i.quantity === 1
        );
        const hasBundle = items.some((i: { productId: string }) => i.productId === "ultimate-bundle");

        if (upgradeableItem && !hasBundle && items.length === 1) {
          setOriginalItem(upgradeableItem.productId);
          setNights(data.nights);
          setState("eligible");
        } else {
          setState("ineligible");
        }
      } catch {
        setState("error");
      }
    }

    checkEligibility();
  }, [sessionId]);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    setError("");
    try {
      const res = await fetch("/api/upgrade-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalSessionId: sessionId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create upgrade checkout");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsProcessing(false);
    }
  };

  const originalName = originalItem === "slumber-pod" ? "Slumber Pod" : "Slumber Tot";
  const perNight = originalItem === "slumber-pod" ? 6 : 8;
  const priceDiff = perNight * nights;
  const upgradeTax = priceDiff * 0.07;
  const upgradeFee = (priceDiff + upgradeTax) * 0.03;
  const upgradeTotal = priceDiff + upgradeTax + upgradeFee;

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Checking upgrade eligibility...</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Unable to Process Upgrade</h1>
          <p className="text-gray-400 mb-6">
            We couldn&apos;t verify your original order. Please contact us for assistance.
          </p>
          <a
            href="mailto:magicalslumberorlando@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white/40 rounded-lg transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  if (state === "ineligible") {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6">
            <Check className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">No Upgrade Available</h1>
          <p className="text-gray-400 mb-6">
            Your order already includes the Ultimate Slumber Bundle or isn&apos;t eligible for an upgrade.
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
    );
  }

  // Eligible state
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6">
            <ArrowUp className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Upgrade to the <span className="gradient-text">Ultimate Bundle</span>
          </h1>
          <p className="text-gray-400">
            Get the complete sleep setup for your little one
          </p>
        </div>

        {/* Current vs Upgrade comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Current order */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Your Current Order</p>
            <h3 className="font-semibold text-lg mb-3">{originalName}</h3>
            <p className="text-gray-400 text-sm">
              {nights} night{nights > 1 ? "s" : ""} rental
            </p>
          </div>

          {/* Bundle upgrade */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <p className="text-blue-400 text-sm mb-2">Upgrade To</p>
            <h3 className="font-semibold text-lg mb-3">Ultimate Slumber Bundle</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                Slumber Pod
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                Portable Fan
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                Sound Machine
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                Video Baby Monitor
              </li>
            </ul>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">Upgrade Price</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Price difference</span>
              <span>${perNight.toFixed(2)}/night x {nights} night{nights > 1 ? "s" : ""} = ${priceDiff.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery Fee</span>
              <span className="text-green-400">Waived</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sales Tax (7%)</span>
              <span>${upgradeTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Service Fee (3%)</span>
              <span>${upgradeFee.toFixed(2)}</span>
            </div>
          </div>
          <hr className="border-white/10 my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Upgrade Total</span>
            <span className="text-blue-500">${upgradeTotal.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 text-center border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium transition-colors"
          >
            No Thanks
          </Link>
          <button
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Pay ${upgradeTotal.toFixed(2)} and Upgrade</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        </div>
      }
    >
      <UpgradeContent />
    </Suspense>
  );
}
