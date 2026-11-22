'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, Observer } from '@/lib/gsap';

interface MarqueeProps {
  items?: string[];
  speed?: number; // base speed
  reverse?: boolean;
  className?: string;
  outlineAlternate?: boolean;
}

/**
 * Marquee Component
 * Infinite horizontal loop whose speed and direction dynamically react to scroll velocity.
 */
export function Marquee({
  items = ['PURE', 'RADIANT', 'HYDRATED', 'LUXURIOUS', 'CELLULAR', 'TIMELESS'],
  speed = 1.2,
  reverse = false,
  className = '',
  outlineAlternate = true,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let currentX = 0;
    let velocityMultiplier = 1;
    let direction = reverse ? -1 : 1;

    // Listen to scroll velocity using GSAP Observer
    const obs = Observer.create({
      type: 'scroll,wheel,touch',
      onChange: (self) => {
        const vel = Math.abs(self.velocityY);
        velocityMultiplier = Math.min(4.5, 1 + vel * 0.0035);
        if (self.velocityY > 0) {
          direction = reverse ? -1 : 1;
        } else if (self.velocityY < 0) {
          direction = reverse ? 1 : -1;
        }
      },
    });

    const ticker = () => {
      // Ease velocity back toward 1
      velocityMultiplier += (1 - velocityMultiplier) * 0.05;
      currentX += speed * direction * velocityMultiplier;

      // Wrap around seamlessly
      const halfWidth = track.scrollWidth / 2;
      if (currentX > 0) {
        currentX = -halfWidth;
      } else if (Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      }

      gsap.set(track, { x: currentX });
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      obs.kill();
    };
  }, [speed, reverse]);

  // Duplicate items 4 times for endless horizontal wrapping
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-container overflow-hidden w-full select-none py-6 ${className}`}>
      <div ref={trackRef} className="marquee-track flex whitespace-nowrap will-change-transform">
        {repeated.map((word, i) => {
          const isOutline = outlineAlternate && i % 2 === 1;
          return (
            <div key={i} className="inline-flex items-center mx-6 sm:mx-10">
              <span
                className={`font-melodrama text-3xl sm:text-5xl md:text-7xl font-normal tracking-[0.08em] uppercase transition-colors duration-300 ${
                  isOutline
                    ? 'text-transparent stroke-teal'
                    : 'text-ink'
                }`}
                style={
                  isOutline
                    ? {
                        WebkitTextStroke: '1px #008C95',
                        color: 'transparent',
                      }
                    : {}
                }
              >
                {word}
              </span>
              <span className="ml-8 sm:ml-12 w-2 h-2 rounded-full bg-teal/40" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
