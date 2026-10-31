import React, { useState } from 'react';
import { Building, Layers, Home, Sparkles, ChevronDown, ChevronUp, Trees } from 'lucide-react';
import { BUILDING_SPECS } from '../data/buildings';

export default function ProjectInfo({ onSelectTower }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="absolute top-20 left-4 z-20 pointer-events-auto transition-all duration-300">
      <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-elevated w-72 backdrop-blur-md">
        {/* Header & Collapse toggle */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Project Master Overview
            </h2>
            <p className="text-[10px] text-white/50">4.5 Acre Integrated Sanctuary</p>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
            title={isCollapsed ? 'Expand Specs' : 'Collapse Specs'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Content Details */}
        {!isCollapsed && (
          <div className="mt-3 space-y-2.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                  <Building className="w-3 h-3 text-amber-400" />
                  <span>Towers</span>
                </div>
                <div className="font-semibold text-white mt-0.5">3 Residential</div>
              </div>

              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                  <Layers className="w-3 h-3 text-amber-400" />
                  <span>Floors</span>
                </div>
                <div className="font-semibold text-white mt-0.5">15 per Tower</div>
              </div>

              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                  <Home className="w-3 h-3 text-amber-400" />
                  <span>Apartments</span>
                </div>
                <div className="font-semibold text-white mt-0.5">135 Units Total</div>
              </div>

              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Typology</span>
                </div>
                <div className="font-semibold text-amber-200 mt-0.5">3 BHK Premium</div>
              </div>
            </div>

            {/* Landscape highlight */}
            <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-emerald-200">
                  Landscaped Central Park
                </div>
                <div className="text-[10px] text-emerald-300/70">
                  78% Open Green Space & Podium
                </div>
              </div>
            </div>

            {/* Quick jump to buildings */}
            <div className="pt-1">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5">
                Select Residential Tower
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'block-a', label: 'Block A' },
                  { id: 'block-b', label: 'Block B' },
                  { id: 'block-c', label: 'Block C' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onSelectTower(b.id)}
                    className="py-1 px-2 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-charcoal-900 border border-white/10 hover:border-amber-400 text-[11px] font-medium transition-all text-white/80"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
