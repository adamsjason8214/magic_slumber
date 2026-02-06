import { Product } from "@/types";

// Standalone products available for individual rental
export const products: Product[] = [
  {
    id: "slumber-pod",
    name: "Slumber Pod",
    description: "The original blackout sleep pod for babies and toddlers. Creates a dark, private sleep space anywhere.",
    basePrice: 12, // Daily rate
    baseNights: 1,
    additionalNightPrice: 12,
    image: "/images/slumber-pod.png",
    features: [
      "Fits over most pack n plays and travel cribs",
      "99.9% blackout canopy",
      "Breathable mesh panels",
      "Easy setup in minutes",
      "Perfect for hotels and resorts",
    ],
  },
  {
    id: "slumber-tot",
    name: "Slumber Tot",
    description: "Comfortable, portable mattress perfect for toddlers who have outgrown the pack n play.",
    basePrice: 10, // Daily rate
    baseNights: 1,
    additionalNightPrice: 10,
    image: "/images/mattress.png",
    features: [
      "Inflatable mattress",
      "Waterproof cover",
      "Easy to clean",
      "Folds for storage",
      "SlumberPod can be placed over this bed",
    ],
  },
];

// Bundle items (not available for individual rental - included in Ultimate Bundle only)
export const bundleOnlyItems = [
  {
    id: "fan",
    name: "Portable Fan",
    description: "Whisper-quiet clip-on fan for comfortable sleep",
  },
  {
    id: "sound-machine",
    name: "Sound Machine",
    description: "Soothing white noise to help your little one sleep",
  },
  {
    id: "baby-monitor",
    name: "Video Baby Monitor",
    description: "HD video monitor with night vision",
  },
];

// ============================================
// NEW PRICING STRUCTURE - Per Day Rates
// ============================================

// Daily rates
export const ULTIMATE_BUNDLE_DAILY_RATE = 18; // Includes: Pod + Fan + Sound Machine + Monitor
export const SLUMBER_POD_DAILY_RATE = 12;
export const SLUMBER_TOT_DAILY_RATE = 10;
export const SLUMBER_TOT_ADDON_DAILY_RATE = 8; // When added to Bundle or Pod

// Delivery fee
export const DELIVERY_FEE = 15;
export const FREE_DELIVERY_MIN_DAYS = 5;

// Other constants
export const DEPOSIT_AMOUNT = 50; // Refundable security deposit
export const SALES_TAX_RATE = 0.07; // 7% Florida sales tax
export const SURCHARGE_RATE = 0.03; // 3% processing fee

// ============================================
// PRICING FUNCTIONS
// ============================================

// Get delivery fee based on rental duration
export function getDeliveryFee(nights: number): number {
  return nights >= FREE_DELIVERY_MIN_DAYS ? 0 : DELIVERY_FEE;
}

// Calculate price for Ultimate Bundle
export function calculateBundlePrice(nights: number): number {
  return ULTIMATE_BUNDLE_DAILY_RATE * nights;
}

// Calculate price for Slumber Pod standalone
export function calculatePodPrice(nights: number): number {
  return SLUMBER_POD_DAILY_RATE * nights;
}

// Calculate price for Slumber Tot standalone
export function calculateTotPrice(nights: number): number {
  return SLUMBER_TOT_DAILY_RATE * nights;
}

// Calculate price for Slumber Tot add-on (discounted when added to bundle/pod)
export function calculateTotAddonPrice(nights: number): number {
  return SLUMBER_TOT_ADDON_DAILY_RATE * nights;
}

// Calculate total rental price based on order type
export function calculateRentalPrice(
  orderType: "bundle" | "pod" | "tot",
  nights: number,
  hasTotAddon: boolean = false
): number {
  let basePrice = 0;

  switch (orderType) {
    case "bundle":
      basePrice = calculateBundlePrice(nights);
      break;
    case "pod":
      basePrice = calculatePodPrice(nights);
      break;
    case "tot":
      basePrice = calculateTotPrice(nights);
      break;
  }

  // Add Slumber Tot add-on if applicable (only for bundle or pod)
  if (hasTotAddon && (orderType === "bundle" || orderType === "pod")) {
    basePrice += calculateTotAddonPrice(nights);
  }

  return basePrice;
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

// ============================================
// PROMO CODES
// ============================================

export interface PromoCode {
  type: "percentage" | "fixed_total";
  value: number;
  minNights: number;
  description: string;
}

export const PROMO_CODES: Record<string, PromoCode> = {
  "magicbreak": {
    type: "percentage",
    value: 10,           // 10% off
    minNights: 3,        // Only valid for 3+ nights
    description: "10% off"
  },
  "noahdavid112622": {
    type: "fixed_total",
    value: 0.50,         // Total becomes $0.50
    minNights: 1,        // Always valid
    description: "Special discount"
  },
  "noahdavid2026": {
    type: "fixed_total",
    value: 0.50,         // Total becomes $0.50
    minNights: 1,        // Always valid
    description: "Test discount"
  }
};

// Validate promo code and return promo info or null if invalid
export function validatePromoCode(code: string, nights: number): PromoCode | null {
  const normalizedCode = code.toLowerCase().trim();
  const promo = PROMO_CODES[normalizedCode];

  if (!promo) {
    return null;
  }

  if (nights < promo.minNights) {
    return null;
  }

  return promo;
}

// Calculate discount amount based on promo code
export function calculatePromoDiscount(
  code: string,
  subtotal: number,
  nights: number
): { discountAmount: number; isFixedTotal: boolean; fixedTotal?: number } {
  const promo = validatePromoCode(code, nights);

  if (!promo) {
    return { discountAmount: 0, isFixedTotal: false };
  }

  if (promo.type === "percentage") {
    return {
      discountAmount: subtotal * (promo.value / 100),
      isFixedTotal: false
    };
  }

  if (promo.type === "fixed_total") {
    return {
      discountAmount: 0,
      isFixedTotal: true,
      fixedTotal: promo.value
    };
  }

  return { discountAmount: 0, isFixedTotal: false };
}

// ============================================
// LEGACY EXPORTS (for backwards compatibility during transition)
// ============================================
export const ULTIMATE_BUNDLE_PRICE = 75; // Deprecated
export const BUILD_YOUR_OWN_PRICE = 68; // Deprecated
export const INDIVIDUAL_DELIVERY_FEE = 10; // Deprecated
export const INDIVIDUAL_MIN_ORDER = 20; // Deprecated
export const BUNDLE_ADDON_BASE_PRICE = 30; // Deprecated
export const BLOCK_DISCOUNT_PERCENT = 0.20; // Deprecated

export function calculateBlocks(nights: number): number {
  return Math.ceil(nights / 4); // Deprecated - no longer using blocks
}

export function calculateAddOnPrice(nights: number): number {
  return calculateTotAddonPrice(nights); // Redirect to new function
}

export function calculateItemBlockPrice(product: Product, nights: number): number {
  // Simplified - just daily rate * nights
  return product.basePrice * nights;
}

export function calculateItemPrice(product: Product, nights: number): number {
  return calculateItemBlockPrice(product, nights);
}
