export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // per night
  image: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  nights: number;
}

export interface BookingFormData {
  // Customer Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Resort Info
  resortName: string;
  resortAddress: string;
  roomNumber: string;

  // Dates
  checkInDate: string;
  checkOutDate: string;
  deliveryTime: string;

  // Items
  items: CartItem[];

  // Special requests
  specialRequests?: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  deposit: number;
  total: number;
  nights: number;
}
