'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, splitTextIntoSpans } from '@/lib/gsap';
import { motionConfig } from '@/motion.config';

interface SplitRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  type?: 'words' | 'lines' | 'chars';
  mode?: 'onEnter' | 'scrub';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  triggerHook?: string;
}

/**
 * SplitReveal Component
 * Splits text into masked overflow-hidden segments and reveals them from yPercent: 110.
 * Modes: 'onEnter' (triggers when in view) or 'scrub' (tied to scroll progress).
 */
export function SplitReveal({
  children,
  as: Tag = 'h2',
  type = 'words',
  mode = 'onEnter',
  delay = 0,
  duration = motionConfig.duration.slow,
  stagger = motionConfig.stagger.words,
  className = '',
  triggerHook = 'top 85%',
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      return;
    }

    const { words, chars, revert } = splitTextIntoSpans(el, { type, maskLines: true });
    const targets = type === 'chars' ? chars : words;

    gsap.set(targets, { yPercent: 115, opacity: 0 });

    let ctx: gsap.Context;

    if (mode === 'scrub') {
      ctx = gsap.context(() => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }, el);
    } else {
      ctx = gsap.context(() => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }, el);
    }

    return () => {
      ctx?.revert();
      revert();
    };
  }, [children, type, mode, delay, duration, stagger, triggerHook]);

  return (
    <Tag ref={containerRef as any} className={`split-reveal-container will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
