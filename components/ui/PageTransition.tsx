'use client';

import React, { createContext, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';

interface TransitionContextType {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

/**
 * PageTransition Component
 * Section 5.6: Teal wave overlay (SVG, owned by GSAP) sweeps up covering the screen
 * (0.8s expo.inOut), the route transitions, and the wave exits upward revealing the new page.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (href: string) => {
    const overlay = overlayRef.current;
    const wave = wavePathRef.current;
    if (!overlay || !wave || isTransitioning) {
      router.push(href);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
        // Exit wave upward
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.75,
          delay: 0.15,
          ease: 'expo.inOut',
          onComplete: () => {
            gsap.set(overlay, { yPercent: 100 });
            setIsTransitioning(false);
          },
        });
      },
    });

    // Wave sweeps in from bottom
    tl.set(overlay, { yPercent: 100, display: 'block' })
      .to(overlay, {
        yPercent: 0,
        duration: 0.75,
        ease: 'expo.inOut',
      });
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      {/* Teal Wave Transition Curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9990] bg-teal pointer-events-none flex flex-col justify-end translate-y-full"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-36 -translate-y-full"
        >
          <path
            ref={wavePathRef}
            d="M0,80 C360,180 720,0 1080,120 C1260,180 1380,60 1440,90 L1440,240 L0,240 Z"
            fill="#008C95"
          />
        </svg>

        {/* Center Minimal Logo Accent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="font-melodrama text-3xl sm:text-4xl text-white tracking-[0.2em]">
              GLASYAN
            </span>
            <span className="font-sans text-[10px] text-teal-mist tracking-[0.35em] mt-2 uppercase">
              Alpine Purity
            </span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

/**
 * TransitionLink Component
 * Uses PageTransition wave overlay instead of abrupt default jump.
 */
export function TransitionLink({
  href,
  children,
  className = '',
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      navigateTo(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
