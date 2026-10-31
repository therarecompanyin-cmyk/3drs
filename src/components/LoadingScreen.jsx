import React from 'react';
import { Building, Sparkles, AlertTriangle } from 'lucide-react';

export default function LoadingScreen({ isLoading, hasWebGLError }) {
  if (hasWebGLError) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0e1017] flex items-center justify-center p-6 text-white text-center">
        <div className="glass-panel p-8 rounded-3xl max-w-md border border-rose-500/30">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">WebGL Acceleration Unavailable</h2>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            Your browser or device appears to have hardware acceleration disabled, or WebGL is not supported. Please enable WebGL in your browser settings to experience the interactive 3D visualizer.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0c10] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700">
      <div className="text-center max-w-sm">
        {/* Brand Icon with Pulsing Halo */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shadow-2xl border border-amber-300/30">
            <Building className="w-8 h-8 text-charcoal-900" />
          </div>
        </div>

        {/* Project Title */}
        <h1 className="text-xl font-bold tracking-widest uppercase text-white font-sans">
          3D RESIDENCES
        </h1>
        <p className="text-xs text-amber-300/80 font-medium tracking-wider uppercase mt-1">
          Interactive Architectural Visualization
        </p>

        {/* Progress Animation */}
        <div className="mt-8 w-56 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>

        <p className="mt-4 text-[11px] text-white/40 tracking-wider">
          Compiling 3D Geometry & Masterplan Architecture...
        </p>
      </div>
    </div>
  );
}
