import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';
import { Product, ProductVariant } from '../types/product';
import { CartService } from '../services/cartService';
import { CouponService } from '../services/couponService';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  discountPercentage: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, selectedVariant?: ProductVariant, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: '',
      discountPercentage: 0,

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, selectedVariant, quantity = 1) => {
        const newItem = CartService.createCartItem(product, selectedVariant, quantity);
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === newItem.id);

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = [...currentItems];
          updatedItems[existingIndex].quantity += quantity;
        } else {
          updatedItems = [newItem, ...currentItems];
        }

        set({ items: updatedItems, isOpen: true });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: '', discountPercentage: 0 }),

      applyCoupon: async (code) => {
        const coupon = await CouponService.validateCoupon(code);
        if (coupon) {
          set({ couponCode: coupon.code, discountPercentage: coupon.discountPercentage });
          return { success: true, message: `Coupon ${coupon.code} applied! (${coupon.discountPercentage}% OFF)` };
        } else {
          return { success: false, message: 'Invalid or expired promo code.' };
        }
      },

      removeCoupon: () => set({ couponCode: '', discountPercentage: 0 }),
    }),
    {
      name: 'novamart-cart',
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode, discountPercentage: state.discountPercentage }),
    }
  )
);
