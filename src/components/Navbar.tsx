import React, { useState } from 'react';
import { ShoppingBag, Search, X, Menu } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
  onScrollToStudio: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onScrollToStudio,
  searchQuery,
  onSearchChange
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f9f9f9]/95 backdrop-blur-sm border-b border-[#1a1c1c]/12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left font-medium tracking-[0.15em] text-[#0b0c0c] text-sm md:text-base uppercase whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          STUDIO KANJI
        </button>

        {/* Zone 2: 4–5 single-line clean text links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#444748]">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              activeCategory === 'all'
                ? 'text-[#0b0c0c] border-[#0b0c0c]'
                : 'border-transparent hover:text-[#0b0c0c] hover:border-[#1a1c1c]/40'
            }`}
          >
            All Goods
          </button>
          <button
            onClick={() => onSelectCategory('notebooks')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              activeCategory === 'notebooks'
                ? 'text-[#0b0c0c] border-[#0b0c0c]'
                : 'border-transparent hover:text-[#0b0c0c] hover:border-[#1a1c1c]/40'
            }`}
          >
            Notebooks
          </button>
          <button
            onClick={() => onSelectCategory('pens')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              activeCategory === 'pens'
                ? 'text-[#0b0c0c] border-[#0b0c0c]'
                : 'border-transparent hover:text-[#0b0c0c] hover:border-[#1a1c1c]/40'
            }`}
          >
            Writing Tools
          </button>
          <button
            onClick={() => onSelectCategory('desk')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              activeCategory === 'desk'
                ? 'text-[#0b0c0c] border-[#0b0c0c]'
                : 'border-transparent hover:text-[#0b0c0c] hover:border-[#1a1c1c]/40'
            }`}
          >
            Desk Objects
          </button>
          <button
            onClick={onScrollToStudio}
            className="whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b border-transparent hover:text-[#0b0c0c] hover:border-[#1a1c1c]/40 flex items-center gap-1.5"
          >
            <span>Tactile Studio</span>
            <span className="w-1.5 h-1.5 bg-[#0b0c0c]"></span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Utilities */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search input"
            className="p-1.5 text-[#444748] hover:text-[#0b0c0c] transition-colors"
          >
            {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Primary Action: Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label={`View shopping bag, ${cartItemCount} items`}
            className="px-4 py-2 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors flex items-center gap-2 text-xs font-medium tracking-wider uppercase"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono text-[11px] text-[#c4c7c7] border-l border-white/20 pl-2 ml-0.5">
              {cartItemCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#0b0c0c]"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {showSearch && (
        <div className="bg-[#f4f2ee] border-t border-[#1a1c1c]/10 px-6 py-3">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#5e5e5e]" />
            <input
              type="text"
              placeholder="Search by material, paper ruling, brass, or origin..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-transparent border-b border-[#0b0c0c] py-1 text-sm text-[#0b0c0c] placeholder-[#747878] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#5e5e5e] hover:text-[#0b0c0c] uppercase font-mono"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f9f9f9] border-t border-[#1a1c1c]/10 px-6 py-5 space-y-4">
          <div className="flex flex-col gap-3 text-xs tracking-wider uppercase font-medium">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#0b0c0c]"
            >
              All Goods
            </button>
            <button
              onClick={() => {
                onSelectCategory('notebooks');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#444748]"
            >
              Notebooks
            </button>
            <button
              onClick={() => {
                onSelectCategory('pens');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#444748]"
            >
              Writing Tools
            </button>
            <button
              onClick={() => {
                onSelectCategory('desk');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#444748]"
            >
              Desk Objects
            </button>
            <button
              onClick={() => {
                onScrollToStudio();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#0b0c0c] font-semibold flex items-center gap-2"
            >
              <span>Tactile Paper Studio</span>
              <span className="w-1.5 h-1.5 bg-[#0b0c0c]"></span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
