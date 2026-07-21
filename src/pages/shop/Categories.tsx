import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/productService';
import { CategoryCard } from '../../components/common/CategoryCard';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Skeleton } from '../../components/ui/Skeleton';
import { Category } from '../../types/product';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Categories' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2">
          Category Explorer
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Browse through our specialized technological divisions.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      )}
    </div>
  );
};
