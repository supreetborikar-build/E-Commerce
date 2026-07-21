import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { CartService } from '../../services/cartService';
import { CartSummary } from '../../types/cart';
import { formatCurrency } from '../../utils/delay';
import { QuantitySelector } from '../../components/common/QuantitySelector';
import { Button } from '../../components/ui/Button';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, discountPercentage, applyCoupon, couponCode, removeCoupon } =
    useCartStore();
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CartService.calculateSummary(items, discountPercentage).then(setSummary);
  }, [items, discountPercentage]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = await applyCoupon(promoInput.trim());
    setPromoMessage(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review your items before proceeding to secure checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 font-display">Your cart is empty</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Find space-grade bio tech, acoustic headsets, and cyber apparel in our store catalog.
          </p>
          <Link to="/shop">
            <Button variant="primary">Browse Marketplace</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs text-zinc-400">
              <span>Product Details</span>
              <span>Subtotal</span>
            </div>

            {items.map((item) => {
              const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#18181B] border border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-zinc-900 border border-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100">{item.product.name}</h4>
                      {item.selectedVariant && (
                        <p className="text-xs text-purple-400 mt-0.5">{item.selectedVariant.name}</p>
                      )}
                      <span className="text-xs font-mono text-zinc-400 block mt-1">
                        {formatCurrency(itemPrice)} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <span className="text-sm font-bold font-mono text-zinc-100">
                      {formatCurrency(itemPrice * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link to="/shop">
                <Button variant="ghost" size="sm">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-zinc-100 font-display border-b border-white/10 pb-3">
              Order Summary
            </h3>

            {/* Promo Form */}
            <div>
              {couponCode ? (
                <div className="flex justify-between items-center bg-purple-950/40 border border-purple-500/30 px-3 py-2 rounded-xl text-xs">
                  <span className="text-purple-300 font-medium">
                    Code: <strong className="font-mono">{couponCode}</strong> ({discountPercentage}% OFF)
                  </span>
                  <button onClick={removeCoupon} className="text-zinc-400 hover:text-white text-xs underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code"
                      className="w-full bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 pl-8 pr-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <Button variant="outline" size="sm" type="submit">
                    Apply
                  </Button>
                </form>
              )}
              {promoMessage && (
                <p className={`text-[11px] mt-1 ${promoMessage.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {promoMessage.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-zinc-200">{formatCurrency(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promo Discount</span>
                  <span>-{formatCurrency(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-zinc-200">
                  {summary.shipping === 0 ? 'FREE' : formatCurrency(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax (8%)</span>
                <span className="text-zinc-200">{formatCurrency(summary.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-100 pt-3 border-t border-white/10 font-display">
                <span>Total Amount</span>
                <span className="text-purple-400">{formatCurrency(summary.total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> 100% Encrypted Checkout Guarantee
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
