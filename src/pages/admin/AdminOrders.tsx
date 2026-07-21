import React, { useEffect, useState } from 'react';
import { OrderService } from '../../services/orderService';
import { Order } from '../../types/order';
import { formatCurrency } from '../../utils/delay';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Badge } from '../../components/ui/Badge';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    OrderService.getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (id: string, status: Order['status']) => {
    const updated = await OrderService.updateOrderStatus(id, status);
    if (updated) {
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
    }
  };

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Orders Management" description="Monitor customer orders and update shipping statuses." />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5">
                    <td className="p-4 font-mono font-bold text-purple-300">{ord.orderNumber}</td>
                    <td className="p-4">
                      <div className="font-semibold text-zinc-100">{ord.customerName}</div>
                      <div className="text-[10px] text-zinc-500">{ord.customerEmail}</div>
                    </td>
                    <td className="p-4 font-mono text-zinc-400">{ord.createdAt.split('T')[0]}</td>
                    <td className="p-4">
                      <Badge variant={ord.status === 'delivered' ? 'success' : 'warning'}>{ord.status}</Badge>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-100">{formatCurrency(ord.total)}</td>
                    <td className="p-4 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['status'])}
                        className="bg-zinc-900 border border-white/10 text-xs text-zinc-200 rounded-lg p-1.5 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
