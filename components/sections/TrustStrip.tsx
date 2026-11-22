'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Counter } from '@/components/motion/Counter';
import { Droplet, Shield, Sparkles, Award } from 'lucide-react';

const TRUST_STATS = [
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Glacial Purity',
    description: 'Deuterium-depleted alpine water matrix',
    icon: Droplet,
  },
  {
    value: 88,
    prefix: '',
    suffix: '%',
    label: 'Breakage Reduction',
    description: 'Clinically verified conchiolin peptide bonding',
    icon: Sparkles,
  },
  {
    value: 0,
    prefix: '',
    suffix: '%',
    label: 'Sulfates & Silicones',
    description: 'Clean bio-fermented botanicals only',
    icon: Shield,
  },
  {
    value: 4.9,
    prefix: '',
    suffix: ' / 5',
    decimals: 1,
    label: 'Patron Satisfaction',
    description: 'Based on 1,200+ verified luxury rituals',
    icon: Award,
  },
];

/**
 * TrustStrip Section
 * Section 6.9:
 * - 4 counters with Melodrama numerals
 * - Clean animated hairline divider draws across first
 * - Badge icons with subtle luxury styling
 */
export function TrustStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const hairline = hairlineRef.current;
    if (!container || !hairline) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hairline,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="trust-strip-section relative w-full py-20 bg-pearl select-none">
      {/* Hairline Divider that draws across */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 overflow-hidden">
        <div
          ref={hairlineRef}
          className="w-full h-[1px] bg-teal/20 origin-left will-change-transform"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {TRUST_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-mist flex items-center justify-center text-teal mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-melodrama text-ink mb-1">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2.2}
                  />
                </div>

                <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-teal-deep mt-1">
                  {stat.label}
                </h3>
                <p className="font-sans text-xs text-ink/60 mt-1 max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
