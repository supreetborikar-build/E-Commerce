import couponsData from '../data/coupons.json';
import { Coupon } from '../types/admin';
import { delay } from '../utils/delay';

export class CouponService {
  private static coupons: Coupon[] = couponsData as Coupon[];

  static async getCoupons(): Promise<Coupon[]> {
    await delay(250);
    return this.coupons;
  }

  static async validateCoupon(code: string): Promise<Coupon | null> {
    await delay(300);
    const cleanedCode = code.trim().toUpperCase();
    const found = this.coupons.find((c) => c.code === cleanedCode && c.active);
    return found || null;
  }
}
