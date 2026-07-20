# 🚀 NovaMart — Production-Ready Futuristic E-Commerce Marketplace

NovaMart is a production-quality, frontend-only e-commerce marketplace platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Zustand**, **Framer Motion**, **TanStack Query**, and **Lucide React**.

Designed with a high-end **minimal futuristic dark theme**, NovaMart offers a complete shopping experience (Catalog, Search, Filtering, Variant Selector, Cart Drawer, Wishlist, Checkout, Tracking) and a comprehensive **Admin Dashboard** (Analytics charts, Inventory monitoring, Product CRUD, Order management, Coupons).

---

## ✨ Key Features

### 🛒 Customer Marketplace
- **Minimal Futuristic Aesthetic**: Dark glassmorphic interfaces, glow effects (`#09090B` background, purple/teal/pink highlights), smooth micro-interactions.
- **Asynchronous Service Layer**: Clean abstraction layer in `src/services/` with simulated network latency (`300ms–600ms`), allowing future backend contributors (e.g. Google Summer of Code) to replace mock services with real REST/GraphQL APIs without changing UI components.
- **Real-Time Interactive Search**: Modal search with instant query results and trending tags.
- **Advanced Filtering & Sorting**: Filter products by Category, Price range, In-stock status, On-sale items, or sort by price/rating/newest.
- **Product Details & Multi-Variant Selection**: High-res gallery zoom, variant swatches, spec sheet breakdown, customer review rating breakdown, write review modal.
- **Persistent State Management**: Persistent Cart Drawer and Wishlist using Zustand local storage sync with coupon discount validator.
- **Encrypted Checkout Flow**: Multi-step checkout experience (Shipping address, Nova Wallet / Credit Card / Crypto Web3 payments, Order success confirmation).
- **Order Tracking**: Order progress status badges and orbital tracking numbers.

### 🛡️ Admin Dashboard (`/admin`)
- **Interactive KPI Overview**: Live revenue metrics, growth rates, conversion charts using Recharts.
- **Product Management**: Filter, search, create, update, and delete catalog items.
- **Order Processing**: Real-time status update dropdowns (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
- **Customer Directory**: Customer lifetime spend analytics and VIP status tracking.
- **Inventory Monitoring**: Low stock alert badges.
- **Coupon Campaign Engine**: Discount percentage validator & promo code generator.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 6](https://vitejs.dev) |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) + PostCSS |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (with `persist` middleware) |
| **Data Fetching** | [TanStack React Query](https://tanstack.com/query) |
| **Animations** | [Framer Motion](https://www.framer.com/motion) |
| **Charts & Dataviz** | [Recharts](https://recharts.org) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **HTTP Client** | [Axios](https://axios-http.com) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com) & [Zod](https://zod.dev) |

---

## 📂 Project Structure

```
novamart/
├── public/                  # Static assets & favicon SVG
├── src/
│   ├── assets/              # Logos & media assets
│   ├── components/
│   │   ├── common/          # ProductCard, CategoryCard, SearchModal, CartDrawer, etc.
│   │   ├── layout/          # Navbar, Footer, MegaMenu, AdminHeader, AdminSidebar
│   │   └── ui/              # Button, Input, Select, Badge, Card, Modal, Drawer, Toast, Skeleton
│   ├── data/                # Mock master JSON datasets (products, categories, orders, customers)
│   ├── pages/
│   │   ├── admin/           # AdminDashboard, AdminProducts, AdminOrders, AdminAnalytics, etc.
│   │   ├── profile/         # Profile, Addresses, PaymentMethods, Notifications
│   │   ├── shop/            # Home, Shop, Categories, Search, ProductDetails, Wishlist, Cart, Checkout, Orders
│   │   └── support/         # HelpCenter, About, NotFound
│   ├── services/            # Async Mock API Services (ProductService, CartService, OrderService, AdminService)
│   ├── store/               # Zustand stores (useCartStore, useWishlistStore, useAuthStore, etc.)
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Currency & network delay utilities
│   ├── App.tsx              # Router tree & TanStack Query Provider
│   ├── index.css            # Custom theme variables & keyframe animations
│   └── main.tsx             # Entrypoint
├── eslint.config.js         # ESLint configuration
├── tailwind.config.js       # Custom theme color palette configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration & path aliases (`@/`)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/novamart.git
   cd novamart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http.://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Vercel
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel automatically detects Vite. Set output directory to `dist` if prompted.
4. Click **Deploy**.

### Netlify
1. Connect your GitHub repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## 🤝 Future Backend Integration Guide (For GSoC / Open-Source Contributors)

All UI components in NovaMart communicate exclusively through the abstract service layer in `src/services/`.

Example `src/services/productService.ts`:
```typescript
export class ProductService {
  static async getProducts(params?: ProductFilterParams): Promise<{ products: Product[], total: number }> {
    // Replace mock JSON filtering with real Axios HTTP request:
    // const response = await axios.get('/api/v1/products', { params });
    // return response.data;
  }
}
```

To connect a Node.js / Go / Django backend:
1. Update `Axios` base URL in a new `src/utils/apiClient.ts`.
2. Swap the JSON imports in `src/services/*.ts` with API calls.
3. No UI components in `src/pages/` require any modifications!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
