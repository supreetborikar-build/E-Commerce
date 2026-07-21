import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { ProductCard } from '../../components/common/ProductCard';
import { Button } from '../../components/ui/Button';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Wishlist: React.FC = () => {
  const { items, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveAllToCart = () => {
    items.forEach((p) => addItem(p));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100 font-display">
              Saved Wishlist
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              You have {items.length} saved products in your vault.
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={clearWishlist} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Clear All
              </Button>
              <Button variant="primary" size="sm" onClick={handleMoveAllToCart} leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}>
                Move All to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-pink-950/40 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-100 font-display">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Save items while browsing to revisit them anytime or quickly add them to your cart later.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="sm">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
