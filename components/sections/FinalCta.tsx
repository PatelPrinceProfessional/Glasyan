'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Ripple } from '@/components/motion/Ripple';
import { TransitionLink } from '@/components/ui/PageTransition';

/**
 * FinalCta Section
 * Section 6.11:
 * - Big Melodrama headline revealed line-by-line
 * - Wave SVG sweeps across behind it (scrubbed)
 * - Magnetic "Shop the collection" button with ripple on hover
 * - Clicking it triggers page transition into shop
 */
export function FinalCta() {
  const containerRef = useRef<HTMLElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wave = wavePathRef.current;
    const title = titleRef.current;
    if (!container || !wave || !title) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const length = wave.getTotalLength ? wave.getTotalLength() : 1600;
    wave.style.strokeDasharray = `${length} ${length}`;
    wave.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      // Wave stroke draws across on scroll
      gsap.to(wave, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      });

      // Title line reveal
      gsap.fromTo(
        title.querySelectorAll('.cta-line'),
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="final-cta-section relative w-full py-32 sm:py-44 bg-pearl overflow-hidden flex flex-col items-center justify-center text-center px-6 select-none"
    >
      {/* Background Scrubbed Wave SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden -z-10">
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-35"
        >
          <path
            ref={wavePathRef}
            d="M-40,200 C320,60 680,340 1040,160 C1240,60 1380,260 1480,180"
            stroke="#008C95"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Ripple Behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-5">
        <Ripple ringCount={3} size={320} color="rgba(0, 140, 149, 0.3)" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-teal mb-4">
          Initiate Your Transformation
        </span>

        <h2
          ref={titleRef}
          className="font-melodrama text-display-m sm:text-display-l md:text-display-xl font-normal text-ink tracking-tight mb-8"
        >
          <span className="overflow-hidden block py-1">
            <span className="cta-line block will-change-transform">Experience The</span>
          </span>
          <span className="overflow-hidden block py-1">
            <span className="cta-line block text-teal will-change-transform">Alchemy of Water.</span>
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-ink/70 max-w-md mb-10 leading-relaxed font-normal">
          Impart cellular luster, deep elasticity, and weightless purity to every strand.
          Curate your ceremony today.
        </p>

        <TransitionLink href="/collections/all">
          <MagneticButton variant="primary" size="lg" className="shadow-xl">
            Shop The Collection
          </MagneticButton>
        </TransitionLink>
      </div>
    </section>
  );
}
