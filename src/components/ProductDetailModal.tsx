import React, { useState } from 'react';
import { Product, PaperRuling, PaperWeight, NibSize } from '../types';
import { X, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    ruling?: PaperRuling,
    weight?: PaperWeight,
    nib?: NibSize
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRuling, setSelectedRuling] = useState<PaperRuling | undefined>(
    product.rulingOptions ? product.rulingOptions[0] : undefined
  );
  const [selectedWeight, setSelectedWeight] = useState<PaperWeight | undefined>(
    product.weightOptions ? product.weightOptions[0] : undefined
  );
  const [selectedNib, setSelectedNib] = useState<NibSize | undefined>(
    product.nibOptions ? product.nibOptions[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedRuling, selectedWeight, selectedNib);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-product-name"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white border border-[#1a1c1c]/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 border border-[#1a1c1c]/15 text-[#0b0c0c] hover:bg-[#0b0c0c] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery Gallery */}
          <div className="bg-[#f4f2ee] p-6 border-b md:border-b-0 md:border-r border-[#1a1c1c]/10 flex flex-col justify-between">
            {/* Primary Big Image */}
            <div className="aspect-[4/3] sm:aspect-[1/1] bg-white border border-[#1a1c1c]/10 overflow-hidden relative">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#0b0c0c] text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 shrink-0 border overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#0b0c0c] ring-1 ring-[#0b0c0c]'
                        : 'border-[#c4c7c7] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Craft Origin & Material Stamp */}
            <div className="mt-6 pt-4 border-t border-[#1a1c1c]/10 text-xs text-[#5e5e5e] space-y-1">
              <div>
                <span className="text-[#0b0c0c] font-medium">Origin:</span> {product.origin}
              </div>
              <div>
                <span className="text-[#0b0c0c] font-medium">Material:</span> {product.material}
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#5e5e5e] mb-1 font-mono">
                  <span>{product.category}</span>
                  <span>{product.dimensions}</span>
                </div>
                <h2
                  id="pdp-product-name"
                  className="text-xl sm:text-2xl font-medium tracking-tight text-[#0b0c0c] leading-snug"
                >
                  {product.name}
                </h2>
                <p className="text-xs text-[#5e5e5e] mt-1">{product.subtitle}</p>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-xl font-medium text-[#0b0c0c] font-mono tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#747878]">USD · Free shipping over $75</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#444748] leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selectors: Ruling Options (for Notebooks) */}
              {product.rulingOptions && product.rulingOptions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#1a1c1c]/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#0b0c0c]">
                      Select Ruling
                    </span>
                    <span className="text-[#5e5e5e] font-mono">{selectedRuling}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.rulingOptions.map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRuling(r)}
                        className={`py-2 px-3 text-xs border text-left transition-colors ${
                          selectedRuling === r
                            ? 'bg-[#0b0c0c] text-white border-[#0b0c0c]'
                            : 'bg-white text-[#1a1c1c] border-[#c4c7c7] hover:border-[#1a1c1c]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Weight Options (for Paper) */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#0b0c0c]">
                      Paper Grammage
                    </span>
                    <span className="text-[#5e5e5e] font-mono">{selectedWeight}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.weightOptions.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`py-2 px-2 text-xs border text-center transition-colors ${
                          selectedWeight === w
                            ? 'bg-[#0b0c0c] text-white border-[#0b0c0c]'
                            : 'bg-white text-[#1a1c1c] border-[#c4c7c7] hover:border-[#1a1c1c]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Nib Size (for Pens) */}
              {product.nibOptions && product.nibOptions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#1a1c1c]/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#0b0c0c]">
                      Fountain Nib Size
                    </span>
                    <span className="text-[#5e5e5e] font-mono">{selectedNib}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.nibOptions.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedNib(n)}
                        className={`py-2 px-2 text-xs border text-center transition-colors ${
                          selectedNib === n
                            ? 'bg-[#0b0c0c] text-white border-[#0b0c0c]'
                            : 'bg-white text-[#1a1c1c] border-[#c4c7c7] hover:border-[#1a1c1c]'
                        }`}
                      >
                        {n.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2 pt-3 border-t border-[#1a1c1c]/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0b0c0c]">
                  Craft Specifications
                </span>
                <ul className="text-xs text-[#5e5e5e] space-y-1.5 list-disc pl-4">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-6 mt-6 border-t border-[#1a1c1c]/10 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#c4c7c7] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-10 flex items-center justify-center text-sm font-semibold text-[#0b0c0c] hover:bg-[#eeeeee] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-semibold text-[#0b0c0c]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-10 flex items-center justify-center text-sm font-semibold text-[#0b0c0c] hover:bg-[#eeeeee] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 h-10 px-6 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#0b0c0c] text-white hover:bg-[#222222]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      Add to Bag — ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#747878] pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0b0c0c]" /> Lifetime warranty on metals
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0b0c0c]" /> 30-day tactile trial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
