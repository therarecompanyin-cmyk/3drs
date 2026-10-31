import React from 'react';
import { Eye, EyeOff, Layers, Sparkles, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { getApartmentsByFloor } from '../data/apartments';

export default function FloorSelector({
  selectedBuildingId,
  selectedFloorNumber,
  selectedApartmentId,
  isFloorIsolated,
  onToggleIsolation,
  onSelectFloor,
  onSelectApartment,
  onViewFloorPlan,
}) {
  if (!selectedBuildingId) return null;

  const floors = Array.from({ length: 15 }, (_, i) => 15 - i); // 15 down to 1

  // Current floor apartments
  const currentFloorApartments = selectedFloorNumber
    ? getApartmentsByFloor(selectedBuildingId, selectedFloorNumber)
    : [];

  return (
    <div className="absolute right-4 bottom-24 top-72 z-20 pointer-events-auto flex items-end gap-3 select-none">
      {/* Apartment Drawer for Selected Floor */}
      {selectedFloorNumber && currentFloorApartments.length > 0 && (
        <div className="glass-panel p-3.5 rounded-2xl border border-white/10 shadow-elevated w-72 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                Floor {selectedFloorNumber} Units
              </span>
              <span className="text-xs font-semibold text-white">
                3 Independent Residences
              </span>
            </div>
            <button
              onClick={() => onSelectFloor(null)}
              className="text-[10px] text-white/50 hover:text-white px-2 py-1 rounded bg-white/5"
            >
              Clear
            </button>
          </div>

          {/* List of 3 Apartments */}
          <div className="mt-2.5 space-y-2">
            {currentFloorApartments.map((apt) => {
              const isSelected = selectedApartmentId === apt.id;
              const statusColor =
                apt.status === 'available'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : apt.status === 'booked'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

              return (
                <div
                  key={apt.id}
                  onClick={() => onSelectApartment(apt.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-md scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{apt.id}</span>
                      <span className="text-[10px] text-white/50 font-medium">3 BHK</span>
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${statusColor}`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-white/70">
                    <span>{apt.superBuiltUpArea} sq.ft.</span>
                    <span className="text-amber-300 font-medium">{apt.samplePrice}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick 2D Plan CTA */}
          <button
            onClick={onViewFloorPlan}
            className="w-full mt-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs font-medium transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Inspect 2D Floor Plan
          </button>
        </div>
      )}

      {/* Elevator-Style Vertical Floor Strip */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-elevated flex flex-col items-center gap-1 max-h-full overflow-y-auto">
        <div className="text-[9px] font-bold uppercase tracking-wider text-amber-400/80 pb-1 border-b border-white/10 w-full text-center">
          Floors
        </div>

        {/* Floors 15 down to 1 */}
        {floors.map((flr) => {
          const isSelected = selectedFloorNumber === flr;
          return (
            <button
              key={flr}
              onClick={() => onSelectFloor(isSelected ? null : flr)}
              className={`w-9 h-7 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                isSelected
                  ? 'bg-amber-500 text-charcoal-900 shadow-md scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={`Floor ${flr}`}
            >
              {flr}
            </button>
          );
        })}

        {/* Ground Floor */}
        <button
          onClick={() => onSelectFloor(null)}
          className="w-9 h-7 rounded-lg text-[10px] font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center border-t border-white/10 mt-0.5 pt-1"
          title="Ground Floor Lobby"
        >
          G
        </button>

        {/* Floor Isolation Toggle Switch */}
        {selectedFloorNumber && (
          <div className="pt-1.5 border-t border-white/10 w-full flex justify-center">
            <button
              onClick={onToggleIsolation}
              className={`p-2 rounded-lg transition-all ${
                isFloorIsolated
                  ? 'bg-amber-500 text-charcoal-900 shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
              title={isFloorIsolated ? 'Restore Full Building' : 'Isolate Floor (Cutaway above)'}
            >
              {isFloorIsolated ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
