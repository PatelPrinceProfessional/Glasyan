'use client';

import React from 'react';
import { Marquee } from '@/components/motion/Marquee';

/**
 * MarqueeBand Section
 * Section 6.8:
 * - Large outlined and filled Melodrama text ("PURE • RADIANT • HYDRATED • LUXURIOUS • CELLULAR • TIMELESS")
 * - Reacts dynamically to scroll velocity
 */
export function MarqueeBand() {
  return (
    <section className="marquee-band-section w-full bg-white py-12 border-y border-teal/15 select-none overflow-hidden">
      <Marquee
        items={['PURE', 'RADIANT', 'HYDRATED', 'LUXURIOUS', 'CELLULAR', 'TIMELESS']}
        speed={1.4}
        outlineAlternate={true}
      />
    </section>
  );
}
