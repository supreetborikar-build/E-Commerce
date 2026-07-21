import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set((state) => ({ items: state.items.filter((p) => p.id !== product.id) }));
        } else {
          set((state) => ({ items: [product, ...state.items] }));
        }
      },
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'novamart-wishlist',
    }
  )
);
