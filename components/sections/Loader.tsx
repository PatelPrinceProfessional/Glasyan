'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface LoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

/**
 * Loader Component
 * Section 6.0: First-visit loader per session
 * 1. Droplet outline draws (0.8s), then fills teal (0.4s).
 * 2. Droplet falls 120px into pool, then 3 ripple rings expand from impact point.
 * 3. Wave path draws across while wordmark letters rise out of overflow masks.
 * 4. Small teal progress number counts 0 to 100.
 * 5. Hold 0.3s, then white loader curtain lifts (clip-path inset top to bottom).
 * Unlocks scroll and starts hero intro.
 */
export function Loader({ onComplete, forceShow = false }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dropPathRef = useRef<SVGPathElement>(null);
  const dropGroupRef = useRef<SVGGElement>(null);
  const rippleBoxRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const overlay = overlayRef.current;
    const dropPath = dropPathRef.current;
    const dropGroup = dropGroupRef.current;
    const rippleBox = rippleBoxRef.current;
    const wavePath = wavePathRef.current;
    const wordmark = wordmarkRef.current;
    const countEl = countRef.current;

    if (!overlay || !dropPath || !dropGroup) return;

    // Check if user visited already or if force query param is present
    const params = new URLSearchParams(window.location.search);
    const forceParam = params.get('loader') === '1' || params.get('loader') === 'true' || params.get('replay') === '1';
    const hasVisited = window.sessionStorage.getItem('glasyan_has_visited');

    if (hasVisited && !forceShow && !forceParam) {
      // Immediately dismiss for returning visitors
      overlay.style.display = 'none';
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
      return;
    }

    // Lock scroll during intro animation
    document.body.style.overflow = 'hidden';

    // Measure SVG stroke lengths
    const dropLength = dropPath.getTotalLength ? dropPath.getTotalLength() : 140;
    dropPath.style.strokeDasharray = `${dropLength} ${dropLength}`;
    dropPath.style.strokeDashoffset = `${dropLength}`;

    const waveLength = wavePath && wavePath.getTotalLength ? wavePath.getTotalLength() : 220;
    if (wavePath) {
      wavePath.style.strokeDasharray = `${waveLength} ${waveLength}`;
      wavePath.style.strokeDashoffset = `${waveLength}`;
    }

    const counterObj = { value: 0 };
    const letters = wordmark ? wordmark.querySelectorAll('.loader-letter') : [];

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        window.sessionStorage.setItem('glasyan_has_visited', 'true');
        document.body.style.overflow = '';
        if (onComplete) onComplete();
        setTimeout(() => {
          if (overlay) overlay.style.display = 'none';
          setIsVisible(false);
        }, 300);
      },
    });

    // 1. Droplet outline draws (0.8s), then fills teal (0.4s)
    tl.to(dropPath, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        dropPath,
        {
          fill: '#008C95',
          duration: 0.4,
          ease: 'power1.inOut',
        },
        '-=0.2'
      )
      // 2. Droplet falls 120px into pool
      .to(dropGroup, {
        y: 110,
        scaleY: 1.18,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(dropGroup, {
        scaleY: 0.6,
        scaleX: 1.4,
        opacity: 0,
        duration: 0.16,
        ease: 'power3.out',
      });

    // Ripples trigger immediately upon droplet impact
    if (rippleBox) {
      const rings = rippleBox.querySelectorAll('.loader-ripple-ring');
      tl.fromTo(
        rings,
        { scale: 0.1, opacity: 0.85 },
        {
          scale: 3.8,
          opacity: 0,
          duration: 1.15,
          stagger: 0.14,
          ease: 'power2.out',
        },
        '-=0.18'
      );
    }

    // 3. Wave path draws across (0.9s expo.out) & wordmark letters rise
    if (wavePath) {
      tl.to(
        wavePath,
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'expo.out',
        },
        '-=0.8'
      );
    }

    if (letters.length > 0) {
      tl.fromTo(
        letters,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.85'
      );
    }

    // 4. Progress counter 0 to 100
    if (countEl) {
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.25,
          ease: 'power2.out',
          onUpdate: () => {
            countEl.innerText = Math.round(counterObj.value).toString().padStart(2, '0');
          },
        },
        0.2
      );
    }

    // 5. Hold 0.3s, then white curtain lifts (clip-path inset top to bottom, 1s expo.inOut)
    tl.to({}, { duration: 0.35 }).to(overlay, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.0,
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
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center select-none"
      style={{ clipPath: 'inset(0% 0% 0% 0%)', willChange: 'clip-path' }}
      aria-label="Glasyan Site Loader"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Droplet and Wave SVG */}
        <div className="relative w-36 h-48 flex items-center justify-center">
          <svg viewBox="0 0 100 140" fill="none" className="w-full h-full overflow-visible">
            {/* Falling Droplet Group */}
            <g ref={dropGroupRef} transform="translate(36, 10)">
              <path
                ref={dropPathRef}
                d="M14 2 C14 2, 2 18, 2 26 C2 33.732 8.268 40 16 40 C23.732 40 30 33.732 30 26 C30 18, 18 2, 14 2 Z"
                fill="transparent"
                stroke="#008C95"
                strokeWidth="2"
              />
            </g>

            {/* Impact Wave Line */}
            <path
              ref={wavePathRef}
              d="M0,120 C25,112 40,128 55,120 C70,112 85,128 100,120"
              stroke="#7FC4C9"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Impact Ripple Rings */}
          <div
            ref={rippleBoxRef}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none flex items-center justify-center"
          >
            <div className="loader-ripple-ring absolute inset-0 rounded-full border border-teal opacity-0" />
            <div className="loader-ripple-ring absolute inset-0 rounded-full border border-teal/70 opacity-0" />
            <div className="loader-ripple-ring absolute inset-0 rounded-full border border-teal/40 opacity-0" />
          </div>
        </div>

        {/* Wordmark Letters Rising from Overflow Mask */}
        <div ref={wordmarkRef} className="flex overflow-hidden py-1 mt-2">
          {brandName.split('').map((char, index) => (
            <span
              key={index}
              className="loader-letter inline-block font-melodrama text-3xl sm:text-4xl font-normal text-ink tracking-[0.24em] will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Loading Progress Numerals */}
        <div className="mt-6 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-teal/30" />
          <span
            ref={countRef}
            className="font-sans text-xs font-semibold tracking-widest text-teal tabular-nums"
          >
            00
          </span>
          <span className="w-8 h-[1px] bg-teal/30" />
        </div>
      </div>
    </div>
  );
}
