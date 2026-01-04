"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What areas do you deliver to?",
    answer: "We deliver to all major resorts in the Orlando area, including Walt Disney World Resort hotels, Universal Orlando Resort hotels, and surrounding area hotels and vacation rentals. If you're unsure if we deliver to your location, just ask!",
  },
  {
    question: "How does the security deposit work?",
    answer: "We collect a $50 refundable security deposit at the time of booking. This is held on your card and released within 5-7 business days after items are returned in good condition. The deposit is only charged if items are damaged or not returned.",
  },
  {
    question: "What time can items be delivered?",
    answer: "We offer flexible delivery windows throughout the day. Popular times include early afternoon (for those arriving mid-day) and early evening. We'll coordinate with you to find the best time that works with your check-in schedule.",
  },
  {
    question: "Are the items cleaned and sanitized?",
    answer: "Absolutely! All items are thoroughly cleaned and sanitized between each rental using hospital-grade disinfectants. We take hygiene very seriously, especially for baby items. Each item is inspected and freshly prepared for your family.",
  },
  {
    question: "What if I need to extend my rental?",
    answer: "No problem! Just contact us at least 24 hours before your scheduled pickup and we can extend your rental (subject to availability). Additional nights are charged at the standard nightly rate.",
  },
  {
    question: "How do returns work?",
    answer: "On your checkout day, we'll arrange a pickup time that works with your schedule. You can either meet us in the lobby or leave items with bell services. We handle all the logistics!",
  },
  {
    question: "What ages are these products suitable for?",
    answer: "The Slumber Pod fits over most standard pack n' plays and travel cribs, suitable for babies through toddlers (typically up to age 3). The toddler mattress is great for kids who have outgrown the crib (typically ages 2-5). Baby monitors work for all ages.",
  },
  {
    question: "Can I cancel my reservation?",
    answer: "Yes, we offer free cancellation up to 48 hours before your delivery date. Cancellations within 48 hours may be subject to a cancellation fee. Contact us as soon as possible if your plans change.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about renting with Magical Slumber Orlando.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
