import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, Eye } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { AdminService } from '../../services/adminService';
import { OrderService } from '../../services/orderService';
import { AdminDashboardStats } from '../../types/admin';
import { Order } from '../../types/order';
import { formatCurrency } from '../../utils/delay';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Badge } from '../../components/ui/Badge';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true);
      const [s, ords] = await Promise.all([
        AdminService.getDashboardStats(),
        OrderService.getOrders(),
      ]);
      setStats(s);
      setRecentOrders(ords.slice(0, 5));
      setLoading(false);
    };
    loadAdminData();
  }, []);

  const COLORS = ['#8B5CF6', '#14B8A6', '#EC4899', '#06B6D4', '#F59E0B'];

  if (loading || !stats) {
    return (
      <div className="flex-1 bg-[#09090B] p-6 space-y-6">
        <AdminHeader title="Dashboard Overview" description="Loading real-time store analytics..." />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader
        title="Store Analytics & Operations"
        description="Live overview of sales, orders, conversion rate, and store metrics."
      />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-display text-zinc-100">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.revenueGrowth}% this month
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Total Orders</span>
              <ShoppingCart className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold font-display text-zinc-100">
              {stats.totalOrders}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.ordersGrowth}% vs last week
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Active Customers</span>
              <Users className="w-4 h-4 text-pink-400" />
            </div>
            <div className="text-2xl font-bold font-display text-zinc-100">
              {stats.totalCustomers}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.customersGrowth}% new users
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-display text-zinc-100">
              {stats.conversionRate}%
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.conversionGrowth}% optimal
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Growth Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 font-display">Revenue Growth Curve</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#71717A" fontSize={11} />
                  <YAxis stroke="#71717A" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 font-display">Sales by Category</h3>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryDistribution}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stats.categoryDistribution.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 text-xs">
              {stats.categoryDistribution.map((item, i) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-zinc-300">{item.name}</span>
                  </div>
                  <span className="font-mono text-zinc-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-100 font-display">Recent Sales Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Total</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5">
                    <td className="p-3 font-mono font-semibold text-purple-300">{ord.orderNumber}</td>
                    <td className="p-3 font-medium text-zinc-100">{ord.customerName}</td>
                    <td className="p-3">
                      <Badge variant={ord.status === 'delivered' ? 'success' : 'highlight'}>
                        {ord.status}
                      </Badge>
                    </td>
                    <td className="p-3 font-mono font-bold text-zinc-100">{formatCurrency(ord.total)}</td>
                    <td className="p-3 text-right">
                      <button className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
