'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, Observer } from '@/lib/gsap';
import { assets, CollectionItem } from '@/assets.config';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

/**
 * CollectionSection Component
 * Section 6.6: Horizontal scroll pinned section
 * - Pins section and translates track on X by -(trackWidth - viewport)
 * - 5 collection cards with placeholder slots
 * - Velocity effect: cards skewX (max 4deg) based on scroll velocity, easing back to 0
 * - Pinned heading on left, words slide as progress advances
 * - Thin teal progress bar at bottom and current card index highlights
 * - Mobile: native horizontal swipe with snap
 */
export function CollectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const collections = assets.collections;

  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !pinTarget || !track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
      };

      // Card velocity skew effect
      const cards = track.querySelectorAll('.collection-scroll-card');
      let velocitySkew = 0;

      const obs = Observer.create({
        type: 'scroll,wheel,touch',
        onChange: (self) => {
          const vel = self.velocityY;
          // Clamp skew between -4 and 4 degrees
          velocitySkew = Math.max(-4, Math.min(4, vel * 0.005));
        },
      });

      const ticker = () => {
        velocitySkew += (0 - velocitySkew) * 0.1;
        cards.forEach((card) => {
          gsap.set(card, { skewX: velocitySkew });
        });
      };
      gsap.ticker.add(ticker);

      const st = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: pinTarget,
          pinSpacing: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              collections.length - 1,
              Math.floor(self.progress * collections.length)
            );
            setActiveCardIndex(index);
            if (progressBar) {
              progressBar.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        st.kill();
        obs.kill();
        gsap.ticker.remove(ticker);
      };
    });

    return () => mm.revert();
  }, [collections.length]);

  return (
    <section ref={containerRef} className="collection-section relative w-full bg-white select-none">
      <div
        ref={pinTargetRef}
        className="w-full min-h-[90vh] lg:h-screen flex flex-col justify-between py-8 sm:py-10 px-4 sm:px-12 relative overflow-hidden"
      >
        {/* Top Pinned Header Strip */}
        <div className="flex items-end justify-between max-w-7xl w-full mx-auto border-b border-teal/15 pb-4 sm:pb-5 z-20">
          <div>
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.26em] text-teal font-semibold">
              05 Formulations
            </span>
            <h2 className="font-melodrama text-2xl sm:text-4xl text-ink font-normal tracking-tight mt-1">
              Curated Collections
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-melodrama text-lg sm:text-xl text-teal font-light">
              0{activeCardIndex + 1}
            </span>
            <span className="text-[11px] sm:text-xs font-sans text-ink/40 tracking-widest">
              / 0{collections.length}
            </span>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="relative w-full my-auto overflow-x-auto lg:overflow-visible no-scrollbar py-4 sm:py-6 snap-x snap-mandatory">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-8 lg:gap-12 w-max px-4 lg:px-12 will-change-transform"
          >
            {collections.map((col, idx) => (
              <div
                key={col.id}
                className="collection-scroll-card w-[270px] sm:w-[350px] lg:w-[440px] flex-shrink-0 snap-center glass-panel rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-shadow duration-500 hover:shadow-glass-hover group will-change-transform"
              >
                {/* Card Top */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-teal">
                    {col.subtitle}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans text-ink/50 bg-teal-mist px-2.5 py-1 rounded-full">
                    {col.productCount} Formulations
                  </span>
                </div>

                {/* Card Product Slot Capsule Showcase */}
                <div className="relative h-48 sm:h-64 my-2 sm:my-4 flex items-center justify-center overflow-hidden">
                  <ProductSlot size="md" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>

                {/* Card Bottom Content */}
                <div>
                  <h3 className="font-melodrama text-xl sm:text-2xl font-normal text-ink mb-1.5 sm:mb-2">
                    {col.title}
                  </h3>
                  <p className="font-sans text-xs text-ink/70 leading-relaxed mb-4 sm:mb-5 line-clamp-2">
                    {col.description}
                  </p>

                  <Link
                    href={`/collections/${col.handle}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold text-teal hover:text-teal-deep transition-colors"
                  >
                    View Collection
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="w-full max-w-7xl mx-auto h-[2px] bg-teal/15 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-teal origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
}
