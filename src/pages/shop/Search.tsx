import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/product';
import { ProductCard } from '../../components/common/ProductCard';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Skeleton } from '../../components/ui/Skeleton';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await ProductService.getProducts({ query, limit: 20 });
      setProducts(res.products);
      setLoading(false);
    };
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Search Results' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-3">
          <SearchIcon className="w-8 h-8 text-purple-400" /> Search: "{query}"
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Found {products.length} matching products
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center text-zinc-400">
          No products found for "{query}". Try checking your spelling or searching for broader terms.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
