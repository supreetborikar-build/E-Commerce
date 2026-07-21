import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { useCartStore } from '../../store/useCartStore';
import { CartService } from '../../services/cartService';
import { CartSummary } from '../../types/cart';
import { formatCurrency } from '../../utils/delay';
import { soundFx } from '../../utils/sound';
import { QuantitySelector } from './QuantitySelector';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, discountPercentage, applyCoupon, couponCode, removeCoupon } =
    useCartStore();
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });
  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CartService.calculateSummary(items, discountPercentage).then(setSummary);
  }, [items, discountPercentage]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    const res = await applyCoupon(promoInput.trim());
    if (res.success) {
      soundFx.playSuccessSound();
    } else {
      soundFx.playClick();
    }
    setPromoMessage(res);
    setPromoLoading(false);
  };

  const freeShippingThreshold = 200;
  const progressPercent = Math.min(100, (summary.subtotal / freeShippingThreshold) * 100);

  return (
    <Drawer isOpen={isOpen} onClose={closeDrawer} title="Your Cart Summary">
      <div className="flex flex-col h-full">
        {/* Free Shipping Progress Bar */}
        <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-zinc-300">
              {summary.subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-400 font-semibold">🎉 You unlocked FREE Shipping!</span>
              ) : (
                `Add ${formatCurrency(freeShippingThreshold - summary.subtotal)} for FREE Shipping`
              )}
            </span>
            <span className="text-zinc-400 font-mono">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-teal-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-glow-primary">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-100 font-display mb-1">
              Your cart is empty
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs mb-6">
              Explore our futuristic collection of bio-rings, quantum sound pods, and cyber apparel.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                closeDrawer();
                navigate('/shop');
              }}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => {
                const itemPrice = item.selectedVariant
                  ? item.selectedVariant.price
                  : item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-zinc-900/60 border border-white/5 rounded-xl hover:border-white/15 transition-colors"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-800 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-100 truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-purple-400 mt-0.5">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <div className="text-xs font-bold text-zinc-100 mt-1">
                        {formatCurrency(itemPrice * item.quantity)}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Form */}
            <div className="mt-4 pt-4 border-t border-white/10">
              {couponCode ? (
                <div className="flex justify-between items-center bg-purple-950/40 border border-purple-500/30 px-3 py-2 rounded-xl text-xs">
                  <span className="text-purple-300 font-medium">
                    Promo: <strong className="font-mono text-purple-200">{couponCode}</strong> ({discountPercentage}% OFF)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-white text-xs underline"
                  >
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
                      placeholder="Promo Code (e.g. NOVA2026)"
                      className="w-full bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 pl-8 pr-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <Button variant="outline" size="sm" type="submit" isLoading={promoLoading}>
                    Apply
                  </Button>
                </form>
              )}
              {promoMessage && (
                <p className={`text-[11px] mt-1.5 ${promoMessage.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {promoMessage.message}
                </p>
              )}
            </div>

            {/* Summary Breakdown */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-zinc-200">{formatCurrency(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>-{formatCurrency(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Shipping</span>
                <span className="text-zinc-200">
                  {summary.shipping === 0 ? 'FREE' : formatCurrency(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax</span>
                <span className="text-zinc-200">{formatCurrency(summary.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-100 pt-2 border-t border-white/10 font-display">
                <span>Total</span>
                <span className="text-purple-400">{formatCurrency(summary.total)}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="mt-5 space-y-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  closeDrawer();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> 256-Bit SSL Encrypted Checkout Guarantee
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};
