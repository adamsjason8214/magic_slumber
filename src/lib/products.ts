import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "slumber-pod",
    name: "Slumber Pod",
    description: "The original blackout sleep pod for babies and toddlers. Creates a dark, private sleep space anywhere.",
    basePrice: 50,
    baseNights: 3,
    additionalNightPrice: 10,
    image: "/images/slumber-pod.jpg",
    features: [
      "Fits over most pack n plays and travel cribs",
      "99.9% blackout canopy",
      "Breathable mesh panels",
      "Easy setup in minutes",
      "Perfect for hotels and resorts",
    ],
  },
  {
    id: "fan-sound-machine",
    name: "Fan & Sound Machine",
    description: "Whisper-quiet fan with built-in sound machine that provides soothing white noise and air circulation for better sleep.",
    basePrice: 15,
    baseNights: 3,
    additionalNightPrice: 5,
    image: "/images/fan.jpg",
    features: [
      "USB rechargeable",
      "Multiple speed settings",
      "Built-in sound machine",
      "Natural white noise",
      "Compact and portable",
    ],
  },
  {
    id: "baby-monitor",
    name: "Video Baby Monitor",
    description: "HD video monitor with night vision so you can keep an eye on your little one from anywhere in your suite.",
    basePrice: 30,
    baseNights: 3,
    additionalNightPrice: 8,
    image: "/images/monitor.jpg",
    features: [
      "HD video with night vision",
      "Two-way audio",
      "Temperature display",
      "Long range signal",
      "No WiFi required",
    ],
  },
  {
    id: "toddler-mattress",
    name: "Toddler Travel Mattress",
    description: "Comfortable, portable mattress perfect for toddlers who have outgrown the pack n play.",
    basePrice: 40,
    baseNights: 3,
    additionalNightPrice: 10,
    image: "/images/mattress.jpg",
    features: [
      "Memory foam comfort",
      "Waterproof cover",
      "Easy to clean",
      "Folds for storage",
      "Includes fitted sheet",
    ],
  },
];

export const DELIVERY_FEE = 15;
export const DEPOSIT_AMOUNT = 50; // Refundable security deposit

export function calculateItemPrice(product: Product, nights: number): number {
  if (nights <= product.baseNights) {
    return product.basePrice;
  }
  const additionalNights = nights - product.baseNights;
  return product.basePrice + additionalNights * product.additionalNightPrice;
}

export function calculateOrderTotal(
  items: { product: Product; quantity: number; nights: number }[]
): {
  subtotal: number;
  deliveryFee: number;
  deposit: number;
  total: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemPrice(item.product, item.nights) * item.quantity,
    0
  );

  return {
    subtotal,
    deliveryFee: DELIVERY_FEE,
    deposit: DEPOSIT_AMOUNT,
    total: subtotal + DELIVERY_FEE + DEPOSIT_AMOUNT,
  };
}
