export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  materials: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  inStock: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}