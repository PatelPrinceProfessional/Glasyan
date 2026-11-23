'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface LoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

/**
 * Loader Component
 * Section 6.0: Master Pre-loader Ceremony
 * 1. Droplet outline draws with DrawSVG (0.7s), then fills with signature teal (0.35s).
 * 2. Gravitational plunge towards alpine pool with vertical elongation (0.45s power2.in).
 * 3. Fluid impact: droplet squashes, splash beads scatter, and 3 concentric ellipses ripple outward.
 * 4. Alpine horizon wave line draws across while "GLASYAN" letters rise out of overflow masks.
 * 5. Luxury submark reveals: "HIGH ALPINE HAIR ALCHEMY • EST. 2026".
 * 6. Smooth tabular counter 00 -> 100 synchronized with hairline progress track.
 * 7. Hold 0.25s, then white curtain lifts with clip-path (1.1s expo.inOut) triggering the Hero intro.
 */
export function Loader({ onComplete, forceShow = false }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dropPathRef = useRef<SVGPathElement>(null);
  const dropGroupRef = useRef<SVGGElement>(null);
  const rippleBoxRef = useRef<SVGGElement>(null);
  const splashGroupRef = useRef<SVGGElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const overlay = overlayRef.current;
    const dropPath = dropPathRef.current;
    const dropGroup = dropGroupRef.current;
    const rippleBox = rippleBoxRef.current;
    const splashGroup = splashGroupRef.current;
    const wavePath = wavePathRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    const progressBar = progressBarRef.current;
    const countEl = countRef.current;

    if (!overlay || !dropPath || !dropGroup) return;

    // Check query params and session state
    const params = new URLSearchParams(window.location.search);
    const forceParam = params.get('loader') === '1' || params.get('loader') === 'true' || params.get('replay') === '1';
    const isDev = process.env.NODE_ENV === 'development';
    const hasVisited = window.sessionStorage.getItem('glasyan_has_visited');

    // In production, skip for returning visitors. In dev mode, always display unless ?loader=0 is passed
    const shouldSkip = hasVisited && !forceShow && !forceParam && (!isDev || params.get('loader') === '0');

    if (shouldSkip) {
      overlay.style.display = 'none';
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
      return;
    }

    // Lock scroll during loader animation
    document.body.style.overflow = 'hidden';

    // Measure SVG stroke lengths
    const dropLength = dropPath.getTotalLength ? dropPath.getTotalLength() : 130;
    dropPath.style.strokeDasharray = `${dropLength} ${dropLength}`;
    dropPath.style.strokeDashoffset = `${dropLength}`;

    const waveLength = wavePath && wavePath.getTotalLength ? wavePath.getTotalLength() : 180;
    if (wavePath) {
      wavePath.style.strokeDasharray = `${waveLength} ${waveLength}`;
      wavePath.style.strokeDashoffset = `${waveLength}`;
    }

    const counterObj = { value: 0 };
    const letters = wordmark ? wordmark.querySelectorAll('.loader-letter') : [];
    const rippleEllipses = rippleBox ? rippleBox.querySelectorAll('.loader-ripple-ellipse') : [];

    // Master Timeline
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        window.sessionStorage.setItem('glasyan_has_visited', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
          if (overlay) overlay.style.display = 'none';
          setIsVisible(false);
        }, 200);
      },
    });

    // 1. Droplet outline draws (0.7s), then fills teal (0.35s)
    tl.to(dropPath, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.out',
    })
      .to(
        dropPath,
        {
          fill: '#008C95',
          duration: 0.35,
          ease: 'power1.inOut',
        },
        '-=0.2'
      )
      // 2. Gravitational plunge towards water line (y = 114)
      .to(dropGroup, {
        y: 78,
        scaleY: 1.25,
        scaleX: 0.85,
        duration: 0.44,
        ease: 'power2.in',
      })
      // 3. Impact squash and dissolve
      .to(dropGroup, {
        scaleY: 0.22,
        scaleX: 1.6,
        opacity: 0,
        duration: 0.1,
        ease: 'power3.out',
      });

    // Splash beads scatter on impact
    if (splashGroup) {
      tl.fromTo(
        splashGroup,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.2, duration: 0.15, ease: 'power2.out' },
        '-=0.08'
      ).to(
        splashGroup,
        { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' },
        '-=0.05'
      );
    }

    // Ripples expand from impact point
    if (rippleEllipses.length > 0) {
      tl.fromTo(
        rippleEllipses,
        { scale: 0.1, opacity: 0.85 },
        {
          scale: 4.2,
          opacity: 0,
          duration: 1.2,
          stagger: 0.14,
          ease: 'power2.out',
        },
        '-=0.38'
      );
    }

    // 4. Wave path draws across & wordmark letters rise
    if (wavePath) {
      tl.to(
        wavePath,
        {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'expo.out',
        },
        '-=1.0'
      );
    }

    if (letters.length > 0) {
      tl.fromTo(
        letters,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.9'
      );
    }

    // 5. Luxury submark tagline fades up
    if (tagline) {
      tl.fromTo(
        tagline,
        { opacity: 0, y: 10, letterSpacing: '0.24em' },
        { opacity: 1, y: 0, letterSpacing: '0.34em', duration: 0.65, ease: 'power2.out' },
        '-=0.55'
      );
    }

    // 6. Progress counter 00 to 100 & progress hairline
    if (countEl) {
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            countEl.innerText = Math.round(counterObj.value).toString().padStart(2, '0');
          },
        },
        0.3
      );
    }

    if (progressBar) {
      tl.to(
        progressBar,
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'power2.out',
        },
        0.3
      );
    }

    // Trigger onComplete callback right as curtain begins lifting so Hero blossoms
    tl.call(() => {
      if (onComplete) onComplete();
    }, undefined, '+=0.25');

    // 7. Curtain lifts with cinematic clip-path inset
    tl.to(overlay, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.05,
      ease: 'expo.inOut',
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete, forceShow]);

  if (!isVisible) return null;

  const brandName = 'GLASYAN';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-[#FAF9F5] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ clipPath: 'inset(0% 0% 0% 0%)', willChange: 'clip-path' }}
      aria-label="Glasyan Site Loader"
    >
      {/* Ambient soft glow aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none opacity-45 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(127, 196, 201, 0.4) 0%, rgba(200, 181, 143, 0.18) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Droplet, Splash & Wave SVG */}
        <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex items-center justify-center">
          <svg viewBox="0 0 160 180" fill="none" className="w-full h-full overflow-visible">
            {/* Falling Droplet Group */}
            <g ref={dropGroupRef} transform="translate(80, 24)">
              <path
                ref={dropPathRef}
                d="M0,-24 C0,-24 -18,-2 -18,12 C-18,22 -10,30 0,30 C10,30 18,22 18,12 C18,-2 0,-24 0,-24 Z"
                fill="transparent"
                stroke="#008C95"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Concentric Impact Ripple Ellipses */}
            <g ref={rippleBoxRef}>
              <ellipse
                className="loader-ripple-ellipse"
                cx="80"
                cy="114"
                rx="8"
                ry="3"
                stroke="#008C95"
                strokeWidth="1.8"
                fill="none"
                opacity="0"
              />
              <ellipse
                className="loader-ripple-ellipse"
                cx="80"
                cy="114"
                rx="8"
                ry="3"
                stroke="#7FC4C9"
                strokeWidth="1.4"
                fill="none"
                opacity="0"
              />
              <ellipse
                className="loader-ripple-ellipse"
                cx="80"
                cy="114"
                rx="8"
                ry="3"
                stroke="#C8B58F"
                strokeWidth="1.2"
                fill="none"
                opacity="0"
              />
            </g>

            {/* Micro Splash Beads */}
            <g ref={splashGroupRef} opacity="0">
              <circle cx="72" cy="110" r="2" fill="#008C95" />
              <circle cx="88" cy="110" r="2.2" fill="#7FC4C9" />
              <circle cx="80" cy="106" r="1.8" fill="#008C95" />
            </g>

            {/* Alpine Horizon Water Line */}
            <path
              ref={wavePathRef}
              d="M10,114 C35,108 55,120 80,114 C105,108 125,120 150,114"
              stroke="#7FC4C9"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Wordmark Letters Rising from Overflow Mask */}
        <div ref={wordmarkRef} className="flex overflow-hidden py-1.5 mt-2">
          {brandName.split('').map((char, index) => (
            <span
              key={index}
              className="loader-letter inline-block font-melodrama text-3xl sm:text-4xl lg:text-5xl font-normal text-ink tracking-[0.24em] will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Luxury Submark Tagline */}
        <div
          ref={taglineRef}
          className="mt-2.5 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-semibold text-teal opacity-0 will-change-transform"
        >
          High Alpine Hair Alchemy &bull; Est. 2026
        </div>

        {/* Loading Progress Hairline Track & Numerals */}
        <div className="mt-7 flex flex-col items-center gap-2">
          <div className="w-36 sm:w-44 h-[2px] bg-teal/15 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-teal w-full origin-left scale-x-0 will-change-transform"
            />
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              ref={countRef}
              className="font-sans text-xs font-semibold tracking-widest text-teal tabular-nums"
            >
              00
            </span>
            <span className="text-[10px] font-sans font-medium text-ink/40 tracking-wider">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
