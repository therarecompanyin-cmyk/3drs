import React from 'react';
import {
  Building,
  Layers,
  Home,
  Trees,
  Maximize2,
  Minimize2,
  Sun,
  Sunset,
  Moon,
  Compass,
} from 'lucide-react';

export default function Navbar({
  selectedBuildingId,
  selectedFloorNumber,
  timeOfDay,
  setTimeOfDay,
  onNavigateMasterplan,
  onOpenFloors,
  onOpenApartments,
  onOpenAmenities,
  onOpenReference,
  isFullscreen,
  onToggleFullscreen,
}) {
  return (
    <nav className="absolute top-4 left-4 right-4 z-30 pointer-events-none flex items-center justify-between">
      {/* Brand Logo & Project Identity */}
      <div
        onClick={onNavigateMasterplan}
        className="pointer-events-auto cursor-pointer glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 transition-transform hover:scale-[1.02] shadow-elevated"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shadow-md">
          <Building className="w-5 h-5 text-charcoal-900" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-widest uppercase text-white font-sans">
              3D RESIDENCES
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-500/30">
              LUXURY
            </span>
          </div>
          <p className="text-[10px] text-white/50 tracking-wider">
            Interactive 3D Architectural Experience
          </p>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="hidden lg:flex pointer-events-auto glass-panel p-1.5 rounded-2xl items-center gap-1 shadow-elevated border border-white/10">
        <button
          onClick={onNavigateMasterplan}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
            !selectedBuildingId
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass className="w-4 h-4" />
          Masterplan
        </button>

        <button
          onClick={onOpenFloors}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
            selectedBuildingId && selectedFloorNumber
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          Explore Floors
        </button>

        <button
          onClick={onOpenApartments}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home className="w-4 h-4" />
          Apartments
        </button>

        <button
          onClick={onOpenAmenities}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
        >
          <Trees className="w-4 h-4" />
          Amenities
        </button>
      </div>

      {/* Right Controls (Reference, Lighting modes & Fullscreen) */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Architectural Reference Button (View supplied photo reference) */}
        <button
          onClick={onOpenReference}
          className="glass-panel px-3.5 py-2 rounded-xl text-xs font-medium text-amber-200 hover:text-white hover:border-amber-400/50 transition-all border border-white/10 shadow-elevated flex items-center gap-1.5"
          title="View Architectural Masterplan Render Reference"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Design Reference</span>
        </button>

        {/* Time of Day Lighting Toggle */}
        <div className="glass-panel p-1 rounded-xl flex items-center gap-1 border border-white/10 shadow-elevated">
          <button
            onClick={() => setTimeOfDay('day')}
            className={`p-2 rounded-lg transition-all ${
              timeOfDay === 'day'
                ? 'bg-amber-500 text-charcoal-900 shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title="Daytime Lighting"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('sunset')}
            className={`p-2 rounded-lg transition-all ${
              timeOfDay === 'sunset'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title="Golden Hour Sunset"
          >
            <Sunset className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`p-2 rounded-lg transition-all ${
              timeOfDay === 'night'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title="Atmospheric Night Illumination"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          className="glass-panel p-2.5 rounded-xl text-white/80 hover:text-white hover:border-amber-400/50 transition-all border border-white/10 shadow-elevated"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
}
