import React from 'react';
import {
  Compass,
  Plus,
  Minus,
  Maximize,
  Rotate3d,
  Layers,
  ArrowUp,
  SlidersHorizontal,
  Building2,
  ZoomIn,
} from 'lucide-react';

export default function CameraControlsHUD({
  onResetCamera,
  onZoomIn,
  onZoomOut,
  onSetTopView,
  onSetFrontView,
  onInspectBlockA,
  onInspectFacade,
  autoRotate,
  onToggleAutoRotate,
  activeCameraPreset,
}) {
  return (
    <div className="absolute bottom-6 right-4 z-20 pointer-events-auto flex flex-col items-end gap-2">
      {/* Camera View Modes Selector */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-1 border border-white/10 shadow-elevated">
        <button
          onClick={onResetCamera}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeCameraPreset === 'masterplan'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title="Reset Camera to Masterplan Perspective"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={onSetTopView}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeCameraPreset === 'top'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title="Top Down Masterplan Aerial View"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Top</span>
        </button>

        <button
          onClick={onSetFrontView}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeCameraPreset === 'front'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title="Front Boulevard Elevation View"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span>Front</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-0.5" />

        <button
          onClick={onInspectBlockA}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeCameraPreset === 'inspect-block-a'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-amber-300/90 hover:text-amber-200 hover:bg-white/5'
          }`}
          title="Inspect Full Block A Tower Elevation (15 Floors & Rooftop Crown)"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Block A</span>
        </button>

        <button
          onClick={onInspectFacade}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeCameraPreset === 'facade-block-a'
              ? 'bg-amber-500 text-charcoal-900 font-semibold shadow-md'
              : 'text-amber-300/90 hover:text-amber-200 hover:bg-white/5'
          }`}
          title="Inspect Block A Facade Up-Close (Balconies, Glass & Details)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Facade Zoom</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-0.5" />

        <button
          onClick={onToggleAutoRotate}
          className={`p-1.5 rounded-xl transition-all ${
            autoRotate
              ? 'bg-amber-500 text-charcoal-900 shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title={autoRotate ? 'Stop Cinematic Orbit' : 'Start Cinematic Orbit'}
        >
          <Rotate3d className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom In & Out Floating Buttons */}
      <div className="glass-panel p-1 rounded-xl flex flex-col gap-1 border border-white/10 shadow-elevated">
        <button
          onClick={onZoomIn}
          className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="w-4 h-px bg-white/10 mx-auto" />
        <button
          onClick={onZoomOut}
          className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
