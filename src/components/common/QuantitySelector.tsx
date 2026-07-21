import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <div className="inline-flex items-center rounded-xl bg-zinc-900 border border-white/10 p-1">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-9 text-center text-sm font-semibold text-zinc-100 font-mono">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
