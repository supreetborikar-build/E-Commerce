import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'sm',
  showNumber = false,
  reviewCount,
}) => {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1.5 select-none">
      <div className="flex items-center text-amber-400">
        {Array.from({ length: maxStars }).map((_, i) => (
          <Star
            key={i}
            className={`${sizes[size]} ${
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : i < rating
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-zinc-700'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-zinc-200">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-zinc-400">({reviewCount})</span>
      )}
    </div>
  );
};
