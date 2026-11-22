'use client';

import React from 'react';

/**
 * AmbientBackground Component
 * Section 5.5:
 * 2-3 huge, blurred aqua blobs slowly drifting (60-90s loops) behind sections,
 * plus a subtle luxury film-grain texture.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none" aria-hidden="true">
      {/* Primary Aqua Glow Blob */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full opacity-40 blur-[130px] animate-drift-blob"
        style={{
          background: 'radial-gradient(circle, rgba(127, 196, 201, 0.45) 0%, rgba(228, 242, 243, 0.2) 60%, transparent 80%)',
          animationDuration: '75s',
        }}
      />

      {/* Secondary Soft Teal Mist Blob */}
      <div
        className="absolute top-[45%] right-[-10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-35 blur-[140px] animate-drift-blob"
        style={{
          background: 'radial-gradient(circle, rgba(0, 140, 149, 0.22) 0%, rgba(127, 196, 201, 0.15) 50%, transparent 75%)',
          animationDuration: '88s',
          animationDirection: 'reverse',
        }}
      />

      {/* Tertiary Pearl Champagne Horizon Blob */}
      <div
        className="absolute bottom-[-15%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-30 blur-[120px] animate-drift-blob"
        style={{
          background: 'radial-gradient(circle, rgba(200, 181, 143, 0.25) 0%, rgba(228, 242, 243, 0.2) 55%, transparent 80%)',
          animationDuration: '65s',
        }}
      />

      {/* Subtle Micro-Noise / Film-Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
