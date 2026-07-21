import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types/user';
import { UserService } from '../services/userService';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email?: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
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
        paymentMethods: [],
        notifications: [],
      },
      isAuthenticated: true,
      isAdmin: true, // Enabled for smooth demo of admin panel

      login: async () => {
        const profile = await UserService.getProfile();
        set({ user: profile, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'novamart-auth',
    }
  )
);
