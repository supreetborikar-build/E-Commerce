import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { CouponService } from '../../services/couponService';
import { Coupon } from '../../types/admin';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    CouponService.getCoupons().then(setCoupons);
  }, []);

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Promotional Coupons & Discounts" description="Create promo codes and track redemption counts." />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-zinc-100 font-display">Active Campaign Codes</h3>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create Coupon Code
          </Button>
        </div>

        <div className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Min Spend</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Times Used</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5">
                    <td className="p-4 font-mono font-bold text-purple-300">{c.code}</td>
                    <td className="p-4 font-mono text-emerald-400 font-bold">{c.discountPercentage}% OFF</td>
                    <td className="p-4 font-mono">${c.minSpend}</td>
                    <td className="p-4 font-mono text-zinc-400">{c.validUntil}</td>
                    <td className="p-4 font-mono text-teal-400">{c.usageCount}</td>
                    <td className="p-4">
                      <Badge variant={c.active ? 'success' : 'outline'}>{c.active ? 'Active' : 'Expired'}</Badge>
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
