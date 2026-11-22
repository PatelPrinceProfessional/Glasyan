'use client';

import React, { useEffect, useState } from 'react';
import { isMotionDebug } from '@/motion.config';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * DebugPanel Component
 * Section 4: Activated when ?motion=debug is in the URL.
 * Shows ScrollTrigger markers toggle and speed scaling panel.
 */
export function DebugPanel() {
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showMarkers, setShowMarkers] = useState(true);

  useEffect(() => {
    if (isMotionDebug()) {
      setActive(true);
    }
  }, []);

  if (!active) return null;

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSpeed(val);
    window.sessionStorage.setItem('glasyan_motion_speed', val.toString());
  };

  const handleToggleMarkers = () => {
    const next = !showMarkers;
    setShowMarkers(next);
    ScrollTrigger.defaults({
      markers: next,
    });
    ScrollTrigger.refresh();
  };

  return (
    <aside
      aria-label="Glasyan Motion Debugger"
      className="fixed bottom-6 right-6 z-[9999] bg-ink/90 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-teal/40 font-mono text-xs space-y-2.5"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-1.5">
        <span className="font-bold text-teal-light">GLASYAN MOTION DEBUG</span>
        <button
          onClick={() => setActive(false)}
          className="text-white/60 hover:text-white text-[11px]"
        >
          [close]
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <label htmlFor="speed-slider">Speed: {speed}x</label>
        <input
          id="speed-slider"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
          className="w-24 accent-teal"
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <span>Markers</span>
        <button
          onClick={handleToggleMarkers}
          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
            showMarkers ? 'bg-teal text-white' : 'bg-white/20 text-white/70'
          }`}
        >
          {showMarkers ? 'ON' : 'OFF'}
        </button>
      </div>
    </aside>
  );
}
