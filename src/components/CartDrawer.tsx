import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  orderNotes: string;
  onUpdateNotes: (notes: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  orderNotes,
  onUpdateNotes
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#f9f9f9] border-l border-[#1a1c1c]/15 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#1a1c1c]/12 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-[#0b0c0c]" />
            <h2 className="text-base font-medium tracking-tight text-[#0b0c0c] uppercase">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bag drawer"
            className="p-1 text-[#5e5e5e] hover:text-[#0b0c0c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Gauge */}
        <div className="px-6 py-3 bg-[#f4f2ee] border-b border-[#1a1c1c]/10 text-xs">
          <div className="flex items-center justify-between text-[#444748] mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#0b0c0c]" />
              {remainingForFreeShipping > 0 ? (
                <>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> for free shipping</>
              ) : (
                <span className="text-emerald-800 font-semibold">Complimentary Archival Shipping Unlocked</span>
              )}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1 bg-[#e2e2e2] overflow-hidden">
            <div
              className="h-full bg-[#0b0c0c] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#5e5e5e]">
              <div className="w-16 h-16 border border-[#c4c7c7] flex items-center justify-center mb-4 bg-white">
                <ShoppingBag className="w-6 h-6 text-[#747878]" />
              </div>
              <h3 className="text-sm font-medium text-[#0b0c0c] uppercase tracking-wider mb-1">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#5e5e5e] max-w-xs mb-6">
                Explore our curated Japanese paper, notebooks, and brass instruments to begin your order.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white border border-[#1a1c1c]/10 p-4 flex gap-4 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#f4f2ee] shrink-0 border border-[#1a1c1c]/10 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-medium text-[#0b0c0c] leading-tight line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="text-[#747878] hover:text-[#ba1a1a] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Spec Taglines */}
                    <div className="text-[11px] text-[#5e5e5e] space-x-1.5 font-mono mt-0.5">
                      {item.ruling && <span>{item.ruling}</span>}
                      {item.weight && <span>· {item.weight}</span>}
                      {item.nib && <span>· {item.nib.split(' ')[0]}</span>}
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1a1c1c]/5">
                    <div className="flex items-center border border-[#c4c7c7] bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-[#0b0c0c] hover:bg-[#eeeeee]"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-medium text-[#0b0c0c]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-[#0b0c0c] hover:bg-[#eeeeee]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold font-mono text-[#0b0c0c] tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Studio Packaging Note (Optional) */}
          {items.length > 0 && (
            <div className="pt-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5e5e5e] mb-1">
                Studio Note or Embossing Instructions
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => onUpdateNotes(e.target.value)}
                placeholder="Include custom letterpress gift note or specific packaging instructions..."
                rows={2}
                className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] placeholder-[#747878] focus:outline-none focus:border-[#0b0c0c]"
              />
            </div>
          )}
        </div>

        {/* Drawer Footer: Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#1a1c1c]/12 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5e5e5e]">
                <span>Subtotal</span>
                <span className="font-mono text-[#0b0c0c] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5e5e5e]">
                <span>Archival Packaging & Postage</span>
                <span className="font-mono text-[#0b0c0c]">
                  {remainingForFreeShipping === 0 ? 'Complimentary' : '$8.00'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#0b0c0c] pt-2 border-t border-[#1a1c1c]/10">
                <span className="uppercase tracking-wide">Total (USD)</span>
                <span className="font-mono tabular-nums">
                  ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 8)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#747878]">
              Carbon neutral studio fulfillment · Shipped in 100% recyclable unbleached kraft
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
