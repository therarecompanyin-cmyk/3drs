import React, { useState } from 'react';
import {
  X,
  LayoutTemplate,
  Box,
  Compass,
  CheckCircle2,
  Clock,
  Ban,
  Sparkles,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';

export default function ApartmentPanel({
  apartment,
  onClose,
  onViewFloorPlan,
  onViewInterior,
}) {
  const [showEnquiryDemo, setShowEnquiryDemo] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  if (!apartment) return null;

  const statusBadge = {
    available: {
      text: 'Available',
      color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
    },
    booked: {
      text: 'Booked / Under Contract',
      color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: Clock,
    },
    sold: {
      text: 'Sold Out',
      color: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      icon: Ban,
    },
  }[apartment.status || 'available'];

  const StatusIcon = statusBadge.icon;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 z-30 pointer-events-auto w-[92%] max-w-md animate-slideUp">
      <div className="glass-panel p-5 rounded-3xl border border-white/15 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {apartment.id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                {apartment.config} Luxury
              </span>
            </div>
            <p className="text-xs text-white/60 mt-0.5">
              {apartment.buildingName} • Floor {apartment.floorNumber} • {apartment.typeName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Specifications Matrix */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Super Built-up
            </span>
            <span className="text-sm font-bold text-white">
              {apartment.superBuiltUpArea}
            </span>
            <span className="text-[10px] text-white/40 block">sq.ft.*</span>
          </div>

          <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Carpet Area
            </span>
            <span className="text-sm font-bold text-white">
              {apartment.carpetArea}
            </span>
            <span className="text-[10px] text-white/40 block">sq.ft.*</span>
          </div>

          <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Indicative Price
            </span>
            <span className="text-sm font-bold text-amber-300">
              {apartment.samplePrice}
            </span>
            <span className="text-[9px] text-white/40 block">Demo Pricing</span>
          </div>
        </div>

        {/* Facing & Highlights */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs bg-white/5 px-3 py-2 rounded-xl">
            <span className="text-white/60">Balcony Orientation:</span>
            <span className="font-medium text-amber-200">{apartment.facing}</span>
          </div>

          {/* Status Badge & Demo Label */}
          <div className="flex items-center justify-between pt-1">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{statusBadge.text}</span>
            </div>

            <div className="text-[10px] text-white/40 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              DEMO INVENTORY
            </div>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={onViewFloorPlan}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-all hover:scale-[1.02]"
          >
            <LayoutTemplate className="w-4 h-4 text-amber-400" />
            2D Floor Plan
          </button>

          <button
            onClick={onViewInterior}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-charcoal-900 font-bold text-xs transition-all shadow-lg shadow-amber-500/25 hover:scale-[1.02]"
          >
            <Box className="w-4 h-4 text-charcoal-900" />
            3D Cutaway Interior
          </button>
        </div>

        {/* Enquiry Demo Trigger */}
        <div className="mt-2.5 text-center">
          <button
            onClick={() => setShowEnquiryDemo(!showEnquiryDemo)}
            className="text-[11px] text-amber-300/80 hover:text-amber-200 underline underline-offset-4"
          >
            {showEnquiryDemo ? 'Hide Demo Booking' : 'Schedule Demo Site Tour / Enquire'}
          </button>
        </div>

        {/* Demo Enquiry Form */}
        {showEnquiryDemo && (
          <div className="mt-3 p-3 rounded-2xl bg-[#0a0d14]/90 border border-white/10 text-xs">
            {enquirySubmitted ? (
              <div className="text-center py-2 text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Demo enquiry registered for {apartment.id}!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySubmitted(true);
                }}
                className="space-y-2"
              >
                <div className="text-[11px] text-white/70">
                  Request detailed brochure & VIP tour for unit {apartment.id}:
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-semibold rounded-lg text-xs transition-all"
                >
                  Submit Demo Request
                </button>
              </form>
            )}
          </div>
        )}

        {/* Clarification footnote */}
        <p className="mt-3 text-[10px] text-white/40 text-center leading-tight">
          *Illustrative sample area & architectural specifications. Demo dataset for conceptual visualization.
        </p>
      </div>
    </div>
  );
}
