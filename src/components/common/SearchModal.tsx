import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/delay';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      setLoading(true);
      const data = await ProductService.getProducts({ query: query.trim(), limit: 5 });
      setResults(data.products);
      setLoading(false);
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <Search className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search smart rings, acoustic pods, thermal jackets..."
          className="w-full bg-[#141417] text-zinc-100 text-sm placeholder-zinc-500 rounded-xl border border-white/10 pl-11 pr-24 py-3 focus:outline-none focus:border-purple-500 shadow-sm"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="py-8 text-center text-xs text-zinc-400">
          Searching catalog...
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="py-8 text-center text-sm text-zinc-400">
          No products matching "<span className="text-zinc-200">{query}</span>" found.
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2 mb-4">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Instant Results
          </div>
          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigate(`/product/${p.slug}`);
                onClose();
              }}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  className="w-10 h-10 rounded-lg object-cover bg-zinc-900 border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">{p.name}</h4>
                  <p className="text-xs text-zinc-400">{p.categoryName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-purple-400">
                  {formatCurrency(p.price)}
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!query && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-teal-400" /> Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {['Nova Ring Air', '3D Lightfield', 'Acoustic Pods', 'Climate Shell', 'EDC Sling'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-[#141417] hover:bg-white/5 text-zinc-300 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
