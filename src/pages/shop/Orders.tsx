import React, { useEffect, useState } from 'react';
import { Package, Truck, MapPin } from 'lucide-react';
import { OrderService } from '../../services/orderService';
import { Order } from '../../types/order';
import { formatCurrency } from '../../utils/delay';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Skeleton } from '../../components/ui/Skeleton';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="highlight">In Transit</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'My Orders' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-2">
          <Package className="w-8 h-8 text-purple-400" /> Order History & Tracking
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Track real-time express delivery status for all your purchases.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center text-zinc-400">
          No past orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-purple-500/30 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs">
                <div>
                  <span className="text-zinc-500">Order Ref:</span>{' '}
                  <strong className="text-zinc-100 font-mono">{ord.orderNumber}</strong>
                  <span className="text-zinc-500 ml-4 font-mono">Date: {ord.createdAt.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(ord.status)}
                  <span className="text-sm font-bold font-mono text-purple-400">
                    {formatCurrency(ord.total)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ord.items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <h5 className="font-semibold text-zinc-100 truncate">{item.product.name}</h5>
                      <p className="text-zinc-400">Qty: {item.quantity}</p>
                      <span className="font-bold text-zinc-200 mt-1 block font-mono">
                        {formatCurrency((item.selectedVariant?.price || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-3 border-t border-white/10 text-zinc-400 gap-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-400" />
                  <span>Tracking: <strong className="font-mono text-zinc-200">{ord.trackingNumber || 'N/A'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Shipping Address: {ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
