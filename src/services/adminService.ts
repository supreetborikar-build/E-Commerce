import customersData from '../data/customers.json';
import { AdminDashboardStats, CustomerSummary } from '../types/admin';
import { delay } from '../utils/delay';

export class AdminService {
  private static customers: CustomerSummary[] = customersData as CustomerSummary[];

  static async getDashboardStats(): Promise<AdminDashboardStats> {
    await delay(400);
    return {
      totalRevenue: 184920,
      revenueGrowth: 24.5,
      totalOrders: 1420,
      ordersGrowth: 18.2,
      totalCustomers: 890,
      customersGrowth: 12.8,
      conversionRate: 3.84,
      conversionGrowth: 0.6,
      salesData: [
        { month: 'Jan', revenue: 14500, orders: 120 },
        { month: 'Feb', revenue: 18200, orders: 145 },
        { month: 'Mar', revenue: 22400, orders: 180 },
        { month: 'Apr', revenue: 26100, orders: 210 },
        { month: 'May', revenue: 31000, orders: 250 },
        { month: 'Jun', revenue: 36800, orders: 285 },
        { month: 'Jul', revenue: 35920, orders: 230 },
      ],
      categoryDistribution: [
        { name: 'Neural Wearables', value: 38 },
        { name: 'Quantum Audio', value: 24 },
        { name: 'Cyber Apparel', value: 18 },
        { name: 'Holographic Displays', value: 12 },
        { name: 'Space Accessories', value: 8 },
      ],
    };
  }

  static async getCustomers(): Promise<CustomerSummary[]> {
    await delay(300);
    return this.customers;
  }
}
