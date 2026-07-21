import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description,
  itemCount,
  image,
}) => {
  return (
    <Link
      to={`/shop?category=${id}`}
      className="group relative flex flex-col h-64 rounded-2xl overflow-hidden border border-white/10 p-6 transition-all duration-300 hover:border-teal-500/50 hover:shadow-glow-secondary"
    >
      {/* Background Image & Overlay */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2.5 py-1 rounded-full">
            {itemCount} Products
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-xl font-bold text-zinc-100 font-display group-hover:text-teal-300 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
