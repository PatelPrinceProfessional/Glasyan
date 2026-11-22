'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollWords } from '@/components/motion/ScrollWords';

/**
 * Statement Section
 * Section 6.2:
 * - Full-viewport, centered
 * - One huge Melodrama sentence: "Born from glacial water. Made for your cellular glow."
 * - <ScrollWords> scrub
 * - Behind it, a very large wave line draws across (DrawSVG scrubbed)
 * - Key words ("water", "glow") turn teal as they reach full opacity
 */
export function Statement() {
  const containerRef = useRef<HTMLElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wave = wavePathRef.current;
    if (!container || !wave) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const length = wave.getTotalLength ? wave.getTotalLength() : 1800;
    wave.style.strokeDasharray = `${length} ${length}`;
    wave.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(wave, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="statement-section relative w-full min-h-[90vh] py-28 sm:py-36 bg-pearl flex flex-col items-center justify-center px-6 sm:px-12 select-none overflow-hidden"
    >
      {/* Background Animated DrawSVG Wave Line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-[1700px] opacity-40"
        >
          <path
            ref={wavePathRef}
            d="M-50,250 C200,100 450,420 750,220 C1050,40 1350,380 1650,200"
            stroke="#7FC4C9"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Top Label */}
      <div className="relative z-10 mb-8 inline-flex items-center gap-2">
        <span className="w-6 h-[1.5px] bg-teal" />
        <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-teal-deep">
          The Glasyan Ethos
        </span>
        <span className="w-6 h-[1.5px] bg-teal" />
      </div>

      {/* Huge Melodrama Statement Sentence with ScrollWords Scrub */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <ScrollWords
          text="Born from pristine glacial water. Engineered to awaken your hair's cellular glow."
          highlightWords={['glacial', 'water', 'cellular', 'glow']}
          highlightColor="#008C95"
          className="font-melodrama text-display-m sm:text-display-l md:text-display-xl font-normal leading-[1.08] tracking-tight"
        />
      </div>

      {/* Subtext Paragraph */}
      <p className="relative z-10 font-sans text-sm sm:text-base text-ink/70 max-w-xl text-center mt-10 leading-relaxed font-normal">
        We replace standard filler aqua with nutrient-dense alpine run-off and conchiolin pearl peptides.
        Every drop penetrates the cuticle layer, infusing the cortex with weightless hydration.
      </p>
    </section>
  );
}
