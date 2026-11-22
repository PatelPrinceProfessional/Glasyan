'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, splitTextIntoSpans } from '@/lib/gsap';

interface ScrollWordsProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}

/**
 * ScrollWords Component
 * Words go from 15% opacity to 100% (and --ink color) as scroll progresses (scrub).
 * Optional highlightWords transition to signature teal color.
 */
export function ScrollWords({
  text,
  className = '',
  highlightWords = ['water', 'glow', 'pure', 'radiance'],
  highlightColor = '#008C95',
}: ScrollWordsProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      return;
    }

    const { words, revert } = splitTextIntoSpans(el, { type: 'words', maskLines: false });

    // Initial subdued opacity
    gsap.set(words, { opacity: 0.15, color: '#0A2E32' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });

      words.forEach((w) => {
        const cleanWord = w.innerText.toLowerCase().replace(/[^a-z]/g, '');
        const isHighlight = highlightWords.some((hw) => hw.toLowerCase() === cleanWord);

        tl.to(
          w,
          {
            opacity: 1,
            color: isHighlight ? highlightColor : '#0A2E32',
            ease: 'power2.out',
            duration: 0.25,
          },
          '>-0.12'
        );
      });
    }, el);

    return () => {
      ctx.revert();
      revert();
    };
  }, [text, highlightWords, highlightColor]);

  return (
    <p ref={containerRef} className={`scroll-words-text leading-[1.3] will-change-transform ${className}`}>
      {text}
    </p>
  );
}
