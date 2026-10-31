import React, { useState } from 'react';
import { ArrowLeft, LayoutTemplate, Compass, Maximize2, Sparkles, Check, Info } from 'lucide-react';
import InteriorScene from '../three/InteriorScene';

export default function InteriorViewer({
  selectedApartment,
  onBackToBuilding,
  onBackToFloorPlan,
}) {
  const [roomFocus, setRoomFocus] = useState('all');

  const rooms = [
    { id: 'all', label: 'Entire 3 BHK' },
    { id: 'living', label: 'Living Room' },
    { id: 'dining', label: 'Dining Area' },
    { id: 'kitchen', label: 'Modular Kitchen' },
    { id: 'masterBed', label: 'Master Suite' },
    { id: 'bed2', label: 'Bedroom 2 / Study' },
    { id: 'balcony', label: 'Balcony Deck' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0e1017] text-[#f5f2eb] flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-white/10 bg-[#141720]/90 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToBuilding}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-white/10 transition-all text-xs font-medium text-amber-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Building
          </button>
          <div>
            <h1 className="text-base font-semibold tracking-wide flex items-center gap-2 text-white">
              <span>{selectedApartment?.displayName || '3 BHK Residence'}</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">3D Interactive Cutaway Interior</span>
            </h1>
            <p className="text-[11px] text-white/50">
              {selectedApartment?.superBuiltUpArea || 1845} sq.ft. Super Area • {selectedApartment?.facing || 'Garden Facing'}
            </p>
          </div>
        </div>

        {/* Room Switcher Pills */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoomFocus(room.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                roomFocus === room.id
                  ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>

        {/* Switch to 2D Plan */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToFloorPlan}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 text-xs font-medium transition-all"
          >
            <LayoutTemplate className="w-4 h-4 text-amber-400" />
            View 2D Floor Plan
          </button>
        </div>
      </header>

      {/* 3D Interior Viewport */}
      <div className="flex-1 relative">
        <InteriorScene roomFocus={roomFocus} apartmentData={selectedApartment} />

        {/* Floating Mobile Room Switcher */}
        <div className="md:hidden absolute top-4 left-4 right-4 z-20 flex gap-1.5 overflow-x-auto pb-1">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoomFocus(room.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                roomFocus === room.id
                  ? 'bg-amber-500 text-charcoal-900 font-semibold'
                  : 'bg-[#181c26]/90 text-white/70 border border-white/10'
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>

        {/* Interior Feature Overlay Card */}
        <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 rounded-2xl max-w-sm border border-white/10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interior Specifications
          </div>
          <ul className="space-y-1.5 text-xs text-white/80">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Engineered hardwood flooring in master suite</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Full-height soundproof German sliding patio doors</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Modular German kitchen with soft-close hardware</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Premium Kohler / Grohe sanitary fittings</span>
            </li>
          </ul>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
            <span>Illustrative 3D cutaway preview</span>
            <span className="text-amber-300">Drag to rotate • Scroll to zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
