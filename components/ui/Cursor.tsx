'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Custom Cursor Component (Desktop Only)
 * Section 5.3:
 * - Small teal dot with a trailing ring via gsap.quickTo
 * - On links, buttons & interactables: ring grows (scale 2.2)
 * - On product elements: shows "View"
 * - On draggable areas: shows "Drag"
 * - Automatically hidden on mobile / touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (typeof window === 'undefined') return;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasCoarsePointer || prefersReducedMotion) {
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // High performance quickTo setters
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      // Check target element for custom cursor attributes
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, input, [data-cursor], [data-cursor-view], [data-cursor-drag]');

      if (interactiveEl) {
        setIsHovered(true);
        if (interactiveEl.hasAttribute('data-cursor-view')) {
          setCursorText('VIEW');
        } else if (interactiveEl.hasAttribute('data-cursor-drag')) {
          setCursorText('DRAG');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Central Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-teal pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden lg:block ${
          isVisible ? 'opacity-90' : 'opacity-0'
        } ${isHovered ? 'scale-0' : 'scale-100'}`}
      />

      {/* Trailing Fluid Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-teal/70 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hidden lg:flex ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'w-16 h-16 bg-teal text-white border-transparent'
            : isHovered
            ? 'w-12 h-12 bg-teal/10 border-teal scale-110'
            : 'w-8 h-8 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span ref={labelRef} className="font-sans text-[9px] font-semibold tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
