import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Ready for <span className="gradient-text">Magical Sleep?</span>
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Don&apos;t let tired kids ruin your vacation. Book your Slumber Pod rental today
          and give your whole family the gift of restful nights.
        </p>

        <Link
          href="/book"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all glow"
        >
          <span>Book Your Rental Now</span>
          <ArrowRight className="h-5 w-5" />
        </Link>

        <p className="mt-6 text-gray-500 text-sm">
          Free delivery to all Orlando area resorts
        </p>
      </div>
    </section>
  );
}
