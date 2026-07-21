export interface AdminDashboardStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  salesData: { month: string; revenue: number; orders: number }[];
  categoryDistribution: { name: string; value: number }[];
}

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minSpend: number;
  validUntil: string;
  usageCount: number;
  active: boolean;
}
