'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface WaveDividerProps {
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  inverted?: boolean;
}

/**
 * WaveDivider Component
 * SVG flowing wave that morphs and drifts, scrubbed by scroll.
 */
export function WaveDivider({
  className = '',
  fillColor = '#E4F2F3',
  strokeColor = '#7FC4C9',
  inverted = false,
}: WaveDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Scrub wave control points through subtle sine curves
      gsap.to(path, {
        attr: {
          d: inverted
            ? 'M0,0 C380,80 760,0 1140,70 C1300,100 1400,20 1440,50 L1440,0 L0,0 Z'
            : 'M0,40 C320,110 680,10 1020,90 C1240,130 1380,20 1440,60 L1440,160 L0,160 Z',
        },
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [inverted]);

  const defaultPath = inverted
    ? 'M0,0 C280,40 620,100 960,30 C1200,-20 1360,70 1440,20 L1440,0 L0,0 Z'
    : 'M0,80 C360,10 720,100 1080,30 C1260,0 1380,80 1440,40 L1440,160 L0,160 Z';

  return (
    <div ref={containerRef} className={`wave-divider w-full overflow-hidden leading-none relative select-none ${className}`}>
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 md:h-32 block"
      >
        <path
          ref={pathRef}
          d={defaultPath}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.2"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}
