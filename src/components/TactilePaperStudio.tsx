import React, { useState, useRef, useEffect } from 'react';
import { PaperRuling, PaperWeight } from '../types';
import { Feather, RefreshCw, Check, Sparkles, Layers, Sliders } from 'lucide-react';

interface TactilePaperStudioProps {
  onAddCustomNotebook: (ruling: PaperRuling, weight: PaperWeight) => void;
}

const INK_PALETTE = [
  { name: 'Sumi Carbon', color: '#161616', opacity: 0.95 },
  { name: 'Kyoto Indigo', color: '#1b344b', opacity: 0.92 },
  { name: 'Sepia Walnut', color: '#4d392b', opacity: 0.9 },
  { name: 'Pine Forest', color: '#253d2d', opacity: 0.9 }
];

export const TactilePaperStudio: React.FC<TactilePaperStudioProps> = ({ onAddCustomNotebook }) => {
  const [selectedRuling, setSelectedRuling] = useState<PaperRuling>('Dot Grid');
  const [selectedWeight, setSelectedWeight] = useState<PaperWeight>('120 gsm');
  const [selectedInk, setSelectedInk] = useState(INK_PALETTE[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize or clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 420;
    clearCanvas();
  }, [selectedRuling, selectedWeight]);

  // Handle ink drawing on the tactile canvas
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Line thickness influenced by paper weight and ink fluidity
    const strokeWidth = selectedWeight === '120 gsm' ? 2.2 : selectedWeight === '100 gsm' ? 2.6 : 3.1;

    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedInk.color;
    ctx.globalAlpha = selectedInk.opacity;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleApply = () => {
    onAddCustomNotebook(selectedRuling, selectedWeight);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2400);
  };

  // Specs according to weight
  const specs = {
    '80 gsm': {
      thickness: '0.088 mm',
      dryingTime: '3.8 s',
      bleedResistance: '94%',
      opacity: '88%',
      bestFor: 'Everyday ballpoint, graphite pencil & light rollerball'
    },
    '100 gsm': {
      thickness: '0.115 mm',
      dryingTime: '5.4 s',
      bleedResistance: '98.5%',
      opacity: '94%',
      bestFor: 'Fine fountain pens, gel ink & architectural markers'
    },
    '120 gsm': {
      thickness: '0.142 mm',
      dryingTime: '7.2 s',
      bleedResistance: '99.9%',
      opacity: '99%',
      bestFor: 'Broad wet fountain nibs, calligraphic washes & gouache'
    }
  }[selectedWeight];

  return (
    <section id="tactile-studio" className="w-full bg-[#f4f2ee] border-y border-[#1a1c1c]/12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1a1c1c]/12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#0b0c0c]"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5e5e5e]">
                Interactive Paper Simulator
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#0b0c0c]">
              Tactile Sheet & Paper Studio
            </h2>
            <p className="text-sm text-[#444748] mt-2 max-w-xl leading-relaxed">
              Experience the friction, tooth, and ruling geometry of our archival milling. Test ink strokes directly on the virtual test sheet below before ordering your book.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleApply}
              className={`px-5 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                addedFeedback
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#0b0c0c] text-white hover:bg-[#222222]'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" /> Added to Bag
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" /> Build Notebook with this Spec
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main 2-Column Split: Controls on Left, Tactile Sheet on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ruling & Weight Selection */}
          <div className="lg:col-span-5 space-y-8">
            {/* 1. Ruling Selector */}
            <div className="bg-white p-6 border border-[#1a1c1c]/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#1a1c1c]">
                  01. Ruling Geometry
                </span>
                <span className="text-xs text-[#5e5e5e] font-mono">{selectedRuling}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Dot Grid', 'French Ruled', 'Architect Grid', 'Plain Blank'] as PaperRuling[]).map((ruling) => (
                  <button
                    key={ruling}
                    onClick={() => setSelectedRuling(ruling)}
                    className={`py-3 px-3 text-left border text-xs transition-colors flex flex-col gap-1 ${
                      selectedRuling === ruling
                        ? 'border-[#0b0c0c] bg-[#0b0c0c] text-white'
                        : 'border-[#c4c7c7] bg-white text-[#1a1c1c] hover:border-[#1a1c1c]'
                    }`}
                  >
                    <span className="font-medium tracking-tight">{ruling}</span>
                    <span className={`text-[10px] ${selectedRuling === ruling ? 'text-[#c4c7c7]' : 'text-[#747878]'}`}>
                      {ruling === 'Dot Grid' && '5mm discrete pitch'}
                      {ruling === 'French Ruled' && 'Classic Séyès 2mm/8mm'}
                      {ruling === 'Architect Grid' && '5mm structural grid'}
                      {ruling === 'Plain Blank' && 'Uninterrupted vellum'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Paper Weight Selector */}
            <div className="bg-white p-6 border border-[#1a1c1c]/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#1a1c1c]">
                  02. Paper Grammage & Density
                </span>
                <span className="text-xs text-[#5e5e5e] font-mono">{selectedWeight}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['80 gsm', '100 gsm', '120 gsm'] as PaperWeight[]).map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-3 px-2 text-center border text-xs transition-colors flex flex-col items-center gap-1 ${
                      selectedWeight === weight
                        ? 'border-[#0b0c0c] bg-[#0b0c0c] text-white'
                        : 'border-[#c4c7c7] bg-white text-[#1a1c1c] hover:border-[#1a1c1c]'
                    }`}
                  >
                    <span className="font-semibold">{weight}</span>
                    <span className={`text-[9px] uppercase tracking-wider ${selectedWeight === weight ? 'text-[#c4c7c7]' : 'text-[#747878]'}`}>
                      {weight === '80 gsm' ? 'Feather' : weight === '100 gsm' ? 'Medium' : 'Archival'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Dynamic Laboratory Specs Card */}
              <div className="mt-5 pt-5 border-t border-[#1a1c1c]/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Caliper Thickness</span>
                  <span className="font-mono text-[#1a1c1c]">{specs.thickness}</span>
                </div>
                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Fountain Pen Bleed Resistance</span>
                  <span className="font-mono text-[#1a1c1c]">{specs.bleedResistance}</span>
                </div>
                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Opacity Rating</span>
                  <span className="font-mono text-[#1a1c1c]">{specs.opacity}</span>
                </div>
                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Estimated Ink Dry Time</span>
                  <span className="font-mono text-[#1a1c1c]">{specs.dryingTime}</span>
                </div>
                <div className="pt-2 text-[11px] text-[#5e5e5e] border-t border-[#1a1c1c]/5 italic">
                  Recommended: {specs.bestFor}
                </div>
              </div>
            </div>

            {/* 3. Ink Test Controls */}
            <div className="bg-white p-6 border border-[#1a1c1c]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#1a1c1c]">
                  03. Test Ink Fluidity
                </span>
                <button
                  onClick={clearCanvas}
                  className="text-xs text-[#5e5e5e] hover:text-[#0b0c0c] flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Clear Ink
                </button>
              </div>
              <p className="text-xs text-[#5e5e5e] mb-3">
                Select an ink pigment below, then draw or sketch across the preview sheet to test line definition and feathering:
              </p>
              <div className="flex items-center gap-3">
                {INK_PALETTE.map((ink) => (
                  <button
                    key={ink.name}
                    onClick={() => setSelectedInk(ink)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs border transition-all ${
                      selectedInk.name === ink.name
                        ? 'border-[#0b0c0c] bg-[#eeeeee] text-[#0b0c0c] font-medium'
                        : 'border-[#c4c7c7] bg-white text-[#5e5e5e] hover:border-[#1a1c1c]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 shrink-0 border border-black/20"
                      style={{ backgroundColor: ink.color }}
                    ></span>
                    <span className="text-[11px]">{ink.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Virtual Tactile Sheet Canvas */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#1a1c1c]/15 relative shadow-sm overflow-hidden">
              {/* Paper Top Corner Notch / Atelier Label */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-[#1a1c1c]/10 bg-[#fafafa]">
                <div className="flex items-center gap-3 text-xs text-[#5e5e5e]">
                  <span className="font-mono text-[#0b0c0c] font-medium uppercase tracking-wider">
                    SPEC // {selectedWeight} · {selectedRuling}
                  </span>
                  <span>·</span>
                  <span>Pure Japanese Woodfree Pulp</span>
                </div>
                <div className="text-[11px] font-mono text-[#747878] tracking-widest uppercase">
                  180° Lay-Flat
                </div>
              </div>

              {/* The Actual Paper Sheet Background with selected Pattern */}
              <div
                className={`relative w-full h-[440px] cursor-crosshair select-none transition-colors duration-200 ${
                  selectedRuling === 'Dot Grid'
                    ? 'pattern-dot-grid bg-[#fcfbfa]'
                    : selectedRuling === 'French Ruled'
                    ? 'pattern-ruled-lines bg-[#fbf9f6]'
                    : selectedRuling === 'Architect Grid'
                    ? 'pattern-architect-grid bg-[#fbfbfa]'
                    : 'bg-[#faf8f5]'
                }`}
                style={{
                  // Subtle paper grain opacity based on grammage
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
                }}
              >
                {/* Paper Margins & French Ruled Margins */}
                {selectedRuling === 'French Ruled' && (
                  <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-red-400/30 pointer-events-none"></div>
                )}

                {/* Subtle Watermark Atelier Stamp */}
                <div className="absolute bottom-6 right-6 pointer-events-none opacity-20 text-right">
                  <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#0b0c0c]">
                    Studio Kanji Paper Mills
                  </div>
                  <div className="text-[8px] font-mono text-[#5e5e5e]">
                    Kyoto Archival Grade
                  </div>
                </div>

                {/* Instructional Prompt if nothing drawn yet */}
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 border border-[#1a1c1c]/15 px-5 py-3 text-center shadow-xs">
                      <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0b0c0c]">
                        <Feather className="w-3.5 h-3.5 text-[#5e5e5e]" />
                        <span>Draw here with your cursor or touch to test ink drag</span>
                      </div>
                      <span className="text-[10px] text-[#5e5e5e] block mt-1">
                        Selected ink: {selectedInk.name} on {selectedWeight} {selectedRuling}
                      </span>
                    </div>
                  </div>
                )}

                {/* Interactive HTML5 Canvas for Inking */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  className="w-full h-full block"
                />
              </div>

              {/* Bottom Sheet Status Bar */}
              <div className="px-6 py-3 border-t border-[#1a1c1c]/10 bg-[#fafafa] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5e5e5e]">
                <div className="flex items-center gap-4">
                  <span>Fountain Pen Rating: <strong className="text-[#0b0c0c] font-medium">Archival Grade</strong></span>
                  <span>·</span>
                  <span>Fiber Alignment: <strong className="text-[#0b0c0c] font-medium">Grain Long</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCanvas}
                    className="hover:text-[#0b0c0c] transition-colors underline underline-offset-2"
                  >
                    Reset Canvas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
