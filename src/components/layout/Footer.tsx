import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, Github, Twitter, Disc as Discord } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C0C0E] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#141417] border border-white/5">
            <Truck className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-100 font-display">Express Global Shipping</h4>
              <p className="text-[11px] text-zinc-400">Delivered within 2-3 business days</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#141417] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-100 font-display">256-Bit SSL Security</h4>
              <p className="text-[11px] text-zinc-400">Fully encrypted transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#141417] border border-white/5">
            <RotateCcw className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-100 font-display">30-Day Money-Back Guarantee</h4>
              <p className="text-[11px] text-zinc-400">Pre-paid hassle-free returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#141417] border border-white/5">
            <Headphones className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-100 font-display">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-zinc-400">Real-time customer assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-teal-400 p-[1px]">
                <div className="w-full h-full bg-[#0C0C0E] rounded-[11px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-wider text-zinc-100 font-display">
                NOVA<span className="text-purple-400">MART</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              NovaMart is a high-performance e-commerce platform offering premium wearable bio tech, acoustic headphones, and adaptive outerwear.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Subscribe to Product Drops
              </label>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="bg-[#141417] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 px-3.5 py-2.5 flex-1 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-xl transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-display">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link to="/shop" className="hover:text-purple-400 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-purple-400 transition-colors">Categories</Link></li>
              <li><Link to="/shop?sort=newest" className="hover:text-purple-400 transition-colors">New Releases</Link></li>
              <li><Link to="/shop?onSale=true" className="hover:text-purple-400 transition-colors">Special Offers</Link></li>
              <li><Link to="/wishlist" className="hover:text-purple-400 transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-display">
              Support & Account
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link to="/orders" className="hover:text-purple-400 transition-colors">Order Tracking</Link></li>
              <li><Link to="/profile" className="hover:text-purple-400 transition-colors">User Profile</Link></li>
              <li><Link to="/addresses" className="hover:text-purple-400 transition-colors">Shipping Addresses</Link></li>
              <li><Link to="/help" className="hover:text-purple-400 transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About NovaMart</Link></li>
            </ul>
          </div>

          {/* Admin & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-display">
              Platform & Open Source
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link to="/admin" className="text-teal-400 hover:text-teal-300 font-medium">Admin Dashboard</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">GSoC Guidelines</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>

            <div className="flex items-center gap-3 pt-3">
              <a href="#" className="p-2 rounded-xl bg-[#141417] border border-white/10 text-zinc-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#141417] border border-white/10 text-zinc-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#141417] border border-white/10 text-zinc-400 hover:text-white transition-colors">
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 NovaMart Inc. Built for Open Source & GSoC Contributors.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy</span>
            <span>API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
