'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface PinSectionProps {
  children: React.ReactNode;
  className?: string;
  pinDistance?: string | number; // e.g., '200%' or 2.0
  anticipatePin?: number;
  onUpdate?: (progress: number) => void;
  pinSpacing?: boolean;
}

/**
 * PinSection Component
 * Pinned viewport section with anticipatePin: 1, mobile-safe config,
 * and seamless scroll tracking.
 */
export function PinSection({
  children,
  className = '',
  pinDistance = '200%',
  anticipatePin = 1,
  onUpdate,
  pinSpacing = true,
}: PinSectionProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    const container = containerRef.current;
    if (!pinEl || !container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: pinEl,
          pinSpacing,
          anticipatePin,
          scrub: 1,
          onUpdate: (self) => {
            if (onUpdate) onUpdate(self.progress);
          },
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, [pinDistance, anticipatePin, pinSpacing, onUpdate]);

  return (
    <div ref={containerRef} className={`pin-section-container relative ${className}`}>
      <div ref={pinRef} className="pin-section-target w-full h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
