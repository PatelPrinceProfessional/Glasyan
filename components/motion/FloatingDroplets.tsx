'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface DropletConfig {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  blur: number;
  opacity: number;
}

interface FloatingDropletsProps {
  count?: number;
  className?: string;
  color?: string;
}

/**
 * FloatingDroplets Component
 * 8-14 tiny teal/aqua droplet shapes drifting upward and sideways
 * with randomized durations, depths, and blur levels. Pauses off-screen.
 */
export function FloatingDroplets({
  count = 12,
  className = '',
  color = '#008C95',
}: FloatingDropletsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const droplets = container.querySelectorAll('.floating-droplet-item');

    const ctx = gsap.context(() => {
      droplets.forEach((drop) => {
        const dur = gsap.utils.random(5.5, 9.5);
        const yDist = gsap.utils.random(-80, -160);
        const xDist = gsap.utils.random(-35, 35);

        gsap.to(drop, {
          y: yDist,
          x: `+=${xDist}`,
          rotation: gsap.utils.random(-25, 25),
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3),
        });
      });

      // Pause when offscreen using ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            droplets.forEach((d) => {
              const tween = gsap.getTweensOf(d)[0];
              if (tween) {
                if (self.isActive) tween.play();
                else tween.pause();
              }
            });
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, [count]);

  const dropletData: DropletConfig[] = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: (i * 8.5 + (i % 3) * 5) % 95 + 2,
      y: (i * 12 + 15) % 85 + 5,
      size: 6 + (i % 5) * 3,
      duration: 6 + (i % 4) * 1.5,
      delay: (i % 3) * 0.8,
      driftX: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 10)),
      blur: (i % 3 === 0 ? 1 : 0),
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`floating-droplets-container absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dropletData.map((d, index) => (
        <div
          key={index}
          className="floating-droplet-item absolute will-change-transform"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size * 1.3}px`,
            opacity: d.opacity,
            filter: d.blur > 0 ? `blur(${d.blur}px)` : 'none',
          }}
        >
          <svg viewBox="0 0 20 26" fill="none" className="w-full h-full">
            <path
              d="M10 1 C10 1, 2 12, 2 17 C2 21.418 5.582 25 10 25 C14.418 25 18 21.418 18 17 C18 12, 10 1, 10 1 Z"
              fill={color}
              opacity="0.8"
            />
            <path
              d="M6 14 C5 16, 5 18, 6 20"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
