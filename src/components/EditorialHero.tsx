import React from 'react';
import { ArrowDown, Compass, Feather } from 'lucide-react';

interface EditorialHeroProps {
  onExploreCatalog: () => void;
  onOpenTactileStudio: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onExploreCatalog,
  onOpenTactileStudio
}) => {
  return (
    <section className="w-full border-b border-[#1a1c1c]/12 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column: 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0b0c0c]"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5e5e5e]">
                Edition 04 · Japanese & European Atelier
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.15] text-[#0b0c0c] text-balance">
              Objects of tactile intention, weight, and quiet everyday focus.
            </h1>

            <p className="text-base sm:text-lg text-[#444748] max-w-xl font-normal leading-relaxed">
              We curate and craft physical stationery for architects, essayists, and designers. Uncoated raw brass, smyth-sewn Belgian linen, and 120 gsm spring-washed paper engineered for frictionless fountain ink flow.
            </p>

            {/* Sharp-cornered action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <span>Browse Curated Catalog</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenTactileStudio}
                className="px-6 py-3.5 border border-[#1a1c1c]/25 bg-white text-[#0b0c0c] hover:border-[#0b0c0c] hover:bg-[#f4f2ee] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <Feather className="w-3.5 h-3.5 text-[#5e5e5e]" />
                <span>Simulate Paper & Ink</span>
              </button>
            </div>

            {/* Three Quiet Trust Markers (Clean unboxed text, no pills) */}
            <div className="pt-8 border-t border-[#1a1c1c]/10 grid grid-cols-3 gap-6 text-xs text-[#5e5e5e]">
              <div>
                <span className="block font-medium text-[#0b0c0c] mb-0.5 font-mono">100% Acid-Free</span>
                <span>Archival Kyoto paper</span>
              </div>
              <div>
                <span className="block font-medium text-[#0b0c0c] mb-0.5 font-mono">Solid Metals</span>
                <span>Zero plastic components</span>
              </div>
              <div>
                <span className="block font-medium text-[#0b0c0c] mb-0.5 font-mono">180° Lay-Flat</span>
                <span>Thread-bound spines</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: 5 columns — Editorial Showcase Frame */}
          <div className="lg:col-span-5">
            <div className="relative border border-[#1a1c1c]/15 bg-[#f4f2ee] p-4 sm:p-6">
              {/* Image Frame with Sharp 0px corners */}
              <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden relative border border-[#1a1c1c]/10 bg-[#e8e8e8]">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Atelier Linen Hardcover Journal and Brass Pen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c4c7c7] block">
                    Featured Craft
                  </span>
                  <span className="text-sm font-medium">
                    Atelier No. 01 Linen Journal & C3604 Brass Rollerball
                  </span>
                </div>
              </div>

              {/* Tonal Caption Below Frame */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#5e5e5e]">
                <span className="font-mono">Plate 04 // Natural Unbleached Fiber</span>
                <span className="uppercase tracking-wider text-[10px] text-[#0b0c0c] font-medium">
                  Edition of 250
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
