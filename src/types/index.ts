export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Store {
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  whatsappNumber: string;
}

export interface User {
  displayName: string | undefined;
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  provider: 'google' | 'phone';
  photoURL?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
export interface Location {
  id: String;
  name: String;
  
}
export interface BeautyProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  type: string;
}

export interface BeautyProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  type: string;
}
export interface FashionProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: 'men' | 'women' | 'kids' | 'accessories' | 'footwear';
  rating: number;
  reviews: number;
  brand: string;
}

// types.ts

export interface Products {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  type?: string; // Optional - used in beauty products
}

export type HeaderTheme = 'grocery' | 'fashion' | 'beauty';

export type CategoryItems ={
      id: String,
      name: String,
      image: String,
      category: String,

}
 
export type UnifiedProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  unit?: string;
  inStock?: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
  type?: string;
};