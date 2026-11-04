import React from 'react';
import { ProductCategory } from '../types';
import { SlidersHorizontal, Check } from 'lucide-react';

interface FilterBarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  sortBy: 'curated' | 'price-asc' | 'price-desc' | 'name';
  onSortChange: (sort: 'curated' | 'price-asc' | 'price-desc' | 'name') => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  totalCount: number;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'notebooks', label: 'Notebooks & Paper' },
  { id: 'pens', label: 'Writing Tools' },
  { id: 'desk', label: 'Desk Objects' },
  { id: 'accessories', label: 'Leather & Sleeves' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  totalCount
}) => {
  return (
    <div className="w-full bg-[#f9f9f9] border-b border-[#1a1c1c]/12 py-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Category Segmented Buttons (Sharp 0px geometry) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-[#0b0c0c] text-white border-[#0b0c0c]'
                  : 'bg-white text-[#444748] border-[#c4c7c7] hover:border-[#1a1c1c] hover:text-[#0b0c0c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right: Controls & In-Stock Filter */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* In Stock Only Checkbox (Sharp square design as per design specs) */}
          <button
            onClick={onToggleInStock}
            className="flex items-center gap-2 text-[#444748] hover:text-[#0b0c0c] transition-colors py-1 cursor-pointer select-none"
          >
            <div
              className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                inStockOnly
                  ? 'bg-[#0b0c0c] border-[#0b0c0c] text-white'
                  : 'border-[#747878] bg-white'
              }`}
            >
              {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="tracking-wide">In-Stock Only</span>
          </button>

          <span className="text-[#c4c7c7] hidden sm:inline">|</span>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#5e5e5e] uppercase tracking-wider text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-white border border-[#c4c7c7] px-3 py-1.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c] cursor-pointer"
            >
              <option value="curated">Curated Index</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {/* Quiet Item Count */}
          <span className="text-[#5e5e5e] font-mono text-xs hidden lg:inline ml-2">
            ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </span>
        </div>
      </div>
    </div>
  );
};
