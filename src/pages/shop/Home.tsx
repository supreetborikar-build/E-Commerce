import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Flame, Award, ChevronRight } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product, Category } from '../../types/product';
import { ProductCard } from '../../components/common/ProductCard';
import { CategoryCard } from '../../components/common/CategoryCard';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      const [feat, trend, cats] = await Promise.all([
        ProductService.getFeaturedProducts(),
        ProductService.getTrendingProducts(),
        ProductService.getCategories(),
      ]);
      setFeaturedProducts(feat);
      setTrendingProducts(trend);
      setCategories(cats);
      setLoading(false);
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-8 overflow-hidden">
        {/* Subtle Radial Mesh */}
        <div className="absolute inset-0 bg-cyber-grid pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C21] border border-white/10 text-purple-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Next-Generation Bio & Spatial Hardware</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 font-display leading-[1.15]">
            Technology Built For <br />
            <span className="text-gradient-accent">Everyday Performance</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Grade-5 titanium smart rings, spatial lightfield displays, and active climate outerwear designed for high performance and daily utility.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link to="/shop">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Catalog
              </Button>
            </Link>
            <Link to="/shop?category=wearable-tech">
              <Button size="lg" variant="outline" leftIcon={<Zap className="w-4 h-4 text-teal-400" />}>
                Wearable Bio Tech
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/10 mt-8">
            <div>
              <div className="text-2xl font-bold text-zinc-100 font-display">100%</div>
              <div className="text-xs text-zinc-400">Authentic Hardware</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400 font-display">2-3 Days</div>
              <div className="text-xs text-zinc-400">Global Express Shipping</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-display">Titanium</div>
              <div className="text-xs text-zinc-400">Grade-5 Alloy Build</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400 font-display">4.9 / 5</div>
              <div className="text-xs text-zinc-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider">
              Explore Divisions
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 font-display mt-1">
              Curated Hardware Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 mt-2 md:mt-0"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-teal-400 uppercase tracking-wider">
          <Flame className="w-4 h-4 text-amber-400" /> Handpicked Selections
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <h2 className="text-3xl font-bold text-zinc-100 font-display">
            Featured Products
          </h2>
          <Link
            to="/shop"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            Shop Full Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Flagship Product Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#181528] via-[#141417] to-[#121B1B] p-8 sm:p-12 shadow-glow-card">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C21] border border-white/10 text-pink-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-pink-400" /> Flagship Release
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display">
              ExoThermo Climate Shell
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Equipped with active thermal fluid channels that regulate core temperature between -10°C and 40°C. Forged from waterproof, self-healing Cordura nanofiber.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/product/exothermo-climate-shell">
                <Button variant="accent" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Shop Now — $499
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-mono font-semibold text-pink-400 uppercase tracking-wider">
              Top Customer Ratings
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 font-display mt-1">
              Trending Products
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
