'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface MagneticProps {
  children: React.ReactNode;
  radius?: number;
  pullFactor?: number;
  className?: string;
}

/**
 * Magnetic Component
 * Wraps any element to gently pull toward cursor within specified radius.
 */
export function Magnetic({ children, radius = 80, pullFactor = 0.35, className = '' }: MagneticProps) {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magnetRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        xTo((e.clientX - centerX) * pullFactor);
        yTo((e.clientY - centerY) * pullFactor);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [radius, pullFactor]);

  return (
    <div ref={magnetRef} className={`magnetic-wrapper inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
