import React from 'react';
import { X, Trees, Building2, Trophy, Sparkles, Footprints, ShieldCheck, Navigation } from 'lucide-react';
import { AMENITIES_DATA } from '../data/amenities';

export default function AmenitiesModal({ isOpen, onClose, onSelectAmenity }) {
  if (!isOpen) return null;

  const iconMap = {
    Trees,
    Building2,
    Trophy,
    Sparkles,
    Footprints,
    ShieldCheck,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                World-Class Master Amenities
              </h2>
              <p className="text-xs text-white/50">
                Experience 78% open landscaped sanctuary designed for recreation and wellness
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

        {/* Amenities Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {AMENITIES_DATA.map((amenity) => {
            const Icon = iconMap[amenity.icon] || Trees;
            return (
              <div
                key={amenity.id}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <button
                      onClick={() => {
                        onSelectAmenity(amenity);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-charcoal-900 text-amber-300 text-xs font-semibold transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      View in 3D
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-white mt-3">{amenity.name}</h3>
                  <p className="text-xs text-amber-300/80 font-medium">{amenity.subtitle}</p>
                  <p className="mt-2 text-xs text-white/60 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                  {amenity.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 text-white/70 px-2 py-0.5 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 text-center text-xs text-white/40">
          All amenities are integrated within the private gated estate of 3D Residences
        </div>
      </div>
    </div>
  );
}
