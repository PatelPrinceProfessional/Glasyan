'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * ScrollProgress Component
 * Thin teal hairline at top of viewport that scales X with page scroll progress.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-teal origin-left z-50 pointer-events-none scale-x-0 will-change-transform"
      aria-hidden="true"
    />
  );
}
