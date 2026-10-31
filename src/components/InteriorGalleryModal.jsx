import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  Box,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Check,
  Compass,
} from 'lucide-react';

const ROOM_GALLERY = [
  {
    id: 'living',
    name: 'Grand Living & Dining Lounge',
    dimensions: "24'0\" x 14'6\"",
    area: '348 sq.ft',
    imageSrc: '/renders/interior-living-room.png',
    features: [
      'Italian Statuario Marble Flooring',
      "10'6\" Clear Ceiling Height with Cove Lighting",
      'Direct Access to Wide Sun Deck Balcony',
      'Acoustic Double-Glazed Soundproof Glazing',
    ],
    palette: ['#e8e2d5', '#8a7258', '#2d333b'],
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom Suite',
    dimensions: "15'6\" x 13'0\"",
    area: '202 sq.ft',
    imageSrc: '/renders/interior-bedroom.png',
    features: [
      'American Walnut Engineered Wood Flooring',
      'Walk-In Wardrobe Dressing Alcove',
      'Double Corner Picture Windows with Garden View',
      '5-Fixture Luxury Ensuite Spa Bathroom',
    ],
    palette: ['#ded9cd', '#755639', '#1d222a'],
  },
  {
    id: 'kitchen',
    name: 'Designer Modular Kitchen',
    dimensions: "12'0\" x 9'0\"",
    area: '108 sq.ft',
    imageSrc: '/renders/interior-kitchen.png',
    features: [
      'Engineered Quartz Antibacterial Countertops',
      'German Soft-Close Blum Cabinetry Hardware',
      'Dual-Bowl Franke Granite Sink & Faucet',
      'Separate Service & Utility Drying Balcony',
    ],
    palette: ['#c7cfd6', '#3b434c', '#d4af37'],
  },
  {
    id: 'balcony',
    name: 'Panoramic Sky Deck Balcony',
    dimensions: "14'0\" x 6'0\"",
    area: '84 sq.ft',
    imageSrc: '/renders/interior-balcony.png',
    features: [
      'Weatherproof Teak Plank Composite Decking',
      'Frameless Clear Laminated Glass Balustrade',
      'Bronze Architectural Handrails with LED Strip',
      'Unobstructed Central Masterplan Garden Views',
    ],
    palette: ['#784e2a', '#9ec0d4', '#242a35'],
  },
];

export default function InteriorGalleryModal({
  isOpen,
  onClose,
  apartment,
  onLaunch3DInterior,
  onViewFloorPlan,
}) {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState({});

  if (!isOpen) return null;

  const currentRoom = ROOM_GALLERY[activeRoomIndex];
  const hasImageError = !!imageErrorMap[currentRoom.id];

  const handleNext = () => {
    setActiveRoomIndex((prev) => (prev + 1) % ROOM_GALLERY.length);
  };

  const handlePrev = () => {
    setActiveRoomIndex((prev) => (prev - 1 + ROOM_GALLERY.length) % ROOM_GALLERY.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-5xl bg-[#0f1219] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#141824]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  {apartment?.displayName || '3 BHK Residence'} • Interior Gallery
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  ILLUSTRATIVE
                </span>
              </div>
              <p className="text-xs text-white/50">
                {apartment?.superBuiltUpArea || 1845} sq.ft. Super Area • {apartment?.facing || 'Garden Facing'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLaunch3DInterior}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Launch 3D Walkthrough</span>
            </button>
            <button
              onClick={onViewFloorPlan}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all border border-white/10 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>View 2D Floor Plan</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Room Navigation Tabs */}
        <div className="px-6 py-2.5 border-b border-white/10 bg-[#121520] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {ROOM_GALLERY.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setActiveRoomIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeRoomIndex === idx
                  ? 'bg-amber-500 text-charcoal-900 shadow-md font-bold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{room.name}</span>
              <span className={`text-[10px] ${activeRoomIndex === idx ? 'text-charcoal-800' : 'text-white/40'}`}>
                {room.dimensions}
              </span>
            </button>
          ))}
        </div>

        {/* Main Body Viewport */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          {/* Main Visual Display (2 Cols) */}
          <div className="lg:col-span-2 relative bg-[#090b10] flex items-center justify-center p-4 min-h-[320px]">
            {!hasImageError ? (
              <img
                src={currentRoom.imageSrc}
                alt={currentRoom.name}
                className="max-h-[500px] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                onError={() => {
                  setImageErrorMap((prev) => ({ ...prev, [currentRoom.id]: true }));
                }}
              />
            ) : (
              /* Premium Architectural Placeholder Showcase */
              <div className="w-full max-w-lg p-8 rounded-2xl bg-gradient-to-br from-[#161a26] to-[#0f1219] border border-amber-500/30 text-center shadow-2xl flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                  <Home className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{currentRoom.name}</h3>
                <p className="text-xs text-amber-300 font-semibold mt-1">
                  {currentRoom.dimensions} • {currentRoom.area}
                </p>

                <p className="text-xs text-white/60 mt-3 leading-relaxed max-w-md">
                  Architectural CGI render in preparation. You can inspect this exact room layout,
                  furniture spacing, and realistic lighting right now using the interactive 3D cutaway viewer.
                </p>

                <button
                  onClick={onLaunch3DInterior}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-charcoal-900 font-bold text-xs transition-all shadow-lg flex items-center gap-2"
                >
                  <Box className="w-4 h-4" />
                  <span>Step Inside with 3D Walkthrough</span>
                </button>
              </div>
            )}

            {/* Left / Right Carousel Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal-900/80 hover:bg-amber-500 text-white hover:text-charcoal-900 transition-all border border-white/20 flex items-center justify-center shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal-900/80 hover:bg-amber-500 text-white hover:text-charcoal-900 transition-all border border-white/20 flex items-center justify-center shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Specs & Design Palette Panel */}
          <div className="p-6 bg-[#131722] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Room Specification
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{currentRoom.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                  <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    Dimensions: <strong className="text-white">{currentRoom.dimensions}</strong>
                  </span>
                  <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    Floor Area: <strong className="text-amber-200">{currentRoom.area}</strong>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                  Architectural Highlights
                </h4>
                <ul className="space-y-2">
                  {currentRoom.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Design Material Palette
                </h4>
                <div className="flex items-center gap-2">
                  {currentRoom.palette.map((hex, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: hex }} />
                      <span className="text-[10px] font-mono text-white/60 uppercase">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onLaunch3DInterior}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Box className="w-4 h-4" />
                <span>Explore Full 3D Cutaway</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
