import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductCategory, PaperRuling, PaperWeight, NibSize, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { EditorialHero } from './components/EditorialHero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TactilePaperStudio } from './components/TactilePaperStudio';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Check, Sparkles, FilterX } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'studio_kanji_cart_v1';
const LOCAL_STORAGE_NOTES_KEY = 'studio_kanji_notes_v1';

export default function App() {
  // Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderNotes, setOrderNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_NOTES_KEY) || '';
    } catch {
      return '';
    }
  });

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'curated' | 'price-asc' | 'price-desc' | 'name'>('curated');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, orderNotes);
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [orderNotes]);

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to Bag Handler
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    ruling?: PaperRuling,
    weight?: PaperWeight,
    nib?: NibSize
  ) => {
    // Determine unique cart item ID by product ID + variant configurations
    const variantKey = `${product.id}-${ruling || 'none'}-${weight || 'none'}-${nib || 'none'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === variantKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId: variantKey,
            product,
            ruling,
            weight,
            nib,
            quantity,
            unitPrice: product.price
          }
        ];
      }
    });

    triggerToast(`Added ${quantity}x "${product.name}" to your bag.`);
  };

  // Custom Notebook from Tactile Paper Studio
  const handleAddCustomNotebook = (ruling: PaperRuling, weight: PaperWeight) => {
    const journalProduct = PRODUCTS.find((p) => p.id === 'linen-journal-a5') || PRODUCTS[0];
    handleAddToCart(journalProduct, 1, ruling, weight);
    setIsCartOpen(true);
    triggerToast(`Configured Atelier Journal (${weight}, ${ruling}) added to bag.`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove Item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // In-Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockCount > 0);
    }

    // Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, inStockOnly, searchQuery, sortBy]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const scrollToStudio = () => {
    const el = document.getElementById('tactile-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderCompleted = (order: OrderDetails) => {
    // Clear shopping cart on successful checkout
    setCartItems([]);
    setOrderNotes('');
    triggerToast(`Order ${order.orderId} placed successfully.`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-sans selection:bg-[#0b0c0c] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b0c0c] text-white px-5 py-3 shadow-xl border border-white/20 text-xs font-medium tracking-wide flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        activeCategory={activeCategory}
        onScrollToStudio={scrollToStudio}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Editorial Hero Section */}
      <EditorialHero
        onExploreCatalog={scrollToCatalog}
        onOpenTactileStudio={scrollToStudio}
      />

      {/* Tactile Paper Studio: Real-Time Paper Ruling & Weight Simulator */}
      <TactilePaperStudio onAddCustomNotebook={handleAddCustomNotebook} />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="w-full py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Subhead & Count */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-[#1a1c1c]/12 gap-2">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5e5e5e] block mb-1">
                Atelier Goods Catalog
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#0b0c0c]">
                Curated Physical Tools & Paper
              </h2>
            </div>
            <span className="text-xs text-[#5e5e5e] font-mono">
              Showing {filteredProducts.length} of {PRODUCTS.length} curated objects
            </span>
          </div>

          {/* Filter Bar with Segmented Category Controls */}
          <FilterBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onToggleInStock={() => setInStockOnly(!inStockOnly)}
            totalCount={filteredProducts.length}
          />

          {/* Product Grid (3-column on desktop, 2-column on tablet, 1 on mobile) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={(p) => {
                    handleAddToCart(p, 1);
                    setIsCartOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="py-20 text-center bg-white border border-[#1a1c1c]/10 my-8 p-8">
              <div className="w-12 h-12 border border-[#c4c7c7] flex items-center justify-center mx-auto mb-3">
                <FilterX className="w-6 h-6 text-[#747878]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b0c0c]">
                No matching archival goods
              </h3>
              <p className="text-xs text-[#5e5e5e] max-w-sm mx-auto mt-1 mb-5">
                We could not find items matching your search or filters. Try resetting your query or viewing all items.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="px-5 py-2.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View / PDP Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, quantity, ruling, weight, nib) => {
          handleAddToCart(product, quantity, ruling, weight, nib);
          setIsCartOpen(true);
        }}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        orderNotes={orderNotes}
        onUpdateNotes={setOrderNotes}
      />

      {/* 2-Step Checkout Modal & Order Confirmation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderNotes={orderNotes}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
