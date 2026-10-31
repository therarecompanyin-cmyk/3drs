import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Box, ArrowLeft, Layers, Eye, CheckCircle2 } from 'lucide-react';

export default function FloorPlan2D({
  selectedBuilding,
  selectedFloorNumber,
  selectedApartment,
  onSelectApartment,
  onOpenInterior,
  onBackTo3D,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showFurniture, setShowFurniture] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);

  // Active unit index (1, 2, or 3)
  const activeUnitIndex = selectedApartment?.unitIndex || 2;
  const towerCode = selectedBuilding?.code || 'A';
  const floorNum = selectedFloorNumber || 5;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0f14] text-[#f5f2eb] flex flex-col overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-16 px-6 border-b border-white/10 bg-[#13161c]/90 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackTo3D}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-white/10 transition-all text-xs font-medium text-amber-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to 3D View
          </button>
          <div>
            <h1 className="text-base font-semibold tracking-wide flex items-center gap-2 text-white">
              <span>{selectedBuilding?.name || 'Block A'}</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">Floor {floorNum} Typical Plan</span>
            </h1>
            <p className="text-[11px] text-white/50">
              3 Independent 3 BHK Luxury Residences per floor arranged around central lift core
            </p>
          </div>
        </div>

        {/* Unit Selector Tabs */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {[1, 2, 3].map((uIdx) => {
            const aptNum = `${towerCode}-${floorNum * 100 + uIdx}`;
            const isSelected = activeUnitIndex === uIdx;
            return (
              <button
                key={uIdx}
                onClick={() => onSelectApartment(aptNum)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Unit {aptNum}</span>
                <span className="text-[10px] opacity-75">
                  ({uIdx === 1 ? '1,845' : uIdx === 2 ? '1,980' : '1,875'} sq.ft)
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenInterior}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-charcoal-900 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20"
          >
            <Box className="w-4 h-4" />
            Explore 3D Interior
          </button>
        </div>
      </header>

      {/* Main Floor Plan Canvas Area */}
      <div
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing bg-[#0a0c10]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Floating Controls HUD */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 bg-[#13161e]/90 p-2 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.4))}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-px bg-white/10 my-1" />
          <button
            onClick={() => setShowFurniture(!showFurniture)}
            className={`p-2 rounded-lg text-xs flex items-center justify-center transition-all ${
              showFurniture ? 'bg-amber-500/20 text-amber-300' : 'text-white/40 hover:bg-white/10'
            }`}
            title="Toggle Furniture"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`p-2 rounded-lg text-xs flex items-center justify-center transition-all ${
              showDimensions ? 'bg-amber-500/20 text-amber-300' : 'text-white/40 hover:bg-white/10'
            }`}
            title="Toggle Dimensions"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Legend / Info Badge */}
        <div className="absolute bottom-4 left-4 z-20 bg-[#13161e]/90 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md text-xs shadow-xl max-w-sm">
          <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1">
            Typical 3 BHK Residential Floor Layout
          </div>
          <div className="text-white/70 leading-relaxed text-[11px]">
            Click any apartment unit below to inspect its boundaries, room dimensions, and interior configuration.
          </div>
          <div className="mt-2 text-[10px] text-white/40 italic">
            *Illustrative architectural concept layout. Dimensions shown are approximate.
          </div>
        </div>

        {/* SVG Floor Plan */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
        >
          <svg
            viewBox="0 0 1400 950"
            className="w-[1280px] h-[860px] drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.8))' }}
          >
            <defs>
              {/* Pattern for floor tiles */}
              <pattern id="tilePattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.06" />
              </pattern>
              <pattern id="balconyTile" width="16" height="32" patternUnits="userSpaceOnUse">
                <rect width="16" height="32" fill="#2d2217" />
                <path d="M 0 0 L 16 0 M 0 16 L 16 16" stroke="#4a3725" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background Floor Plate */}
            <rect x="50" y="40" width="1300" height="870" rx="16" fill="#13161f" stroke="#2a303e" strokeWidth="3" />

            {/* =========================================================
                CENTRAL SERVICE CORE (Lobby, 2 Elevators, Fire Staircase)
            ========================================================== */}
            <g id="central-core">
              {/* Core Perimeter */}
              <rect x="520" y="240" width="360" height="420" fill="#1a1e28" stroke="#3d4454" strokeWidth="2.5" />

              {/* Central Lift Lobby Corridor */}
              <rect x="550" y="380" width="300" height="150" fill="url(#tilePattern)" stroke="#333a4a" strokeWidth="1" />
              <text x="700" y="460" textAnchor="middle" fill="#c59b6d" fontSize="15" fontWeight="600" letterSpacing="2">
                CENTRAL LIFT LOBBY
              </text>
              <text x="700" y="480" textAnchor="middle" fill="#8892b0" fontSize="11">
                W: 8'0" Wide Common Foyer
              </text>

              {/* Lift 1 (Passenger Elevator) */}
              <g transform="translate(560, 260)">
                <rect width="110" height="100" fill="#232836" stroke="#4a5568" strokeWidth="2" />
                <line x1="0" y1="0" x2="110" y2="100" stroke="#4a5568" strokeWidth="1" strokeDasharray="4" />
                <line x1="110" y1="0" x2="0" y2="100" stroke="#4a5568" strokeWidth="1" strokeDasharray="4" />
                <text x="55" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">LIFT 1</text>
                <text x="55" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">8 Passengers</text>
              </g>

              {/* Lift 2 (Service / Stretcher Elevator) */}
              <g transform="translate(730, 260)">
                <rect width="120" height="100" fill="#232836" stroke="#4a5568" strokeWidth="2" />
                <line x1="0" y1="0" x2="120" y2="100" stroke="#4a5568" strokeWidth="1" strokeDasharray="4" />
                <line x1="120" y1="0" x2="0" y2="100" stroke="#4a5568" strokeWidth="1" strokeDasharray="4" />
                <text x="60" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">LIFT 2</text>
                <text x="60" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">Service / Stretcher</text>
              </g>

              {/* Fire Escape Staircase */}
              <g transform="translate(560, 545)">
                <rect width="280" height="95" fill="#1c202a" stroke="#4a5568" strokeWidth="1.5" />
                {Array.from({ length: 12 }, (_, i) => 580 + i * 20).map((xVal) => (
                  <line key={xVal} x1={xVal} y1="545" x2={xVal} y2="640" stroke="#333d4e" strokeWidth="1" />
                ))}
                <line x1="560" y1="592" x2="840" y2="592" stroke="#e0a96d" strokeWidth="1.5" />
                <text x="700" y="585" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="500">
                  FIRE ESCAPE STAIRS
                </text>
              </g>
            </g>

            {/* =========================================================
                UNIT 1 (LEFT WING) — 3 BHK LUXURY (1,845 SQ.FT.)
            ========================================================== */}
            <g
              id="unit-1"
              className="cursor-pointer transition-opacity"
              onClick={() => onSelectApartment(`${towerCode}-${floorNum * 100 + 1}`)}
              opacity={activeUnitIndex === 1 ? 1 : 0.65}
            >
              {/* Unit boundary fill with highlight if selected */}
              <rect
                x="70"
                y="60"
                width="440"
                height="830"
                rx="8"
                fill={activeUnitIndex === 1 ? '#18202d' : '#141720'}
                stroke={activeUnitIndex === 1 ? '#c59b6d' : '#2d3342'}
                strokeWidth={activeUnitIndex === 1 ? 3 : 1.5}
              />

              {/* Unit Header Badge */}
              <g transform="translate(90, 85)">
                <rect width="210" height="42" rx="6" fill="#1e2532" stroke="#c59b6d" strokeWidth="1.5" />
                <text x="105" y="24" textAnchor="middle" fill="#c59b6d" fontSize="13" fontWeight="bold">
                  APT {towerCode}-{floorNum * 100 + 1} • 3 BHK LUXE
                </text>
                <text x="105" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Super Area: 1,845 SQ.FT.
                </text>
              </g>

              {/* Living & Dining Room */}
              <g transform="translate(90, 145)">
                <rect width="260" height="240" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="130" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
                  LIVING & DINING
                </text>
                {showDimensions && (
                  <text x="130" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    23'6" × 14'0"
                  </text>
                )}
                {/* Furniture illustration */}
                {showFurniture && (
                  <g opacity="0.8">
                    {/* Sofa */}
                    <rect x="25" y="70" width="130" height="35" rx="4" fill="#3b4252" />
                    <rect x="25" y="105" width="40" height="60" rx="4" fill="#3b4252" />
                    {/* Coffee Table */}
                    <rect x="80" y="115" width="60" height="35" rx="3" fill="#5c4033" />
                    {/* Dining Table */}
                    <rect x="180" y="100" width="65" height="100" rx="4" fill="#5c4033" />
                  </g>
                )}
              </g>

              {/* Living Balcony */}
              <g transform="translate(90, 395)">
                <rect width="260" height="80" fill="url(#balconyTile)" stroke="#333a4a" strokeWidth="1.2" />
                <text x="130" y="42" textAnchor="middle" fill="#f5f2eb" fontSize="12" fontWeight="500">
                  DECK BALCONY
                </text>
                {showDimensions && (
                  <text x="130" y="58" textAnchor="middle" fill="#c2b196" fontSize="10">
                    14'0" × 5'6" • Garden Vistas
                  </text>
                )}
              </g>

              {/* Modular Kitchen & Utility */}
              <g transform="translate(360, 145)">
                <rect width="130" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="65" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  KITCHEN
                </text>
                {showDimensions && (
                  <text x="65" y="44" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    10'0" × 9'0"
                  </text>
                )}
                {/* L-Countertop */}
                {showFurniture && (
                  <g opacity="0.75">
                    <rect x="10" y="55" width="110" height="24" fill="#2d3748" />
                    <rect x="96" y="79" width="24" height="65" fill="#2d3748" />
                  </g>
                )}
              </g>

              {/* Master Bedroom (Bed 1) */}
              <g transform="translate(90, 485)">
                <rect width="240" height="220" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="120" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
                  MASTER BEDROOM
                </text>
                {showDimensions && (
                  <text x="120" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    14'6" × 13'0"
                  </text>
                )}
                {showFurniture && (
                  <g opacity="0.8">
                    {/* King Bed */}
                    <rect x="50" y="70" width="110" height="120" rx="4" fill="#4a5568" />
                    <rect x="50" y="70" width="110" height="40" rx="2" fill="#e2e8f0" />
                    {/* Wardrobe */}
                    <rect x="180" y="70" width="45" height="120" fill="#5c4033" />
                  </g>
                )}
              </g>

              {/* Master Bathroom */}
              <g transform="translate(340, 485)">
                <rect width="150" height="100" fill="#161b24" stroke="#333a4a" strokeWidth="1" />
                <text x="75" y="32" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="500">
                  MASTER BATH
                </text>
                {showDimensions && (
                  <text x="75" y="48" textAnchor="middle" fill="#94a3b8" fontSize="9">
                    8'6" × 5'6"
                  </text>
                )}
              </g>

              {/* Bedroom 2 */}
              <g transform="translate(90, 715)">
                <rect width="210" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="105" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  BEDROOM 2
                </text>
                {showDimensions && (
                  <text x="105" y="42" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    12'0" × 11'0"
                  </text>
                )}
              </g>

              {/* Bedroom 3 */}
              <g transform="translate(310, 715)">
                <rect width="180" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="90" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  BEDROOM 3
                </text>
                {showDimensions && (
                  <text x="90" y="42" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    11'0" × 11'0"
                  </text>
                )}
              </g>
            </g>

            {/* =========================================================
                UNIT 2 (CENTER WING) — 3 BHK GRAND ROYAL (1,980 SQ.FT.)
            ========================================================== */}
            <g
              id="unit-2"
              className="cursor-pointer transition-opacity"
              onClick={() => onSelectApartment(`${towerCode}-${floorNum * 100 + 2}`)}
              opacity={activeUnitIndex === 2 ? 1 : 0.65}
            >
              {/* Unit boundary fill */}
              <rect
                x="520"
                y="60"
                width="360"
                height="830"
                rx="8"
                fill={activeUnitIndex === 2 ? '#18202d' : '#141720'}
                stroke={activeUnitIndex === 2 ? '#c59b6d' : '#2d3342'}
                strokeWidth={activeUnitIndex === 2 ? 3 : 1.5}
              />

              {/* Unit Header Badge */}
              <g transform="translate(595, 85)">
                <rect width="210" height="42" rx="6" fill="#1e2532" stroke="#c59b6d" strokeWidth="1.5" />
                <text x="105" y="24" textAnchor="middle" fill="#c59b6d" fontSize="13" fontWeight="bold">
                  APT {towerCode}-{floorNum * 100 + 2} • GRAND ROYAL
                </text>
                <text x="105" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Super Area: 1,980 SQ.FT.
                </text>
              </g>

              {/* Grand Living Salon (Front facing park) */}
              <g transform="translate(540, 675)">
                <rect width="320" height="130" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="160" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
                  EXPANSIVE LIVING SALON
                </text>
                {showDimensions && (
                  <text x="160" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    25'0" × 15'6" • Park Frontage
                  </text>
                )}
                {/* Park Facing Balcony */}
                <rect x="0" y="80" width="320" height="50" fill="url(#balconyTile)" stroke="#333a4a" strokeWidth="1" />
                <text x="160" y="110" textAnchor="middle" fill="#f5f2eb" fontSize="11" fontWeight="500">
                  PANORAMIC PARK BALCONY (20'0" × 6'0")
                </text>
              </g>

              {/* Master Suite */}
              <g transform="translate(540, 145)">
                <rect width="180" height="90" fill="#1a1e28" stroke="#333a4a" strokeWidth="1" />
                <text x="90" y="26" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
                  MASTER SUITE
                </text>
                {showDimensions && (
                  <text x="90" y="42" textAnchor="middle" fill="#94a3b8" fontSize="9">
                    15'0" × 13'6"
                  </text>
                )}
              </g>
              {/* Gourmet Kitchen */}
              <g transform="translate(730, 145)">
                <rect width="130" height="90" fill="#1a1e28" stroke="#333a4a" strokeWidth="1" />
                <text x="65" y="26" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
                  GOURMET KITCHEN
                </text>
                {showDimensions && (
                  <text x="65" y="42" textAnchor="middle" fill="#94a3b8" fontSize="9">
                    12'0" × 9'6"
                  </text>
                )}
              </g>
            </g>

            {/* =========================================================
                UNIT 3 (RIGHT WING) — 3 BHK ELITE (1,875 SQ.FT.)
            ========================================================== */}
            <g
              id="unit-3"
              className="cursor-pointer transition-opacity"
              onClick={() => onSelectApartment(`${towerCode}-${floorNum * 100 + 3}`)}
              opacity={activeUnitIndex === 3 ? 1 : 0.65}
            >
              {/* Unit boundary fill */}
              <rect
                x="890"
                y="60"
                width="440"
                height="830"
                rx="8"
                fill={activeUnitIndex === 3 ? '#18202d' : '#141720'}
                stroke={activeUnitIndex === 3 ? '#c59b6d' : '#2d3342'}
                strokeWidth={activeUnitIndex === 3 ? 3 : 1.5}
              />

              {/* Unit Header Badge */}
              <g transform="translate(1005, 85)">
                <rect width="210" height="42" rx="6" fill="#1e2532" stroke="#c59b6d" strokeWidth="1.5" />
                <text x="105" y="24" textAnchor="middle" fill="#c59b6d" fontSize="13" fontWeight="bold">
                  APT {towerCode}-{floorNum * 100 + 3} • 3 BHK ELITE
                </text>
                <text x="105" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Super Area: 1,875 SQ.FT.
                </text>
              </g>

              {/* Living & Dining Room */}
              <g transform="translate(1040, 145)">
                <rect width="270" height="240" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="135" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
                  LIVING & DINING
                </text>
                {showDimensions && (
                  <text x="135" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    24'0" × 14'0"
                  </text>
                )}
                {showFurniture && (
                  <g opacity="0.8">
                    <rect x="110" y="70" width="130" height="35" rx="4" fill="#3b4252" />
                    <rect x="200" y="105" width="40" height="60" rx="4" fill="#3b4252" />
                    <rect x="130" y="115" width="60" height="35" rx="3" fill="#5c4033" />
                  </g>
                )}
              </g>

              {/* Living Balcony */}
              <g transform="translate(1040, 395)">
                <rect width="270" height="80" fill="url(#balconyTile)" stroke="#333a4a" strokeWidth="1.2" />
                <text x="135" y="42" textAnchor="middle" fill="#f5f2eb" fontSize="12" fontWeight="500">
                  SUNSET VIEW BALCONY
                </text>
                {showDimensions && (
                  <text x="135" y="58" textAnchor="middle" fill="#c2b196" fontSize="10">
                    14'0" × 5'6" • Pool & Clubhouse View
                  </text>
                )}
              </g>

              {/* Kitchen */}
              <g transform="translate(910, 145)">
                <rect width="120" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  KITCHEN
                </text>
                {showDimensions && (
                  <text x="60" y="44" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    10'0" × 9'0"
                  </text>
                )}
              </g>

              {/* Master Suite */}
              <g transform="translate(1060, 485)">
                <rect width="250" height="220" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="125" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
                  MASTER BEDROOM
                </text>
                {showDimensions && (
                  <text x="125" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    15'0" × 13'6"
                  </text>
                )}
              </g>

              {/* Bedrooms 2 & 3 */}
              <g transform="translate(910, 715)">
                <rect width="200" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  BEDROOM 2
                </text>
                {showDimensions && (
                  <text x="100" y="42" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    12'0" × 11'0"
                  </text>
                )}
              </g>
              <g transform="translate(1120, 715)">
                <rect width="190" height="160" fill="#1a1e28" stroke="#333a4a" strokeWidth="1.2" />
                <text x="95" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
                  BEDROOM 3
                </text>
                {showDimensions && (
                  <text x="95" y="42" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    11'0" × 11'0"
                  </text>
                )}
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
