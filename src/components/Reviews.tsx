"use client";

import { useState, useEffect } from "react";
import { Star, Send, Loader2, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
  ownerResponse?: string;
  ownerResponseDate?: string;
}

// Sample reviews to show initially
const sampleReviews: Review[] = [
  {
    id: "sample_1",
    name: "Sarah M.",
    location: "Disney's Grand Floridian",
    rating: 5,
    text: "This was a game changer for our Disney trip! Our 18-month-old slept so much better with the Slumber Pod. The delivery was seamless and the equipment was spotless. Will definitely rent again!",
    createdAt: "2024-12-15T00:00:00Z",
    ownerResponse: "Thank you so much Sarah! We're thrilled your little one slept well. Can't wait to help you on your next Disney adventure!",
    ownerResponseDate: "2024-12-16T00:00:00Z",
  },
  {
    id: "sample_2",
    name: "Mike & Jennifer T.",
    location: "Universal's Endless Summer",
    rating: 5,
    text: "We were worried about our toddler adjusting to a hotel room, but the Slumber Pod made all the difference. She slept through the night every night. The fan was a great addition too!",
    createdAt: "2024-12-10T00:00:00Z",
  },
  {
    id: "sample_3",
    name: "Amanda R.",
    location: "Disney's Contemporary Resort",
    rating: 5,
    text: "Super easy process from booking to pickup. The team was communicative and flexible with our schedule. Our baby slept like a dream and we actually got to enjoy our evenings!",
    createdAt: "2024-12-05T00:00:00Z",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    // Fetch reviews from API
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Combine API reviews with sample reviews, removing duplicates
          const combined = [...data, ...sampleReviews];
          const unique = combined.filter((review, index, self) =>
            index === self.findIndex(r => r.id === review.id)
          );
          setReviews(unique);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setReviews([data.review, ...reviews]);
        setSubmitted(true);
        setFormData({ name: "", email: "", location: "", rating: 5, text: "" });
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onSelect?: (r: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={() => interactive && onSelect && onSelect(star)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Families Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Real reviews from families who have used Magical Slumber Orlando.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            <Send className="h-4 w-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 bg-white/5 border border-white/10 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-500 fill-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank you for your review!</h3>
                <p className="text-gray-400">Your review has been posted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="John D."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email (optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Resort/Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Disney's Grand Floridian"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Rating *</label>
                  {renderStars(formData.rating, true, (r) => setFormData({ ...formData, rating: r }))}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Review *</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Review</span>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
            >
              {/* Stars */}
              <div className="mb-4">{renderStars(review.rating)}</div>

              {/* Review text */}
              <p className="text-gray-300 mb-4">&ldquo;{review.text}&rdquo;</p>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>

              {/* Owner Response */}
              {review.ownerResponse && (
                <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-400 text-sm mb-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">Response from Magical Slumber</span>
                  </div>
                  <p className="text-gray-300 text-sm">{review.ownerResponse}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
