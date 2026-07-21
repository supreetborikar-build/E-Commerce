import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, CreditCard, Wallet, Coins, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { CartService } from '../../services/cartService';
import { OrderService } from '../../services/orderService';
import { CartSummary } from '../../types/cart';
import { Order, ShippingAddress, PaymentInfo } from '../../types/order';
import { formatCurrency } from '../../utils/delay';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { soundFx } from '../../utils/sound';

export const Checkout: React.FC = () => {
  const { items, discountPercentage, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form Fields
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Kaelen Vance',
    email: 'kaelen.vance@novamart.io',
    phone: '+1 (555) 019-2831',
    street: '404 Cybernetic Boulevard',
    city: 'Neo Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentInfo['method']>('nova-wallet');

  useEffect(() => {
    CartService.calculateSummary(items, discountPercentage).then(setSummary);
  }, [items, discountPercentage]);

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-secondary animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Payment Confirmed
        </div>
        <h1 className="text-4xl font-extrabold text-zinc-100 font-display">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Thank you for shopping at NovaMart. Your order reference is{' '}
          <strong className="text-purple-400 font-mono">{completedOrder.orderNumber}</strong>.
        </p>

        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 max-w-md mx-auto text-left text-xs space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span>Tracking Number:</span>
            <span className="font-mono text-zinc-200">{completedOrder.trackingNumber}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Estimated Express Delivery:</span>
            <span className="font-semibold text-teal-400">{completedOrder.estimatedDelivery}</span>
          </div>
          <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/10 font-bold text-sm">
            <span>Total Paid:</span>
            <span className="text-zinc-100">{formatCurrency(completedOrder.total)}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/orders">
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Your Orders
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 font-display">Your Cart is Empty</h2>
        <p className="text-xs text-zinc-400">Add products to your cart before checking out.</p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Browse Shop
        </Button>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundFx.playSuccessSound();

    const order = await OrderService.createOrder({
      items,
      shippingAddress,
      paymentInfo: {
        method: paymentMethod,
        cardLast4: '4242',
        paidAt: new Date().toISOString(),
      },
      subtotal: summary.subtotal,
      discount: summary.discount,
      shippingFee: summary.shipping,
      tax: summary.tax,
      total: summary.total,
    });

    clearCart();
    setCompletedOrder(order);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-2">
          <Lock className="w-7 h-7 text-purple-400" /> Encrypted Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Shipping & Payment Inputs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-100 font-display flex items-center gap-2 border-b border-white/10 pb-3">
              1. Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={shippingAddress.email}
                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                required
              />
              <Input
                label="Street Address"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                required
              />
              <Input
                label="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="State"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  required
                />
                <Input
                  label="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-100 font-display border-b border-white/10 pb-3">
              2. Select Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('nova-wallet')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === 'nova-wallet'
                    ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-glow-primary'
                    : 'border-white/10 text-zinc-400 hover:text-white bg-zinc-900/40'
                }`}
              >
                <Wallet className="w-6 h-6 text-purple-400" />
                <span className="text-xs font-semibold">Nova Pass Wallet</span>
                <span className="text-[10px] text-zinc-500">Zero fee instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit-card')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === 'credit-card'
                    ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-glow-primary'
                    : 'border-white/10 text-zinc-400 hover:text-white bg-zinc-900/40'
                }`}
              >
                <CreditCard className="w-6 h-6 text-teal-400" />
                <span className="text-xs font-semibold">Credit / Debit</span>
                <span className="text-[10px] text-zinc-500">Visa, Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-glow-primary'
                    : 'border-white/10 text-zinc-400 hover:text-white bg-zinc-900/40'
                }`}
              >
                <Coins className="w-6 h-6 text-pink-400" />
                <span className="text-xs font-semibold">Web3 / Crypto</span>
                <span className="text-[10px] text-zinc-500">USDC, ETH, SOL</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Final Order Review & Submit */}
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-zinc-100 font-display border-b border-white/10 pb-3">
            Review Order ({items.length})
          </h3>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-zinc-100 truncate">{item.product.name}</h5>
                  <span className="text-zinc-500 font-mono">Qty: {item.quantity}</span>
                </div>
                <span className="font-bold font-mono text-zinc-200">
                  {formatCurrency((item.selectedVariant?.price || item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-white/10">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200">{formatCurrency(summary.subtotal)}</span>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
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
              <span>Tax</span>
              <span className="text-zinc-200">{formatCurrency(summary.tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-zinc-100 pt-3 border-t border-white/10 font-display">
              <span>Total Payable</span>
              <span className="text-purple-400">{formatCurrency(summary.total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            Complete Order ({formatCurrency(summary.total)})
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> Protected by 256-Bit SSL Encrypted Security
          </div>
        </div>
      </form>
    </div>
  );
};
