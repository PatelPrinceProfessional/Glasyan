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

    // 1. INTRO TIMELINE (Runs on mount for ALL screen sizes)
    const introTl = gsap.timeline({ delay: 0.3 });

    // Ghost outline fades up
    if (ghostText) {
      introTl.fromTo(ghostText, { opacity: 0, scale: 0.95 }, { opacity: 0.08, scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
    }

    // Product Slot rises from y: 80 with blur and scale
    introTl.fromTo(
      slotWrapper,
      { y: 80, scale: 0.9, filter: 'blur(8px)', opacity: 0 },
      { y: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      0.1
    );

    // Headline lines reveal word by word
    if (h1Line1 && h1Line2) {
      const words1 = splitTextIntoSpans(h1Line1, { type: 'words', maskLines: true });
      const words2 = splitTextIntoSpans(h1Line2, { type: 'words', maskLines: true });

      introTl.fromTo(
        [...words1.words, ...words2.words],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
        0.4
      );
    }

    // CTA and scroll hint fade in
    if (ctaBox && scrollHint) {
      introTl.fromTo([ctaBox, scrollHint], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, 0.8);
    }

    // Chips fade in
    if (chipsBox) {
      const chips = chipsBox.querySelectorAll('.hero-chip-badge');
      introTl.fromTo(chips, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.9);
    }

    // 2. IDLE FLOATING ANIMATION (All devices)
    const floatTween = gsap.to(slotWrapper, {
      y: -10,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.8,
    });

    const mm = gsap.matchMedia();

    // DESKTOP CHOREOGRAPHY (Pinned 300% & Mouse Parallax)
    mm.add('(min-width: 1024px)', () => {
      // Mouse Parallax (quickTo)
      const slotX = gsap.quickTo(slotWrapper, 'x', { duration: 0.8, ease: 'power2.out' });
      const ghostX = ghostText ? gsap.quickTo(ghostText, 'x', { duration: 1.2, ease: 'power2.out' }) : null;

      const handleMouseMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        slotX(normX * 14);
        if (ghostX) ghostX(normX * -28);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Pinned Desktop Timeline
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

      // 0-60%: Slot scales up and rotates slightly
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
        scrollTl.kill();
      };
    });

    // MOBILE TIMELINE (Smooth Unpinned Natural Scroll Scrub)
    mm.add('(max-width: 1023px)', () => {
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      mobileTl.to(slotWrapper, { y: 30, scale: 0.96, ease: 'none' }, 0);
      if (h1Line1 && h1Line2) {
        mobileTl.to([h1Line1, h1Line2], { y: -25, opacity: 0.25, ease: 'none' }, 0);
      }

      return () => mobileTl.kill();
    });

    return () => {
      floatTween.kill();
      introTl.kill();
      mm.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative w-full bg-white select-none">
      {/* Pinned Target Viewport Frame */}
      <div
        ref={pinTargetRef}
        className="hero-pin-target relative w-full min-h-[100dvh] sm:h-screen overflow-hidden flex flex-col items-center justify-between py-6 sm:py-8 lg:py-0 lg:justify-center"
      >
        {/* Layer 1: Huge Ghost Outline "GLASYAN" Background */}
        <div
          ref={ghostTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-melodrama text-[16vw] sm:text-[18vw] font-normal leading-none tracking-[0.06em] uppercase text-transparent whitespace-nowrap will-change-transform"
            style={{
              WebkitTextStroke: '1.5px rgba(0, 140, 149, 0.45)',
            }}
          >
            GLASYAN
          </span>
        </div>

        {/* Layer 2: Concentric Water Ripples */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-5">
          <Ripple ringCount={4} size={280} color="rgba(0, 140, 149, 0.25)" />
        </div>

        {/* Layer 3: Floating Micro-Droplets */}
        <FloatingDroplets count={12} color="#008C95" />

        {/* Layer 4: Centered Product Slot Capsule */}
        <div
          ref={slotWrapperRef}
          className="relative z-10 mt-20 sm:mt-24 lg:mt-36 mb-auto flex flex-col items-center justify-center will-change-transform"
        >
          <ProductSlot size="hero" />
        </div>

        {/* Layer 5: Hero Headlines and Subtitle Text */}
        <div className="absolute inset-x-0 top-[6%] sm:top-[6%] md:top-[6%] flex flex-col items-center text-center px-4 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-mist/80 border border-teal/20 text-teal-deep text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-semibold mb-2 sm:mb-3">
            <Droplets className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal" />
            Pure Alpine Hair Alchemy
          </div>

          <h1
            ref={headlineLine1Ref}
            className="font-melodrama text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-ink tracking-tight will-change-transform"
          >
            BORN FROM WATER.
          </h1>
          <h2
            ref={headlineLine2Ref}
            className="font-melodrama text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-teal tracking-tight mt-0.5 sm:mt-1 will-change-transform"
          >
            MADE FOR RADIANCE.
          </h2>
        </div>

        {/* Layer 6: Orbiting Ingredient Chips (Settles on scroll) */}
        <div
          ref={chipsOrbitRef}
          className="absolute inset-x-0 bottom-[16%] sm:bottom-[15%] flex items-center justify-center gap-2 sm:gap-6 px-3 z-20 pointer-events-none"
        >
          <div className="hero-chip-badge glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-[10px] sm:text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Glacial Deuterium-Free</span>
          </div>
          <div className="hero-chip-badge glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-[10px] sm:text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform">
            <Droplets className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Hydrolyzed Pearl Amino</span>
          </div>
          <div className="hero-chip-badge glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-sans text-ink shadow-sm opacity-0 will-change-transform">
            <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal" />
            <span className="font-medium tracking-wide">Biomimetic Keratin Seal</span>
          </div>
        </div>

        {/* Layer 7: Short Handoff Line (fades in near end of pin) */}
        <p
          ref={handoffLineRef}
          className="absolute bottom-[13%] sm:bottom-[11%] inset-x-0 text-center font-melodrama text-sm sm:text-lg lg:text-xl text-teal-deep opacity-0 tracking-wide pointer-events-none z-20"
        >
          Pure water. Cellular luminescence.
        </p>

        {/* Layer 8: Primary Call To Action */}
        <div ref={ctaBoxRef} className="absolute bottom-[5%] sm:bottom-[5%] z-30 flex flex-col items-center gap-2">
          <Link href="/collections/all">
            <MagneticButton variant="primary" size="md" className="sm:hidden shadow-lg">
              Explore The Rituals
            </MagneticButton>
            <MagneticButton variant="primary" size="lg" className="hidden sm:inline-flex shadow-lg">
              Explore The Rituals
            </MagneticButton>
          </Link>
        </div>

        {/* Layer 9: Scroll Indicator Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-teal-deep/60 text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.24em] pointer-events-none"
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
