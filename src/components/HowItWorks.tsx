"use client";

import { Calendar, CreditCard, Truck, Moon } from "lucide-react";
import { useEffect } from "react";

const steps = [
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Choose Your Dates",
    description: "Select your check-in and check-out dates, along with the items you need for your stay.",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Secure Payment",
    description: "Pay securely with Stripe. A refundable $50 deposit is held until items are returned.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Resort Delivery",
    description: "We deliver directly to your Orlando area resort. Meet us at the lobby or bell services.",
  },
  {
    icon: <Moon className="h-8 w-8" />,
    title: "Sleep Magic",
    description: "Enjoy peaceful nights knowing your little ones are sleeping soundly in their own dark space.",
  },
];

export default function HowItWorks() {
  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as unknown as { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process) {
        (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting your Slumber Pod rental is easy. We handle all the logistics
            so you can focus on making magical memories.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 pt-10 hover:border-blue-500/50 transition-all">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mx-auto mb-6">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Video Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            See It <span className="gradient-text">In Action</span>
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Watch how easy it is to set up the Slumber Pod for your little one.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/p/DTnehakjjKk/"
              data-instgrm-version="14"
              style={{
                background: "#000",
                border: "0",
                borderRadius: "12px",
                margin: "0",
                maxWidth: "400px",
                minWidth: "300px",
                padding: "0",
                width: "100%",
              }}
            />
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/p/DTp3jNjDj9O/"
              data-instgrm-version="14"
              style={{
                background: "#000",
                border: "0",
                borderRadius: "12px",
                margin: "0",
                maxWidth: "400px",
                minWidth: "300px",
                padding: "0",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
