import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories = [
    {
      title: 'Wearable Bio Tech',
      slug: 'wearable-tech',
      items: ['Nova Ring Air', 'AeroGlass AR', 'HRV Sensors', 'Health Bands'],
    },
    {
      title: 'Audio & Acoustics',
      slug: 'audio-gear',
      items: ['Acoustic Pods Pro', 'Studio Wireless', 'Noise Isolation Earwear', 'Wireless Charging Cases'],
    },
    {
      title: 'Outerwear & Apparel',
      slug: 'outerwear-apparel',
      items: ['ExoThermo Shell', 'Pulse Runner Pro', 'Technical Hoodies', 'Thermal Apparel'],
    },
    {
      title: 'Spatial Displays',
      slug: 'spatial-displays',
      items: ['8K Lightfield Viewports', 'Volumetric Monitors', 'Desktop Light Pillars'],
    },
  ];

  return (
    <div
      className="absolute top-full left-0 right-0 z-40 bg-[#0C0C0E]/95 border-b border-white/10 backdrop-blur-2xl shadow-2xl py-8 px-6 transition-all duration-300"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-3">
            <Link
              to={`/shop?category=${cat.slug}`}
              onClick={onClose}
              className="text-xs font-bold text-zinc-100 hover:text-purple-400 font-display uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>{cat.title}</span>
            </Link>
            <ul className="space-y-2 text-xs text-zinc-400">
              {cat.items.map((item) => (
                <li key={item}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="hover:text-zinc-200 transition-colors flex items-center gap-1 hover:translate-x-1 duration-200"
                  >
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured Promotion Banner */}
        <div className="bg-gradient-to-br from-purple-950/40 to-teal-950/30 border border-purple-500/20 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3" /> New Release
            </span>
            <h4 className="text-sm font-bold text-zinc-100 font-display">
              ExoThermo Climate Shell
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Active core temperature regulation for all weather conditions.
            </p>
          </div>
          <Link
            to="/shop?category=outerwear-apparel"
            onClick={onClose}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 mt-4"
          >
            Explore Outerwear <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
