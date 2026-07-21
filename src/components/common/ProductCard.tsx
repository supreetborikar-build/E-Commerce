import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/delay';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { soundFx } from '../../utils/sound';
import { Badge } from '../ui/Badge';
import { RatingStars } from './RatingStars';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useNotificationStore((s) => s.addToast);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundFx.playBuySound();
    const variant = product.variants ? product.variants[selectedVariantIndex] : undefined;
    addItem(product, variant, 1);
    setAddedSuccess(true);
    addToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name} is now in your cart.`,
    });
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundFx.playPop();
    toggleWishlist(product);
    addToast({
      type: isLiked ? 'info' : 'success',
      title: isLiked ? 'Removed from Wishlist' : 'Saved to Wishlist',
      message: product.name,
    });
  };

  return (
    <>
      <div className="group relative flex flex-col bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-glow-card">
        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1 pointer-events-auto">
            {product.isNew && <Badge variant="secondary">NEW</Badge>}
            {product.onSale && <Badge variant="accent">SALE</Badge>}
            {product.isBestSeller && <Badge variant="highlight">TOP</Badge>}
          </div>

          <button
            onClick={handleToggleWishlist}
            className={`pointer-events-auto p-2 rounded-full border backdrop-blur-md transition-all ${
              isLiked
                ? 'bg-pink-600/90 border-pink-500 text-white shadow-glow-accent'
                : 'bg-black/40 border-white/10 text-zinc-300 hover:text-white hover:bg-black/60'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Thumbnail & Image Hover */}
        <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-zinc-900">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent opacity-60" />

          {/* Quick Actions Hover Bar */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="flex-1 bg-zinc-900/90 hover:bg-zinc-800 backdrop-blur-md text-xs font-semibold py-2 px-3 rounded-xl border border-white/10 text-zinc-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between text-xs text-purple-400 font-medium mb-1">
            <span>{product.categoryName}</span>
            <span>{product.brand}</span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="text-sm font-semibold text-zinc-100 group-hover:text-purple-300 transition-colors line-clamp-1 mb-1.5"
          >
            {product.name}
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
            {product.tagline}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex flex-col">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-base font-bold text-zinc-100">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl border transition-all ${
                addedSuccess
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-purple-600/20 border-purple-500/40 hover:bg-purple-600 text-purple-300 hover:text-white shadow-glow-primary'
              }`}
              aria-label="Add to cart"
            >
              {addedSuccess ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        maxWidth="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
            <img
              src={product.images[0] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <Badge variant="primary" className="w-fit mb-2">
              {product.categoryName}
            </Badge>
            <h3 className="text-xl font-bold text-zinc-100 font-display mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-3">{product.tagline}</p>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} showNumber />

            <div className="flex items-baseline gap-2 my-4">
              <span className="text-2xl font-bold text-zinc-100">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {product.description}
            </p>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Select Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        selectedVariantIndex === idx
                          ? 'border-purple-500 bg-purple-950/40 text-purple-300'
                          : 'border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex gap-3 pt-4 border-t border-white/10">
              <Button
                variant="primary"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Link to={`/product/${product.slug}`} onClick={() => setIsQuickViewOpen(false)}>
                <Button variant="outline">Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
