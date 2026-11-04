import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#f4f2ee] border-t border-[#1a1c1c]/15 text-[#1a1c1c]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Manifesto Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#0b0c0c] block">
              STUDIO KANJI
            </span>
            <p className="text-xs text-[#444748] leading-relaxed max-w-sm">
              An independent stationery atelier focused on the tactile friction of writing. We engineer acid-free Japanese journals, solid machined brass tools, and architectural desk monoliths designed for decades of daily thought.
            </p>
            <div className="pt-2 text-[11px] text-[#5e5e5e] font-mono">
              <span>Kyoto Workshop</span> · <span>Zurich Archive</span>
            </div>
          </div>

          {/* Archival Care Guide & Guidelines (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0b0c0c] block">
              Archival Standards & Care
            </span>
            <ul className="text-xs text-[#5e5e5e] space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#0b0c0c]">01.</span>
                <span><strong>Paper Preservation:</strong> Store journals away from direct southern UV light to prevent organic linen fiber bleaching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#0b0c0c]">02.</span>
                <span><strong>Brass Patina:</strong> Raw C3604 brass darkens naturally with skin contact. Buff lightly with dry cotton cloth to restore shine.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#0b0c0c]">03.</span>
                <span><strong>Fountain Inks:</strong> Our 120 gsm spring-washed paper is optimized for high-surface-tension dye and pigment inks.</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0b0c0c] block">
              Small-Batch Gazettes
            </span>
            <p className="text-xs text-[#5e5e5e] leading-normal">
              Notified strictly upon seasonal paper mill runs and new brass milling releases. Zero promotional noise.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#c4c7c7] px-3 py-2 text-xs text-[#0b0c0c] placeholder-[#747878] focus:outline-none focus:border-[#0b0c0c]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-[#0b0c0c] text-white hover:bg-[#222222] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="mt-16 pt-8 border-t border-[#1a1c1c]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#747878]">
          <div className="flex items-center gap-4">
            <span>© 2026 Studio Kanji Atelier. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>100% Recyclable Packaging</span>
            <span>·</span>
            <span>Worldwide Carbon-Offset Transit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
