import React from 'react';
import { X, Sparkles, Building2, Compass, Layers, CheckCircle2 } from 'lucide-react';

export default function ArchitecturalReferenceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-5xl bg-[#0f1219] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#141824]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Architectural Masterplan Reference
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  DESIGN ELEVATION
                </span>
              </div>
              <p className="text-xs text-white/50">
                Official design elevation showing Tower A, Tower B, Tower C, central lawns, and clubhouse
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Body: High-Res Masterplan Image */}
        <div className="flex-1 bg-[#090b10] flex items-center justify-center p-4 overflow-hidden">
          <img
            src="/renders/masterplan.png"
            alt="Architectural Masterplan Reference"
            className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
          />
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-3 border-t border-white/10 bg-[#121520] flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>3 Towers (Block A, B & C)</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>15 Residential Floors (135 Total 3 BHK Units)</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold text-xs transition-all shadow-md"
          >
            Close Reference
          </button>
        </footer>
      </div>
    </div>
  );
}
