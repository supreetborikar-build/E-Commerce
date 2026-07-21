import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { StoreLayout } from './components/layout/StoreLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Shop Pages
import { Home } from './pages/shop/Home';
import { Shop } from './pages/shop/Shop';
import { Categories } from './pages/shop/Categories';
import { Search } from './pages/shop/Search';
import { ProductDetails } from './pages/shop/ProductDetails';
import { Wishlist } from './pages/shop/Wishlist';
import { Cart } from './pages/shop/Cart';
import { Checkout } from './pages/shop/Checkout';
import { Orders } from './pages/shop/Orders';

// Profile Pages
import { Profile } from './pages/profile/Profile';
import { Addresses } from './pages/profile/Addresses';
import { PaymentMethods } from './pages/profile/PaymentMethods';
import { Notifications } from './pages/profile/Notifications';

// Support Pages
import { HelpCenter } from './pages/support/HelpCenter';
import { About } from './pages/support/About';
import { NotFound } from './pages/support/NotFound';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminSettings } from './pages/admin/AdminSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Customer Store Routes */}
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="categories" element={<Categories />} />
            <Route path="search" element={<Search />} />
            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
