import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, ChevronDown, LayoutDashboard, Menu, X, Zap, Volume2, VolumeX } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { soundFx } from '../../utils/sound';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from '../common/SearchModal';
import { NotificationCenter } from '../common/NotificationCenter';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(soundFx.soundEnabled);

  const cartItems = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleDrawer);
  const wishlistItems = useWishlistStore((s) => s.items);
  const { user, isAdmin } = useAuthStore();

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090B]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-teal-400 p-[1px] shadow-glow-primary group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400 group-hover:text-teal-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-zinc-100 font-display">
                  NOVA<span className="text-gradient-primary">MART</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-1">
                  Next-Gen Tech Marketplace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                to="/"
                className={`transition-colors hover:text-purple-400 ${
                  location.pathname === '/' ? 'text-purple-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                <button className="flex items-center gap-1 text-zinc-300 hover:text-purple-400 transition-colors py-2">
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                to="/shop"
                className={`transition-colors hover:text-purple-400 ${
                  location.pathname === '/shop' ? 'text-purple-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                Shop
              </Link>

              <Link
                to="/about"
                className={`transition-colors hover:text-purple-400 ${
                  location.pathname === '/about' ? 'text-purple-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                About
              </Link>

              <Link
                to="/help"
                className={`transition-colors hover:text-purple-400 ${
                  location.pathname === '/help' ? 'text-purple-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                Support
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Sound FX Toggle */}
              <button
                onClick={() => setSoundOn(soundFx.toggleSound())}
                className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                title={soundOn ? 'Mute UI Sounds' : 'Enable UI Sounds'}
                aria-label="Toggle Sound Effects"
              >
                {soundOn ? <Volume2 className="w-5 h-5 text-purple-400" /> : <VolumeX className="w-5 h-5 text-zinc-500" />}
              </button>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notification Center */}
              <NotificationCenter />

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/60 hover:text-white transition-all shadow-glow-primary"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-teal-400 text-[10px] font-bold text-zinc-950 flex items-center justify-center font-mono shadow-glow-secondary">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Profile / Admin Link */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 rounded-xl text-teal-400 hover:bg-teal-950/50 border border-teal-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                  />
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090B] flex flex-col p-6 md:hidden">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <span className="text-xl font-bold font-display text-zinc-100">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-base font-medium py-6">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-100 hover:text-purple-400">
              Home
            </Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-100 hover:text-purple-400">
              Shop All Products
            </Link>
            <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-100 hover:text-purple-400">
              Categories Explorer
            </Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-100 hover:text-purple-400 flex items-center gap-2">
              <User className="w-4 h-4" /> My Account
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-teal-400 flex items-center gap-2 font-semibold">
                <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
