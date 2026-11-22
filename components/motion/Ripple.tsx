'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface RippleProps {
  className?: string;
  ringCount?: number;
  color?: string;
  triggerEvent?: boolean;
  size?: number;
}

/**
 * Ripple Component
 * Concentric rings (scale 0 to 3, opacity 0.6 to 0) in a repeating stagger.
 * Ambient and event-triggerable.
 */
export function Ripple({
  className = '',
  ringCount = 3,
  color = 'rgba(0, 140, 149, 0.4)',
  size = 180,
}: RippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const rings = container.querySelectorAll('.ripple-ring');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rings,
        { scale: 0.1, opacity: 0.7 },
        {
          scale: 3.2,
          opacity: 0,
          duration: 3.2,
          stagger: 0.9,
          repeat: -1,
          ease: 'power2.out',
        }
      );
    }, container);

    return () => ctx.revert();
  }, [ringCount]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {Array.from({ length: ringCount }).map((_, i) => (
        <span
          key={i}
          className="ripple-ring absolute rounded-full border border-teal-light/50"
          style={{
            width: '100%',
            height: '100%',
            borderColor: color,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
