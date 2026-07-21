import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/product';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Badge } from '../../components/ui/Badge';

export const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProducts({ limit: 50 }).then((res) => setProducts(res.products));
  }, []);

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Inventory & Stock Alerts" description="Monitor real-time warehouse quantities and re-order thresholds." />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Available Units</th>
                  <th className="p-4">Status Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="p-4 font-semibold text-zinc-100">{p.name}</td>
                    <td className="p-4 text-purple-400">{p.categoryName}</td>
                    <td className="p-4 font-mono font-bold">{p.stock}</td>
                    <td className="p-4">
                      {p.stock < 12 ? (
                        <Badge variant="danger" className="flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="success">Optimal</Badge>
                      )}
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
