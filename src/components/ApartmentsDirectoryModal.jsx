import React, { useState, useMemo } from 'react';
import { X, Search, Filter, Home, LayoutTemplate, Box, CheckCircle2, Clock, Ban } from 'lucide-react';
import { ALL_APARTMENTS } from '../data/apartments';

export default function ApartmentsDirectoryModal({
  isOpen,
  onClose,
  onSelectApartmentAndJump,
  onViewFloorPlan,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTower, setSelectedTower] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredApartments = useMemo(() => {
    return ALL_APARTMENTS.filter((apt) => {
      if (selectedTower !== 'ALL' && apt.buildingCode !== selectedTower) return false;
      if (selectedStatus !== 'ALL' && apt.status !== selectedStatus) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          apt.id.toLowerCase().includes(q) ||
          apt.typeName.toLowerCase().includes(q) ||
          apt.facing.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedTower, selectedStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Residential Apartment Directory (135 Total)
              </h2>
              <p className="text-xs text-white/50">
                Explore luxury 3 BHK residences across Block A, Block B, and Block C
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-6 py-3.5 bg-black/25 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by Unit (e.g. A-702, B-1201)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Tower Filter */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {['ALL', 'A', 'B', 'C'].map((code) => (
              <button
                key={code}
                onClick={() => setSelectedTower(code)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedTower === code
                    ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {code === 'ALL' ? 'All Towers' : `Block ${code}`}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {['ALL', 'available', 'booked', 'sold'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg font-medium capitalize transition-all ${
                  selectedStatus === st
                    ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Apartments Table / Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredApartments.length === 0 ? (
            <div className="col-span-full py-12 text-center text-white/50 text-sm">
              No apartments match your search filters.
            </div>
          ) : (
            filteredApartments.map((apt) => {
              const statusBadge =
                apt.status === 'available'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : apt.status === 'booked'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

              return (
                <div
                  key={apt.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-2xl p-4 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{apt.id}</span>
                        <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {apt.config}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${statusBadge}`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-white/80 font-medium">{apt.typeName}</div>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      {apt.buildingName} • Floor {apt.floorNumber}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/5">
                      <span className="text-white/60">{apt.superBuiltUpArea} sq.ft.</span>
                      <span className="text-amber-300 font-semibold">{apt.samplePrice}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectApartmentAndJump(apt);
                        onClose();
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold text-xs transition-all shadow-sm"
                    >
                      Locate in 3D
                    </button>
                    <button
                      onClick={() => {
                        onViewFloorPlan(apt);
                        onClose();
                      }}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80"
                      title="Inspect 2D Plan"
                    >
                      <LayoutTemplate className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>Showing {filteredApartments.length} of 135 Apartments</span>
          <span className="text-amber-400/80 font-medium">DEMO INVENTORY • NOT REAL-TIME SYSTEM</span>
        </div>
      </div>
    </div>
  );
}
