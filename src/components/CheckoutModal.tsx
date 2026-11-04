import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, Check, ArrowRight, ArrowLeft, Shield, Printer, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderNotes: string;
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderNotes,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');

  // Customer Form State
  const [formData, setFormData] = useState({
    fullName: 'Clara Vance',
    email: 'clara.vance@studio-arch.com',
    address: '428 Mercer Street, Floor 4',
    city: 'New York',
    postalCode: '10013',
    country: 'United States',
    shippingMethod: 'standard' as 'standard' | 'express',
    paymentMethod: 'card' as 'card' | 'bank',
    cardNumber: '•••• •••• •••• 4092',
    cardExp: '08/28',
    cardCvc: '•••'
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingCost = formData.shippingMethod === 'express' ? 18.0 : subtotal >= 75 ? 0 : 8.0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = () => {
    const newOrder: OrderDetails = {
      orderId: `SK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      items: [...cartItems],
      subtotal,
      shipping: shippingCost,
      tax,
      total: grandTotal,
      shippingMethod: formData.shippingMethod,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        orderNotes
      }
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderCompleted(newOrder);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-3xl bg-[#f9f9f9] border border-[#1a1c1c]/20 shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1a1c1c]/12 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#0b0c0c]"></span>
            <h2 id="checkout-modal-title" className="text-sm font-medium tracking-widest text-[#0b0c0c] uppercase">
              {step === 'confirmed' ? 'Order Invoice & Confirmation' : 'Studio Checkout'}
            </h2>
          </div>
          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              aria-label="Cancel checkout"
              className="p-1 text-[#5e5e5e] hover:text-[#0b0c0c]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator (Only during active checkout) */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#f4f2ee] border-b border-[#1a1c1c]/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5e5e5e]">
            <div className="flex items-center gap-4">
              <span className={step === 'shipping' ? 'text-[#0b0c0c] font-semibold underline underline-offset-4' : 'text-[#747878]'}>
                01. Delivery & Address
              </span>
              <span>/</span>
              <span className={step === 'payment' ? 'text-[#0b0c0c] font-semibold underline underline-offset-4' : 'text-[#747878]'}>
                02. Payment & Review
              </span>
            </div>
            <div className="text-[11px] text-[#747878] hidden sm:block">
              Encrypted SSL Channel
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SHIPPING & ADDRESS */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b0c0c] mb-1">
                  Recipient & Studio Destination
                </h3>
                <p className="text-xs text-[#5e5e5e]">
                  Please enter the physical shipping destination for your parcel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#444748] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#444748] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#444748] mb-1">
                    Street Address / Studio Floor
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#444748] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#444748] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#c4c7c7] p-2.5 text-xs text-[#0b0c0c] focus:outline-none focus:border-[#0b0c0c]"
                  />
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-4 border-t border-[#1a1c1c]/10 space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#0b0c0c]">
                  Select Courier Speed
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setFormData((p) => ({ ...p, shippingMethod: 'standard' }))}
                    className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                      formData.shippingMethod === 'standard'
                        ? 'border-[#0b0c0c] bg-white ring-1 ring-[#0b0c0c]'
                        : 'border-[#c4c7c7] bg-[#f4f2ee]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#0b0c0c]">Archival Standard</span>
                      <span className="text-xs font-mono font-medium">
                        {subtotal >= 75 ? 'Free' : '$8.00'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5e5e5e]">
                      3–5 business days in reinforced Japanese kraft box
                    </span>
                  </label>

                  <label
                    onClick={() => setFormData((p) => ({ ...p, shippingMethod: 'express' }))}
                    className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                      formData.shippingMethod === 'express'
                        ? 'border-[#0b0c0c] bg-white ring-1 ring-[#0b0c0c]'
                        : 'border-[#c4c7c7] bg-[#f4f2ee]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#0b0c0c]">Priority Air Courier</span>
                      <span className="text-xs font-mono font-medium">$18.00</span>
                    </div>
                    <span className="text-[11px] text-[#5e5e5e]">
                      1–2 business days via dedicated courier with direct signature
                    </span>
                  </label>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT & REVIEW */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b0c0c] mb-1">
                  Payment Method & Bag Summary
                </h3>
                <p className="text-xs text-[#5e5e5e]">
                  All transactions are securely authorized in USD.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                  className={`flex-1 py-3 px-4 border text-xs text-left transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#0b0c0c] bg-white font-medium text-[#0b0c0c]'
                      : 'border-[#c4c7c7] bg-[#f4f2ee] text-[#5e5e5e]'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'bank' }))}
                  className={`flex-1 py-3 px-4 border text-xs text-left transition-colors ${
                    formData.paymentMethod === 'bank'
                      ? 'border-[#0b0c0c] bg-white font-medium text-[#0b0c0c]'
                      : 'border-[#c4c7c7] bg-[#f4f2ee] text-[#5e5e5e]'
                  }`}
                >
                  Direct Bank Wire
                </button>
              </div>

              {/* Simulated Card Form */}
              {formData.paymentMethod === 'card' && (
                <div className="bg-white border border-[#1a1c1c]/10 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5e5e5e] pb-2 border-b border-[#1a1c1c]/10">
                    <span className="font-mono">Card Details</span>
                    <Shield className="w-3.5 h-3.5 text-[#0b0c0c]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#747878] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.cardNumber}
                      className="w-full bg-[#f4f2ee] border border-[#c4c7c7] p-2 text-xs font-mono text-[#0b0c0c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#747878] mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.cardExp}
                        className="w-full bg-[#f4f2ee] border border-[#c4c7c7] p-2 text-xs font-mono text-[#0b0c0c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#747878] mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.cardCvc}
                        className="w-full bg-[#f4f2ee] border border-[#c4c7c7] p-2 text-xs font-mono text-[#0b0c0c]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Itemized Review Table */}
              <div className="border border-[#1a1c1c]/10 bg-white p-4 space-y-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#0b0c0c] block mb-2">
                  Order Breakdown ({cartItems.length} items)
                </span>
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-[#5e5e5e] py-1 border-b border-[#1a1c1c]/5">
                    <div>
                      <span className="text-[#0b0c0c] font-medium">{item.product.name}</span>
                      <span className="text-[11px] block text-[#747878]">
                        Qty: {item.quantity} {item.ruling ? `· ${item.ruling}` : ''} {item.weight ? `· ${item.weight}` : ''}
                      </span>
                    </div>
                    <span className="font-mono text-[#0b0c0c]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="pt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-[#5e5e5e]">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#0b0c0c]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#5e5e5e]">
                    <span>Shipping ({formData.shippingMethod})</span>
                    <span className="font-mono text-[#0b0c0c]">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5e5e5e]">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-mono text-[#0b0c0c]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#0b0c0c] pt-2 border-t border-[#1a1c1c]/10">
                    <span className="uppercase">Grand Total</span>
                    <span className="font-mono tabular-nums">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1a1c1c]/10">
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#5e5e5e] hover:text-[#0b0c0c] flex items-center gap-1.5 uppercase font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
                </button>

                <button
                  onClick={handleCompleteOrder}
                  className="px-6 py-3.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Authorize & Place Order (${grandTotal.toFixed(2)})</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED & INVOICE */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6">
              <div className="text-center py-4 border-b border-[#1a1c1c]/10">
                <div className="w-12 h-12 bg-[#0b0c0c] text-white mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#5e5e5e] block">
                  Order Successfully Authorized
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-[#0b0c0c] mt-1 font-mono">
                  {confirmedOrder.orderId}
                </h3>
                <p className="text-xs text-[#444748] mt-2 max-w-sm mx-auto">
                  A receipt and tracking updates have been dispatched to <strong>{confirmedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Archival Printable Receipt */}
              <div className="bg-white border border-[#1a1c1c]/15 p-6 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-start pb-3 border-b border-[#1a1c1c]/10">
                  <div>
                    <span className="font-bold text-sm tracking-wider uppercase font-sans text-[#0b0c0c]">
                      STUDIO KANJI ATELIER
                    </span>
                    <span className="block text-[11px] text-[#5e5e5e]">Archival Goods & Paper Mills</span>
                  </div>
                  <div className="text-right text-[#5e5e5e]">
                    <span>Date: {confirmedOrder.date}</span>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="py-2 border-b border-[#1a1c1c]/5 grid grid-cols-2 gap-4 text-[#444748]">
                  <div>
                    <span className="text-[#0b0c0c] font-semibold block mb-0.5">Ship To:</span>
                    <span>{confirmedOrder.customer.fullName}</span><br />
                    <span>{confirmedOrder.customer.address}</span><br />
                    <span>{confirmedOrder.customer.city}, {confirmedOrder.customer.postalCode}</span>
                  </div>
                  <div>
                    <span className="text-[#0b0c0c] font-semibold block mb-0.5">Shipping Method:</span>
                    <span>{confirmedOrder.shippingMethod === 'express' ? 'Priority Air Courier' : 'Archival Standard Ground'}</span>
                    {confirmedOrder.customer.orderNotes && (
                      <div className="mt-2 text-[10px] text-[#747878]">
                        Note: {confirmedOrder.customer.orderNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Item List */}
                <div className="space-y-1.5 py-2 border-b border-[#1a1c1c]/10">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.quantity}x {it.product.name} {it.ruling ? `(${it.ruling})` : ''}</span>
                      <span>${(it.unitPrice * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Final Cost */}
                <div className="space-y-1 text-right text-xs">
                  <div>Subtotal: ${confirmedOrder.subtotal.toFixed(2)}</div>
                  <div>Shipping: ${confirmedOrder.shipping.toFixed(2)}</div>
                  <div>Tax: ${confirmedOrder.tax.toFixed(2)}</div>
                  <div className="text-sm font-bold text-[#0b0c0c] pt-1">
                    Total Paid: ${confirmedOrder.total.toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1a1c1c]/10">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-[#c4c7c7] text-[#0b0c0c] hover:border-[#0b0c0c] transition-colors text-xs font-semibold uppercase flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
