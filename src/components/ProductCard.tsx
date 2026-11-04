import React, { useState } from 'react';
import { Product } from '../types';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedDirectly, setAddedDirectly] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedDirectly(true);
    setTimeout(() => setAddedDirectly(false), 1800);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-[#1a1c1c]/12 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-[#0b0c0c] hover:shadow-xs"
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-[4/3] bg-[#f4f2ee] overflow-hidden border-b border-[#1a1c1c]/10">
          <img
            src={product.images[imageIndex] || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Single Quiet Text Badge (if exists) */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-[#0b0c0c] text-white text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
              {product.badge}
            </div>
          )}

          {/* Stock Status text if low */}
          {product.inStock && product.stockCount <= 8 && (
            <div className="absolute top-3 right-3 bg-white/90 text-[#0b0c0c] text-[10px] font-mono px-2 py-0.5 border border-[#1a1c1c]/15">
              Only {product.stockCount} left
            </div>
          )}

          {/* Quick View Overlay Bar (appears on hover) */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0b0c0c]/80 via-[#0b0c0c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
            <span className="text-xs tracking-wider uppercase font-medium flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
            <span className="text-[11px] text-[#c4c7c7] font-mono">
              {product.origin}
            </span>
          </div>
        </div>

        {/* Card Content & Typographic Hierarchy */}
        <div className="p-5 space-y-2">
          {/* Unboxed Metadata (Origin and Category) */}
          <div className="flex items-center justify-between text-[11px] tracking-wider uppercase text-[#5e5e5e]">
            <span>{product.category}</span>
            <span>{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-medium text-[#0b0c0c] leading-snug line-clamp-1 group-hover:text-[#222222]">
            {product.name}
          </h3>

          {/* Subtitle / Key Material */}
          <p className="text-xs text-[#5e5e5e] line-clamp-1">
            {product.subtitle}
          </p>

          {/* Dimension / Specs snippet */}
          <div className="text-[11px] text-[#747878] font-mono pt-1">
            {product.dimensions}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Quick Action */}
      <div className="px-5 py-4 border-t border-[#1a1c1c]/8 bg-[#fafafa] flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-[#0b0c0c] font-mono tabular-nums">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[10px] text-[#747878] block">USD · Tax Incl.</span>
        </div>

        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name} to bag`}
          className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 border ${
            addedDirectly
              ? 'bg-emerald-800 text-white border-emerald-800'
              : 'bg-white text-[#0b0c0c] border-[#c4c7c7] hover:border-[#0b0c0c] hover:bg-[#0b0c0c] hover:text-white'
          }`}
        >
          {addedDirectly ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Add
            </>
          )}
        </button>
      </div>
    </article>
  );
};
