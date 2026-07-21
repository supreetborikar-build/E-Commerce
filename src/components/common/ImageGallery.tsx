import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ['/placeholder.png'];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Active Image Display */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group">
        <img
          src={displayImages[activeImageIndex]}
          alt={`${productName} view ${activeImageIndex + 1}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails Bar */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square w-20 rounded-xl overflow-hidden bg-zinc-900 border transition-all shrink-0 ${
                activeImageIndex === idx
                  ? 'border-purple-500 shadow-glow-primary ring-2 ring-purple-500/50'
                  : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
