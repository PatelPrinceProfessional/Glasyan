'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -30 for upward offset, +30 for downward
  className?: string;
  clamp?: boolean;
}

/**
 * Parallax Component
 * Smooth yPercent scrub with per-element velocity factor.
 */
export function Parallax({ children, speed = 20, className = '', clamp = true }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, clamp]);

  return (
    <div ref={containerRef} className={`parallax-layer will-change-transform ${className}`}>
      {children}
    </div>
  );
}
