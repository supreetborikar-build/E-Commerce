import { ShippingAddress } from './order';

export interface UserPaymentMethod {
  id: string;
  type: 'card' | 'crypto';
  cardBrand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'security' | 'system';
  read: boolean;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  addresses: (ShippingAddress & { id: string; isDefault: boolean })[];
  paymentMethods: UserPaymentMethod[];
  notifications: UserNotification[];
}
