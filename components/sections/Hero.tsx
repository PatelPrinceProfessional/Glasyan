'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, splitTextIntoSpans } from '@/lib/gsap';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Ripple } from '@/components/motion/Ripple';
import { FloatingDroplets } from '@/components/motion/FloatingDroplets';
import { ChevronDown, Sparkles, Droplets, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

/**
 * Hero Section
 * Section 6.1:
 * - Pinned (300% desktop / 180% mobile)
 * - Layers: ghost outline text, ripples, <ProductSlot />, headline lines, orbiting chips, scroll-hint
 * - Intro: product slot rises from y: 140, blur 12 to 0, scale 0.9 to 1
 * - Idle: slot floats +-10px with soft shadow, mouse parallax via quickTo
 * - Scroll scrub: headline lines split apart (-30% / +30%), slot scales 1 to 1.18 & rotates, chips orbit
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  const slotWrapperRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const ctaBoxRef = useRef<HTMLDivElement>(null);
  const chipsOrbitRef = useRef<HTMLDivElement>(null);
  const handoffLineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    const ghostText = ghostTextRef.current;
    const slotWrapper = slotWrapperRef.current;
    const h1Line1 = headlineLine1Ref.current;
    const h1Line2 = headlineLine2Ref.current;
    const ctaBox = ctaBoxRef.current;
    const chipsBox = chipsOrbitRef.current;
    const handoffLine = handoffLineRef.current;
    const scrollHint = scrollHintRef.current;

    if (!container || !pinTarget || !slotWrapper) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // 1. INTRO TIMELINE (Runs on mount / after loader)
      const introTl = gsap.timeline({ delay: 0.3 });

      // Ghost outline fades up
      if (ghostText) {
        introTl.fromTo(ghostText, { opacity: 0, scale: 0.95 }, { opacity: 0.08, scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
      }

      // Product Slot rises from y: 140 with blur and scale
      introTl.fromTo(
        slotWrapper,
        { y: 140, scale: 0.88, filter: 'blur(12px)', opacity: 0 },
        { y: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.8, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        0.1
      );

      // Headline lines reveal word by word
      if (h1Line1 && h1Line2) {
        const words1 = splitTextIntoSpans(h1Line1, { type: 'words', maskLines: true });
        const words2 = splitTextIntoSpans(h1Line2, { type: 'words', maskLines: true });

        introTl.fromTo(
          [...words1.words, ...words2.words],
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          0.5
        );
      }

      // CTA and scroll hint fade in last
      if (ctaBox && scrollHint) {
        introTl.fromTo([ctaBox, scrollHint], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, 0.9);
      }

      // 2. IDLE FLOATING ANIMATION
      const floatTween = gsap.to(slotWrapper, {
        y: -14,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.1,
      });

      // 3. MOUSE PARALLAX (quickTo)
      const slotX = gsap.quickTo(slotWrapper, 'x', { duration: 0.8, ease: 'power2.out' });
      const ghostX = ghostText ? gsap.quickTo(ghostText, 'x', { duration: 1.2, ease: 'power2.out' }) : null;

      const handleMouseMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        slotX(normX * 14);
        if (ghostX) ghostX(normX * -28);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 4. SCROLL TIMELINE (PINNED 300% DESKTOP)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          pin: pinTarget,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 0-30%: Headline lines split apart and fade; Ghost text scales
      if (h1Line1 && h1Line2) {
        scrollTl.to(h1Line1, { xPercent: -35, opacity: 0, ease: 'power2.inOut' }, 0)
          .to(h1Line2, { xPercent: 35, opacity: 0, ease: 'power2.inOut' }, 0);
      }

      if (ctaBox && scrollHint) {
        scrollTl.to([ctaBox, scrollHint], { opacity: 0, y: -30, ease: 'power2.in' }, 0);
      }

      if (ghostText) {
        scrollTl.to(ghostText, { scale: 1.35, opacity: 0.03, ease: 'none' }, 0);
      }

      // 0-60%: Slot scales up and rotates slightly; background shifts
      scrollTl.to(
        slotWrapper,
        {
          scale: 1.18,
          rotationZ: 5,
          ease: 'power1.inOut',
        },
        0
      );

      // 40-100%: Chips orbit slot and settle in a row; handoff line reveals
      if (chipsBox) {
        const chips = chipsBox.querySelectorAll('.hero-chip-badge');
        scrollTl.fromTo(
          chips,
          { opacity: 0, scale: 0.6, y: 60 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.12, ease: 'power2.out' },
          0.35
        );
      }

      if (handoffLine) {
        scrollTl.fromTo(
          handoffLine,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.65
        );
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        floatTween.kill();
        scrollTl.kill();
        introTl.kill();
      };
    });

    // MOBILE TIMELINE (Simpler, shorter pin)
    mm.add('(max-width: 1023px)', () => {
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=180%',
          pin: pinTarget,
          pinSpacing: true,
          scrub: 1,
        },
      });

      mobileTl.to(slotWrapper, { scale: 1.08, ease: 'none' }, 0);
      if (h1Line1 && h1Line2) {
        mobileTl.to([h1Line1, h1Line2], { opacity: 0, y: -20, ease: 'none' }, 0);
      }

      return () => mobileTl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative w-full bg-white select-none">
      {/* Pinned Target Viewport Frame */}
      <div
        ref={pinTargetRef}
        className="hero-pin-target relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Layer 1: Huge Ghost Outline "GLASYAN" Background */}
        <div
          ref={ghostTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-melodrama text-[18vw] font-normal leading-none tracking-[0.06em] uppercase text-transparent whitespace-nowrap will-change-transform"
            style={{
              WebkitTextStroke: '1.5px rgba(0, 140, 149, 0.45)',
            }}
          >
            GLASYAN
          </span>
        </div>

        {/* Layer 2: Concentric Water Ripples */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-5">
          <Ripple ringCount={4} size={320} color="rgba(0, 140, 149, 0.25)" />
        </div>

        {/* Layer 3: Floating Micro-Droplets */}
        <FloatingDroplets count={14} color="#008C95" />

        {/* Layer 4: Centered Product Slot Capsule */}
        <div
          ref={slotWrapperRef}
          className="relative z-10 my-auto flex flex-col items-center justify-center will-change-transform"
        >
          <ProductSlot size="hero" />
        </div>

        {/* Layer 5: Hero Headlines and Subtitle Text */}
        <div className="absolute inset-x-0 top-[18%] sm:top-[16%] flex flex-col items-center text-center px-4 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-mist/80 border border-teal/20 text-teal-deep text-[11px] font-sans tracking-[0.2em] uppercase font-semibold mb-3">
            <Droplets className="w-3.5 h-3.5 text-teal" />
            Pure Alpine Hair Alchemy
          </div>

          <h1
            ref={headlineLine1Ref}
            className="font-melodrama text-display-l sm:text-display-xl font-normal text-ink tracking-tight will-change-transform"
          >
            BORN FROM WATER.
          </h1>
          <h2
            ref={headlineLine2Ref}
            className="font-melodrama text-display-l sm:text-display-xl font-normal text-teal tracking-tight mt-1 sm:mt-2 will-change-transform"
          >
            MADE FOR RADIANCE.
          </h2>
        </div>

        {/* Layer 6: Orbiting Ingredient Chips (Settles on scroll) */}
        <div
          ref={chipsOrbitRef}
          className="absolute inset-x-0 bottom-[24%] sm:bottom-[20%] flex items-center justify-center gap-3 sm:gap-6 px-4 z-20 pointer-events-none"
        >
          <div className="hero-chip-badge glass-panel px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Glacial Deuterium-Free</span>
          </div>
          <div className="hero-chip-badge glass-panel px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform">
            <Droplets className="w-3.5 h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Hydrolyzed Pearl Amino</span>
          </div>
          <div className="hero-chip-badge glass-panel px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform hidden sm:flex">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Biomimetic Keratin Seal</span>
          </div>
        </div>

        {/* Layer 7: Short Handoff Line (fades in near end of pin) */}
        <p
          ref={handoffLineRef}
          className="absolute bottom-[14%] inset-x-0 text-center font-melodrama text-lg sm:text-xl text-teal-deep opacity-0 tracking-wide pointer-events-none z-20"
        >
          Pure water. Cellular luminescence.
        </p>

        {/* Layer 8: Primary Call To Action */}
        <div ref={ctaBoxRef} className="absolute bottom-[8%] sm:bottom-[6%] z-30 flex flex-col items-center gap-3">
          <Link href="/collections/all">
            <MagneticButton variant="primary" size="lg" className="shadow-lg">
              Explore The Rituals
            </MagneticButton>
          </Link>
        </div>

        {/* Layer 9: Scroll Indicator Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-teal-deep/60 text-[10px] uppercase font-sans tracking-[0.24em] pointer-events-none"
        >
          <span className="animate-bounce">
            <ChevronDown className="w-4 h-4 text-teal" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
