"use client";

import { useState, useEffect } from "react";
import { products, DELIVERY_FEE, SALES_TAX_RATE, SURCHARGE_RATE, SLUMBER_TOT_ADDON_DAILY_RATE, calculateItemPrice, validatePromoCode, calculatePromoDiscount, PromoCode } from "@/lib/products";
import { Product, CartItem } from "@/types";
import { Minus, Plus, Trash2, Calendar, User, Home, CreditCard, Loader2, Tag, CheckSquare } from "lucide-react";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import ResortSearch from "@/components/ResortSearch";

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resortName: "",
    resortAddress: "",
    checkInDate: "",
    checkOutDate: "",
    deliveryTime: "14:00",
    specialRequests: "",
  });

  // Calculate nights
  const [nights, setNights] = useState(1);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(Math.max(1, diffDays));
    }
  }, [formData.checkInDate, formData.checkOutDate]);

  // Update cart item nights when dates change
  useEffect(() => {
    if (cart.length > 0) {
      setCart(cart.map(item => ({ ...item, nights })));
    }
  }, [nights]);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1, nights }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Check if cart has bundle or pod (makes Tot an add-on at discounted rate)
  const hasBundleOrPod = cart.some(item => item.product.id === "ultimate-bundle" || item.product.id === "slumber-pod");

  const baseSubtotal = cart.reduce(
    (sum, item) => {
      if (item.product.id === "slumber-tot" && hasBundleOrPod) {
        return sum + SLUMBER_TOT_ADDON_DAILY_RATE * nights * item.quantity;
      }
      return sum + calculateItemPrice(item.product, nights) * item.quantity;
    },
    0
  );

  const deliveryFee = DELIVERY_FEE;

  // Apply promo discount
  const promoResult = promoApplied && promoCode ? calculatePromoDiscount(promoCode, baseSubtotal, nights) : { discountAmount: 0, isFixedTotal: false };
  const subtotal = promoResult.isFixedTotal ? (promoResult.fixedTotal || 0) : (baseSubtotal - promoResult.discountAmount);

  // Calculate 7% sales tax (on rental subtotal only) — round to cents to match Stripe
  const salesTax = Math.round(subtotal * SALES_TAX_RATE * 100) / 100;

  // Calculate 3% service fee (on subtotal + tax) — round to cents to match Stripe
  const surcharge = Math.round((subtotal + salesTax) * SURCHARGE_RATE * 100) / 100;

  const total = subtotal + deliveryFee + salesTax + surcharge;

  const handleApplyPromo = () => {
    setPromoError("");
    const promo = validatePromoCode(promoCode, nights);
    if (promo) {
      setPromoApplied(promo);
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(null);
    setPromoCode("");
    setPromoError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            nights,
          })),
          customerInfo: formData,
          nights,
          promoCode: promoApplied ? promoCode : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const isStep1Valid = cart.length > 0;
  const isStep2Valid = formData.checkInDate && formData.checkOutDate && formData.deliveryTime;
  const isStep3Valid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.resortName;

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Book Your <span className="gradient-text">Rental</span>
          </h1>
          <p className="text-gray-400">
            Select your items, dates, and complete your reservation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[
              { num: 1, label: "Select Items" },
              { num: 2, label: "Choose Dates" },
              { num: 3, label: "Your Details" },
              { num: 4, label: "Payment" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`flex items-center space-x-2 ${
                    step >= s.num ? "text-blue-500" : "text-gray-500"
                  }`}
                  disabled={s.num > step}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= s.num
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="hidden sm:inline text-sm">{s.label}</span>
                </button>
                {i < 3 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    step > s.num ? "bg-blue-500" : "bg-white/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Items */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                  Select Your Items
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((product) => {
                    const inCart = cart.find(item => item.product.id === product.id);
                    const isAddonTot = product.id === "slumber-tot" && hasBundleOrPod;
                    const displayPrice = isAddonTot ? SLUMBER_TOT_ADDON_DAILY_RATE : product.basePrice;
                    return (
                      <div
                        key={product.id}
                        className={`border rounded-xl p-6 transition-all ${
                          inCart
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-blue-500 font-bold">${displayPrice}</span>
                            <span className="text-gray-400 text-sm">/night</span>
                            {isAddonTot && <span className="text-green-400 text-xs ml-2">Add-on price</span>}
                          </div>
                          {inCart ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(product.id, inCart.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{inCart.quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.id, inCart.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {hasBundleOrPod && !cart.some(item => item.product.id === "slumber-tot") && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-yellow-400">Add a Slumber Tot for just ${SLUMBER_TOT_ADDON_DAILY_RATE}/night!</p>
                      <p className="text-sm text-gray-400 mt-1">Portable inflatable mattress — perfect for toddlers transitioning out of the crib.</p>
                    </div>
                    <button
                      onClick={() => {
                        const totProduct = products.find(p => p.id === "slumber-tot");
                        if (totProduct) addToCart(totProduct);
                      }}
                      className="ml-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      Add to Order
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Dates
                </button>
              </div>
            )}

            {/* Step 2: Choose Dates */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Choose Your Dates
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Check-in Date *</label>
                      <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        min={today}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Check-out Date *</label>
                      <input
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        min={formData.checkInDate || today}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Delivery Time *</label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                    </select>
                  </div>
                  {nights > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-blue-400">
                        Rental period: <span className="font-bold">{nights} night{nights > 1 ? "s" : ""}</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Your Details
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <h3 className="font-semibold flex items-center">
                    <Home className="h-5 w-5 mr-2 text-blue-500" />
                    Resort Information
                  </h3>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Resort Name *</label>
                    <ResortSearch
                      value={formData.resortName}
                      onChange={(name) => setFormData(prev => ({ ...prev, resortName: name }))}
                      onSelect={(resort) => setFormData(prev => ({
                        ...prev,
                        resortName: resort.name,
                        resortAddress: resort.address,
                      }))}
                      placeholder="Disney's Grand Floridian Resort"
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Resort Address</label>
                    <AddressAutocomplete
                      value={formData.resortAddress}
                      onChange={(address) => setFormData(prev => ({ ...prev, resortAddress: address }))}
                      placeholder="Start typing resort address..."
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!isStep3Valid}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Review & Pay
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                  Review & Payment
                </h2>

                {/* Order Summary */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-400">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="text-gray-400">Email:</span> {formData.email}</p>
                    <p><span className="text-gray-400">Phone:</span> {formData.phone}</p>
                    <p><span className="text-gray-400">Resort:</span> {formData.resortName}</p>
                    <p><span className="text-gray-400">Dates:</span> {formData.checkInDate} to {formData.checkOutDate} ({nights} nights)</p>
                    <p><span className="text-gray-400">Delivery:</span> {formData.deliveryTime}</p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-blue-500" />
                    Promo Code
                  </h3>
                  {promoApplied ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div>
                        <p className="text-green-400 font-medium">Test discount applied!</p>
                        <p className="text-sm text-gray-400">All items set to $0.50</p>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="text-gray-400 hover:text-red-400 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-red-400 text-sm mt-2">{promoError}</p>
                  )}
                </div>

                {/* Payment info */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Secure Payment with Stripe</h3>
                  <p className="text-gray-400 text-sm">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your payment.
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <button
                    type="button"
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      agreedToTerms
                        ? "bg-blue-600 border-blue-600"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  >
                    {agreedToTerms && <CheckSquare className="h-4 w-4 text-white" />}
                  </button>
                  <label className="text-sm text-gray-400">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(3)}
                    disabled={isLoading}
                    className="flex-1 border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || !agreedToTerms}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Pay ${total.toFixed(2)}</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm">No items selected</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const isAddonTot = item.product.id === "slumber-tot" && hasBundleOrPod;
                    const itemPrice = isAddonTot ? SLUMBER_TOT_ADDON_DAILY_RATE * nights : calculateItemPrice(item.product, nights);
                    const itemRate = isAddonTot ? SLUMBER_TOT_ADDON_DAILY_RATE : item.product.basePrice;
                    return (
                    <div key={item.product.id} className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-400">
                          {item.quantity > 1 ? `${item.quantity} x ` : ""}
                          {promoApplied
                            ? `(${promoApplied.description})`
                            : `$${itemRate} (${nights} night${nights > 1 ? "s" : ""})`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${promoApplied ? "text-green-400" : ""}`}>
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    );
                  })}

                  <hr className="border-white/10" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sales Tax (7%)</span>
                      <span>${salesTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Fee (3%)</span>
                      <span>${surcharge.toFixed(2)}</span>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
