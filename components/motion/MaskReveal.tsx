'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  shape?: 'rectangle' | 'arch' | 'circle' | 'pill';
  delay?: number;
  duration?: number;
  triggerHook?: string;
  parallaxSpeed?: number;
}

/**
 * MaskReveal Component
 * Reveals inner content via clip-path from inset(100% 0 0 0) to inset(0)
 * with an inner image scale from 1.25 to 1.0.
 */
export function MaskReveal({
  children,
  className = '',
  shape = 'rectangle',
  delay = 0,
  duration = 1.35,
  triggerHook = 'top 85%',
  parallaxSpeed = 1,
}: MaskRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrapper.style.clipPath = 'inset(0% 0% 0% 0%)';
      inner.style.transform = 'scale(1)';
      return;
    }

    gsap.set(wrapper, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(inner, { scale: 1.28 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: triggerHook,
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.to(wrapper, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        delay,
        ease: 'power3.out',
      }).to(
        inner,
        {
          scale: 1,
          duration: duration * 1.15,
          ease: 'power3.out',
        },
        '<'
      );

      // Optional Parallax scrub after reveal
      if (parallaxSpeed !== 1) {
        gsap.to(inner, {
          yPercent: (parallaxSpeed - 1) * 35,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, [shape, delay, duration, triggerHook, parallaxSpeed]);

  const shapeStyles = {
    rectangle: 'rounded-2xl',
    arch: 'rounded-t-[9999px] rounded-b-2xl',
    circle: 'rounded-full aspect-square',
    pill: 'rounded-full',
  };

  return (
    <div
      ref={wrapperRef}
      className={`mask-reveal-wrapper overflow-hidden relative ${shapeStyles[shape]} ${className}`}
      style={{ willChange: 'clip-path' }}
    >
      <div ref={innerRef} className="mask-reveal-inner w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
