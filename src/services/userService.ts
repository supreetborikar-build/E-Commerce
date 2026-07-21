import { UserProfile } from '../types/user';
import { delay } from '../utils/delay';

export class UserService {
  private static profile: UserProfile = {
    id: 'user-001',
    name: 'Kaelen Vance',
    email: 'kaelen.vance@novamart.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    phone: '+1 (555) 019-2831',
    addresses: [
      {
        id: 'addr-1',
        isDefault: true,
        fullName: 'Kaelen Vance',
        email: 'kaelen.vance@novamart.io',
        phone: '+1 (555) 019-2831',
        street: '404 Cybernetic Boulevard',
        city: 'Neo Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States',
      },
    ],
    paymentMethods: [
      {
        id: 'pm-1',
        type: 'card',
        cardBrand: 'Visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2028,
        isDefault: true,
      },
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'Order Delivered',
        message: 'Your order NVM-2026-8801 has been safely delivered.',
        type: 'order',
        read: false,
        timestamp: '2 hours ago',
      },
      {
        id: 'notif-2',
        title: 'New Drop: HoloSphere Pro',
        message: 'Limited inventory available for the 8K volumetric viewport.',
        type: 'promo',
        read: true,
        timestamp: '1 day ago',
      },
    ],
  };

  static async getProfile(): Promise<UserProfile> {
    await delay(250);
    return this.profile;
  }

  static async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    await delay(400);
    this.profile = { ...this.profile, ...data };
    return this.profile;
  }

  static async markNotificationAsRead(id: string): Promise<void> {
    await delay(150);
    const n = this.profile.notifications.find((notif) => notif.id === id);
    if (n) n.read = true;
  }
}
