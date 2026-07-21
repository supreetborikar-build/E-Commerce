import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product, ProductCategory } from '../../types/product';
import { formatCurrency } from '../../utils/delay';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useNotificationStore } from '../../store/useNotificationStore';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('299');
  const [newCategory, setNewCategory] = useState('neural-wearables');

  const addToast = useNotificationStore((s) => s.addToast);

  useEffect(() => {
    ProductService.getProducts({ limit: 50 }).then((res) => setProducts(res.products));
  }, []);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      tagline: 'Futuristic innovation crafted with precision.',
      description: 'Newly added store item.',
      price: Number(newPrice),
      category: newCategory as ProductCategory,
      categoryName: newCategory.replace('-', ' ').toUpperCase(),
      brand: 'Nova Labs',
      rating: 5.0,
      reviewCount: 1,
      stock: 25,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'],
      specifications: [{ name: 'Standard', value: 'Aerospace Grade' }],
      tags: ['new'],
      createdAt: new Date().toISOString(),
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    addToast({
      type: 'success',
      title: 'Product Added',
      message: `${newTitle} is now live in the catalog.`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Product Removed',
      message: 'Item removed from database.',
    });
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader
        title="Products Catalog Management"
        description="Add, edit, update inventory, or delete products."
      />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by title..."
              className="w-full bg-[#18181B] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-500"
            />
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Product
          </Button>
        </div>

        <div className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-zinc-900 border border-white/10"
                        />
                        <div>
                          <h4 className="font-semibold text-zinc-100">{p.name}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono">{p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="primary">{p.categoryName}</Badge>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-100">
                      {formatCurrency(p.price)}
                    </td>
                    <td className="p-4">
                      <span className={p.stock < 15 ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-4 font-mono text-zinc-300">{p.rating} ★</td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Product">
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <Input
            label="Product Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Cyber Acoustic Visor"
            required
          />
          <Input
            label="Price ($ USD)"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-[#18181B] text-zinc-100 text-sm rounded-xl border border-white/10 p-2.5"
            >
              <option value="neural-wearables">Neural Wearables</option>
              <option value="quantum-audio">Quantum Audio</option>
              <option value="cyber-apparel">Cyber Apparel</option>
              <option value="holographic-displays">Holographic Displays</option>
              <option value="smart-living">Smart Living</option>
              <option value="space-accessories">Space Accessories</option>
            </select>
          </div>
          <Button variant="primary" type="submit" className="w-full">
            Publish Product
          </Button>
        </form>
      </Modal>
    </div>
  );
};
