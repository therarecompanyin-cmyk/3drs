import React, { useState, useMemo } from 'react';
import {
  Building2,
  Layers,
  Compass,
  Eye,
  Maximize2,
  Sparkles,
  Info,
  Trees,
  CheckCircle2,
  Box,
  ChevronRight,
  Shield,
  Palette,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BUILDINGS_DATA } from '../data/buildings';

// Masterplan Hotspot Definitions calibrated to public/renders/masterplan.png (1024 x 686)
const TOWER_HOTSPOTS = [
  {
    id: 'block-a',
    code: 'A',
    name: 'Block A',
    subtitle: 'West Garden Tower',
    floors: 15,
    apartments: 45,
    bounds: {
      left: 3.8,
      top: 15.2,
      width: 29.0,
      height: 76.8,
    },
    badgePin: {
      left: 18.3,
      top: 12.8,
    },
    features: ['15 Residential Floors', '3 BHK Luxury Suites', 'Unobstructed West Sunset Views', 'Direct Garden Access'],
  },
  {
    id: 'block-b',
    code: 'B',
    name: 'Block B',
    subtitle: 'Central Royal Tower',
    floors: 15,
    apartments: 45,
    bounds: {
      left: 34.2,
      top: 21.0,
      width: 27.4,
      height: 66.0,
    },
    badgePin: {
      left: 47.9,
      top: 18.6,
    },
    features: ['15 Residential Floors', '3 BHK Grand Royal Units', 'Overlooks Central Grand Lawn', 'Prime Masterplan Center'],
  },
  {
    id: 'block-c',
    code: 'C',
    name: 'Block C',
    subtitle: 'East Horizon Tower',
    floors: 15,
    apartments: 45,
    bounds: {
      left: 66.0,
      top: 15.2,
      width: 28.8,
      height: 76.8,
    },
    badgePin: {
      left: 80.4,
      top: 12.8,
    },
    features: ['15 Residential Floors', '3 BHK Elite Residences', 'Overlooks Pool & Sports Court', 'Morning Sun Orientation'],
  },
];

const AMENITY_HOTSPOTS = [
  {
    id: 'clubhouse',
    name: 'Clubhouse & Pool',
    category: 'Leisure',
    pos: { left: 81.8, top: 63.5 },
  },
  {
    id: 'sports',
    name: 'Tennis & Sports Court',
    category: 'Fitness',
    pos: { left: 75.4, top: 74.5 },
  },
  {
    id: 'playarea',
    name: "Children's Play Park",
    category: 'Family',
    pos: { left: 50.2, top: 69.5 },
  },
  {
    id: 'garden',
    name: 'Central Landscaped Lawn',
    category: 'Nature',
    pos: { left: 56.0, top: 66.0 },
  },
  {
    id: 'entrance',
    name: 'Grand Entrance & Security',
    category: 'Security',
    pos: { left: 32.5, top: 75.0 },
  },
];

export default function PhotorealisticViewport({
  selectedBuildingId,
  selectedFloorNumber,
  selectedApartmentId,
  onSelectBuilding,
  onSelectFloor,
  onSelectApartment,
  onResetToMasterplan,
  onViewFloorPlan,
  onSwitchTo3D,
}) {
  // Current architectural render view: 'masterplan' | 'aerial' | 'tower' | 'elevation'
  const [activeView, setActiveView] = useState('masterplan');
  const [hoveredTowerId, setHoveredTowerId] = useState(null);
  const [hoveredAmenityId, setHoveredAmenityId] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showAmenities, setShowAmenities] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Compute active image source based on view selection and tower
  const currentRenderSrc = useMemo(() => {
    if (activeView === 'aerial') {
      return '/renders/aerial-masterplan.png';
    }
    if (activeView === 'elevation') {
      return '/renders/floor-detail.png';
    }
    if (activeView === 'tower' && selectedBuildingId === 'block-a') {
      return '/renders/block-a.png';
    }
    if (activeView === 'tower' && selectedBuildingId === 'block-c') {
      return '/renders/block-c.png';
    }
    // Default to main photorealistic masterplan
    return '/renders/masterplan.png';
  }, [activeView, selectedBuildingId]);

  const selectedTowerData = TOWER_HOTSPOTS.find((t) => t.id === selectedBuildingId);
  const hoveredTowerData = TOWER_HOTSPOTS.find((t) => t.id === hoveredTowerId);

  const isElevation = activeView === 'elevation';

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#07090e] select-none overflow-hidden">
      {/* Background Ambience Subtle Vignette & Grid */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07090e]/60 to-[#07090e] pointer-events-none z-10" />

      {/* Primary Architectural Image Stage (Preserves Exact Aspect Ratio 1024:686) */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 pb-20">
        <div
          className={`relative max-w-full max-h-full transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${
            isElevation ? 'aspect-[686/1024]' : 'aspect-[1024/686]'
          }`}
          style={{
            width: isElevation
              ? 'min(100%, calc((100vh - 120px) * (686 / 1024)))'
              : 'min(100%, calc((100vh - 120px) * (1024 / 686)))',
          }}
        >
          {/* Main Photorealistic Image */}
          <img
            src={currentRenderSrc}
            alt="Photorealistic Architectural Masterplan"
            className="w-full h-full object-cover block transition-opacity duration-300"
            onError={() => setImageError(true)}
          />

          {/* Fallback state if image is missing */}
          {imageError && (
            <div className="absolute inset-0 bg-[#121620] flex flex-col items-center justify-center text-center p-6 text-white z-20">
              <Building2 className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
              <h3 className="text-base font-bold text-amber-200">Architectural Render Loading</h3>
              <p className="text-xs text-white/60 mt-1 max-w-sm">
                Defaulting to masterplan view.
              </p>
            </div>
          )}

          {/* Hotspots Overlay (Only visible on Masterplan view where coordinates correspond to buildings) */}
          {activeView === 'masterplan' && showHotspots && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* 3 Residential Towers Interactive Hotspots */}
              {TOWER_HOTSPOTS.map((tower) => {
                const isSelected = selectedBuildingId === tower.id;
                const isHovered = hoveredTowerId === tower.id;

                return (
                  <React.Fragment key={tower.id}>
                    {/* Clickable Tower Outline Box */}
                    <div
                      style={{
                        left: `${tower.bounds.left}%`,
                        top: `${tower.bounds.top}%`,
                        width: `${tower.bounds.width}%`,
                        height: `${tower.bounds.height}%`,
                      }}
                      onClick={() => onSelectBuilding(tower.id)}
                      onMouseEnter={() => setHoveredTowerId(tower.id)}
                      onMouseLeave={() => setHoveredTowerId(null)}
                      className={`absolute pointer-events-auto cursor-pointer rounded-xl transition-all duration-300 ${
                        isSelected
                          ? 'border-2 border-amber-400 bg-amber-500/15 shadow-[0_0_30px_rgba(251,191,36,0.3)] ring-1 ring-amber-300/40'
                          : isHovered
                          ? 'border-2 border-amber-400/80 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                          : 'border border-white/20 hover:border-amber-400/50 hover:bg-white/5'
                      }`}
                    >
                      {/* Corner Bracket Accents (Architectural drafting style) */}
                      <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400" />
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400" />
                      <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400" />
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400" />

                      {/* Floor Indicator Ribbons on Hover/Selection */}
                      {(isSelected || isHovered) && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-charcoal-900/95 border border-amber-400/70 text-amber-200 text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-xl whitespace-nowrap backdrop-blur-md">
                          <Layers className="w-3.5 h-3.5 text-amber-400" />
                          <span>15 Residential Floors</span>
                          <span className="text-white/40">•</span>
                          <span>45 Apts</span>
                        </div>
                      )}
                    </div>

                    {/* Floating Tower Header Badge (Pinned to Tower Crown) */}
                    <div
                      style={{
                        left: `${tower.badgePin.left}%`,
                        top: `${tower.badgePin.top}%`,
                        transform: 'translate(-50%, -100%)',
                      }}
                      onClick={() => onSelectBuilding(tower.id)}
                      onMouseEnter={() => setHoveredTowerId(tower.id)}
                      onMouseLeave={() => setHoveredTowerId(null)}
                      className={`absolute pointer-events-auto cursor-pointer z-30 transition-all duration-300 ${
                        isSelected
                          ? 'scale-110 -translate-y-1'
                          : isHovered
                          ? 'scale-105 -translate-y-0.5'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div
                        className={`px-3 py-1.5 rounded-full flex items-center gap-2 border shadow-xl backdrop-blur-md transition-all ${
                          isSelected
                            ? 'bg-amber-950/95 border-amber-400 text-amber-100 shadow-amber-500/30'
                            : isHovered
                            ? 'bg-charcoal-900/95 border-amber-400/70 text-white'
                            : 'bg-charcoal-900/85 border-white/20 text-white/90 hover:border-amber-400/50'
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isSelected ? 'bg-amber-400 animate-ping' : 'bg-amber-400'
                          }`}
                        />
                        <span className="font-bold text-xs tracking-wider uppercase">
                          {tower.name}
                        </span>
                        <span className="text-[10px] text-amber-300/80 border-l border-white/20 pl-2">
                          15 Flrs
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Amenity Hotspot Markers */}
              {showAmenities &&
                AMENITY_HOTSPOTS.map((amenity) => {
                  const isHovered = hoveredAmenityId === amenity.id;
                  return (
                    <div
                      key={amenity.id}
                      style={{
                        left: `${amenity.pos.left}%`,
                        top: `${amenity.pos.top}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setHoveredAmenityId(amenity.id)}
                      onMouseLeave={() => setHoveredAmenityId(null)}
                      className="absolute pointer-events-auto cursor-pointer group z-20"
                    >
                      <div className="w-6 h-6 rounded-full bg-charcoal-900/90 border border-emerald-400/80 flex items-center justify-center text-emerald-300 shadow-lg group-hover:scale-125 transition-transform">
                        <Trees className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-charcoal-900/95 border border-emerald-400/60 text-white text-[10px] font-medium whitespace-nowrap shadow-xl backdrop-blur-md">
                          <p className="font-bold text-emerald-300">{amenity.name}</p>
                          <p className="text-[9px] text-white/50">{amenity.category}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Tower Quick Info Bar (When a building is clicked) */}
      {selectedTowerData && (
        <div className="absolute top-20 left-6 z-30 pointer-events-auto">
          <div className="glass-panel p-4 rounded-2xl border border-amber-400/40 shadow-2xl max-w-xs animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="font-bold text-base text-white tracking-wide">
                  {selectedTowerData.name}
                </h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-500/30">
                15 Floors
              </span>
            </div>

            <p className="text-xs text-white/70 mt-1">{selectedTowerData.subtitle}</p>

            <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="text-white/50">Total Residences:</span>
                <span className="font-semibold text-amber-200">45 Luxury 3 BHK</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="text-white/50">Units per Floor:</span>
                <span className="font-semibold text-white">3 Independent Units</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="text-white/50">Status:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready for Possession
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedBuildingId === 'block-a') setActiveView('tower');
                  else if (selectedBuildingId === 'block-c') setActiveView('tower');
                  else setActiveView('elevation');
                }}
                className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => onSelectFloor(1)}
                className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>Floors</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom View Modes Toolbar */}
      <div className="absolute bottom-4 z-30 pointer-events-auto flex items-center gap-2 glass-panel p-2 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => {
            setActiveView('masterplan');
            onResetToMasterplan();
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeView === 'masterplan' && !selectedBuildingId
              ? 'bg-amber-500 text-charcoal-900 shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Full Masterplan</span>
        </button>

        <button
          onClick={() => setActiveView('aerial')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'aerial'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Aerial View</span>
        </button>

        <button
          onClick={() => {
            setActiveView('tower');
            if (!selectedBuildingId) onSelectBuilding('block-a');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'tower'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Tower Perspectives</span>
        </button>

        <button
          onClick={() => setActiveView('elevation')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'elevation'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Facade Elevation</span>
        </button>

        <div className="h-5 w-px bg-white/20 mx-1" />

        {/* Seamless Switch to Interactive 3D Model View */}
        <button
          onClick={onSwitchTo3D}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/40 transition-all shadow-md group"
          title="Switch to Interactive 3D Orbit Scene"
        >
          <Box className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Structural 3D Preview</span>
        </button>
      </div>
    </div>
  );
}
