import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'credit-card' | 'crypto' | 'apple-pay' | 'nova-wallet';
  cardLast4?: string;
  cryptoTxHash?: string;
  paidAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}
