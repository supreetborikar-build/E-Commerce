import React, { useEffect, useState } from 'react';
import { AdminService } from '../../services/adminService';
import { CustomerSummary } from '../../types/admin';
import { formatCurrency } from '../../utils/delay';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Badge } from '../../components/ui/Badge';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);

  useEffect(() => {
    AdminService.getCustomers().then(setCustomers);
  }, []);

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Customers Database" description="View customer lifetime value and activity status." />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total Orders</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                        <div>
                          <div className="font-semibold text-zinc-100">{c.name}</div>
                          <div className="text-[10px] text-zinc-500">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-semibold">{c.totalOrders}</td>
                    <td className="p-4 font-mono font-bold text-teal-400">{formatCurrency(c.totalSpent)}</td>
                    <td className="p-4">
                      <Badge variant={c.status === 'vip' ? 'accent' : 'primary'}>{c.status.toUpperCase()}</Badge>
                    </td>
                    <td className="p-4 font-mono text-zinc-400">{c.lastOrderDate}</td>
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
