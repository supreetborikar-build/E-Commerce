import { CartItem, CartSummary } from '../types/cart';
import { Product, ProductVariant } from '../types/product';
import { delay } from '../utils/delay';

export class CartService {
  static async calculateSummary(
    items: CartItem[],
    couponDiscountPercent: number = 0
  ): Promise<CartSummary> {
    await delay(150);
    const subtotal = items.reduce((sum, item) => {
      const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const discount = Math.round((subtotal * couponDiscountPercent) / 100);
    const shipping = subtotal > 200 || items.length === 0 ? 0 : 25;
    const tax = Math.round((subtotal - discount) * 0.08); // 8% tax
    const total = Math.max(0, subtotal - discount + shipping + tax);

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
    };
  }

  static createCartItem(
    product: Product,
    selectedVariant?: ProductVariant,
    quantity: number = 1
  ): CartItem {
    return {
      id: `${product.id}-${selectedVariant?.id || 'default'}`,
      product,
      selectedVariant,
      quantity,
      addedAt: new Date().toISOString(),
    };
  }
}
