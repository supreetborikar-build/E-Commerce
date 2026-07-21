import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RefreshCw, Filter } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product, ProductFilterParams, Category } from '../../types/product';
import { ProductCard } from '../../components/common/ProductCard';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Skeleton } from '../../components/ui/Skeleton';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState<ProductFilterParams['sortBy']>(
    (searchParams.get('sort') as ProductFilterParams['sortBy']) || 'featured'
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(searchParams.get('onSale') === 'true');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  useEffect(() => {
    ProductService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      const res = await ProductService.getProducts({
        category: selectedCategory || undefined,
        sortBy,
        inStock: inStockOnly || undefined,
        onSale: onSaleOnly || undefined,
        minPrice,
        maxPrice,
        page,
        limit: 8,
      });
      setProducts(res.products);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      setLoading(false);
    };

    fetchFilteredProducts();
  }, [selectedCategory, sortBy, inStockOnly, onSaleOnly, minPrice, maxPrice, page]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSortBy('featured');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb items={[{ label: 'Shop Catalog' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100 font-display">
              Explore All Products
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {products.length} of {total} items
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
              className="lg:hidden flex items-center gap-2 bg-zinc-900 border border-white/10 text-xs font-semibold px-3.5 py-2.5 rounded-xl text-zinc-300"
            >
              <Filter className="w-4 h-4 text-purple-400" /> Filters
            </button>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ProductFilterParams['sortBy'])}
              options={[
                { value: 'featured', label: 'Featured First' },
                { value: 'newest', label: 'Newest Arrivals' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' },
              ]}
              className="w-48"
            />
          </div>
        </div>
      </div>

      {/* Main Shop Body: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block space-y-6 bg-[#18181B] border border-white/10 p-6 rounded-2xl ${
            isFilterMobileOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-zinc-100 font-display flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" /> Filter Catalog
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-zinc-400 hover:text-purple-400 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category List Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPage(1);
                }}
                className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${
                  !selectedCategory
                    ? 'bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setPage(1);
                  }}
                  className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors flex justify-between items-center ${
                    selectedCategory === cat.id
                      ? 'bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              Price Range ($)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice ?? ''}
                onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 px-3 py-2 focus:outline-none focus:border-purple-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice ?? ''}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 px-3 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded bg-zinc-900 border-white/20 text-purple-600 focus:ring-purple-500"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded bg-zinc-900 border-white/20 text-purple-600 focus:ring-purple-500"
              />
              <span>On Sale Items</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center space-y-4">
              <p className="text-sm text-zinc-400">
                No products found matching your current filter criteria.
              </p>
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-xs text-zinc-400 font-mono px-3">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
