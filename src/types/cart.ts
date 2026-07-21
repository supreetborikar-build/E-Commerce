import { Product, ProductVariant } from './product';

export interface CartItem {
  id: string; // unique item id in cart
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
}
