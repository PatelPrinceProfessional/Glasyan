'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counter Component
 * Melodrama numerals that count up on scroll enter.
 */
export function Counter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: CounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(decimals > 0 ? parseFloat(obj.val.toFixed(decimals)) : Math.round(obj.val));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, decimals]);

  return (
    <span ref={countRef} className={`font-melodrama font-normal tabular-nums will-change-contents ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
