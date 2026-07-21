import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Star, Plus, Check } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product, ProductReview } from '../../types/product';
import { formatCurrency } from '../../utils/delay';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { soundFx } from '../../utils/sound';
import { ImageGallery } from '../../components/common/ImageGallery';
import { RatingStars } from '../../components/common/RatingStars';
import { QuantitySelector } from '../../components/common/QuantitySelector';
import { ProductCard } from '../../components/common/ProductCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Skeleton } from '../../components/ui/Skeleton';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Write review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useNotificationStore((s) => s.addToast);

  useEffect(() => {
    if (!slug) return;
    const loadProduct = async () => {
      setLoading(true);
      const p = await ProductService.getProductBySlug(slug);
      if (p) {
        setProduct(p);
        const [revs, rel] = await Promise.all([
          ProductService.getProductReviews(p.id),
          ProductService.getFeaturedProducts(),
        ]);
        setReviews(revs);
        setRelated(rel.filter((item) => item.id !== p.id).slice(0, 4));
      }
      setLoading(false);
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 font-display">Product Not Found</h2>
        <p className="text-xs text-zinc-400">
          The requested product slug could not be located in our neural catalog.
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const selectedVariant = product.variants ? product.variants[selectedVariantIndex] : undefined;
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCart = () => {
    soundFx.playBuySound();
    addItem(product, selectedVariant, quantity);
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} added to your shopping bag.`,
    });
  };

  const handleBuyNow = () => {
    soundFx.playBuySound();
    addItem(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleAddReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewComment) return;
    const newRev = await ProductService.addReview(product.id, {
      userName: reviewName,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
    });
    setReviews([newRev, ...reviews]);
    setIsReviewModalOpen(false);
    addToast({
      type: 'success',
      title: 'Review Published',
      message: 'Thank you for rating this product!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb Path */}
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.categoryName, href: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Gallery + Product Specifications & Buying Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Right Column: Details & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{product.categoryName}</Badge>
              <span className="text-xs text-purple-400 font-mono">Brand: {product.brand}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display">
              {product.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5">{product.tagline}</p>

            <div className="flex items-center gap-4 mt-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} showNumber />
              <span className="text-zinc-600">|</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {product.stock} units in stock
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-zinc-100 font-display">
              {formatCurrency(currentPrice)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-zinc-500 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            {product.onSale && (
              <Badge variant="accent" className="ml-auto">
                SAVE {Math.round(((product.compareAtPrice! - currentPrice) / product.compareAtPrice!) * 100)}%
              </Badge>
            )}
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-zinc-300 block">
                Choose Variant:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedVariantIndex === idx
                        ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-glow-primary'
                        : 'border-white/10 text-zinc-400 hover:text-white bg-zinc-900/40'
                    }`}
                  >
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{v.sku}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-zinc-300">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(quantity + 1)}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
                onClick={handleAddToCart}
              >
                Add to Bag
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  toggleWishlist(product);
                }}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isLiked
                    ? 'bg-pink-600/90 border-pink-500 text-white shadow-glow-accent'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-400 shrink-0" /> Express 48h Delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" /> 2-Yr Warranty
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-pink-400 shrink-0" /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="bg-[#18181B] border border-white/10 rounded-2xl p-8 space-y-6">
        <h3 className="text-xl font-bold text-zinc-100 font-display">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.specifications.map((spec, i) => (
            <div
              key={i}
              className="flex justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-xs"
            >
              <span className="text-zinc-400">{spec.name}</span>
              <span className="font-semibold text-zinc-200">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-zinc-100 font-display">Customer Reviews</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified feedback from early adopters
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsReviewModalOpen(true)}
          >
            Write Review
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
                    alt={rev.userName}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-zinc-100">{rev.userName}</h5>
                    <span className="text-[10px] text-zinc-500">{rev.date}</span>
                  </div>
                </div>
                <RatingStars rating={rev.rating} />
              </div>
              <h6 className="text-xs font-semibold text-zinc-200">{rev.title}</h6>
              <p className="text-xs text-zinc-400 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Carousel */}
      {related.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-zinc-100 font-display">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Write a Customer Review"
      >
        <form onSubmit={handleAddReviewSubmit} className="space-y-4">
          <Input
            label="Your Name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            placeholder="e.g. Elena Vance"
            required
          />
          <Input
            label="Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Summarize your experience..."
            required
          />
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Rating (1-5 Stars)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setReviewRating(s)}
                  className={`p-2 rounded-xl border transition-colors ${
                    reviewRating >= s
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-400'
                      : 'border-white/10 text-zinc-600'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Review Comment
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell us what you liked about this product..."
              className="w-full bg-[#18181B] text-zinc-100 text-xs rounded-xl border border-white/10 p-3 h-24 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <Button variant="primary" type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </Modal>
    </div>
  );
};
