import React from 'react';
import { ArrowLeft, Building2, Layers, Home, Eye } from 'lucide-react';
import { BUILDINGS_DATA } from '../data/buildings';

export default function BuildingSelector({
  selectedBuildingId,
  onSelectBuilding,
  onResetMasterplan,
}) {
  const currentBuilding = BUILDINGS_DATA.find((b) => b.id === selectedBuildingId);

  return (
    <div className="absolute top-20 right-4 z-20 pointer-events-auto flex flex-col items-end gap-2">
      {/* Tower Selector Pills */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-1 border border-white/10 shadow-elevated">
        <button
          onClick={onResetMasterplan}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            !selectedBuildingId
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          All Towers
        </button>

        {BUILDINGS_DATA.map((b) => {
          const isSelected = selectedBuildingId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBuilding(b.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{b.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Tower Details Card */}
      {currentBuilding && (
        <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-elevated w-72 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <h3 className="font-bold text-sm text-white">{currentBuilding.name}</h3>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium">
                {currentBuilding.subtitle}
              </p>
            </div>
            <button
              onClick={onResetMasterplan}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[10px] flex items-center gap-1"
              title="Return to Masterplan"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[10px] text-white/50 block">Floors</span>
              <span className="font-semibold text-white">15 Residential</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[10px] text-white/50 block">Apartments</span>
              <span className="font-semibold text-white">45 Luxury Units</span>
            </div>
          </div>

          <div className="mt-2.5 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-[11px] text-amber-200/90 leading-tight">
            <span className="font-semibold text-amber-300">Orientation: </span>
            {currentBuilding.facing}
          </div>

          <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
            {currentBuilding.description}
          </p>
        </div>
      )}
    </div>
  );
}
