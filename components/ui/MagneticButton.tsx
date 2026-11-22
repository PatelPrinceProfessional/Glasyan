'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magneticRadius?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * MagneticButton Component
 * Section 5.4: Magnetic button with directional sweep fill on hover
 * Elements pull toward cursor within magneticRadius using gsap.quickTo.
 */
export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  magneticRadius = 70,
  className = '',
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

    const contentXTo = contentRef.current ? gsap.quickTo(contentRef.current, 'x', { duration: 0.4, ease: 'power3.out' }) : null;
    const contentYTo = contentRef.current ? gsap.quickTo(contentRef.current, 'y', { duration: 0.4, ease: 'power3.out' }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < magneticRadius) {
        const pullX = (e.clientX - centerX) * 0.32;
        const pullY = (e.clientY - centerY) * 0.32;
        xTo(pullX);
        yTo(pullY);
        if (contentXTo) contentXTo(pullX * 0.4);
        if (contentYTo) contentYTo(pullY * 0.4);
      } else {
        xTo(0);
        yTo(0);
        if (contentXTo) contentXTo(0);
        if (contentYTo) contentYTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (contentXTo) contentXTo(0);
      if (contentYTo) contentYTo(0);
    };

    // Directional sweep entry and leave
    const handleMouseEnter = (e: MouseEvent) => {
      if (!fillRef.current) return;
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      fillRef.current.style.left = `${relX}px`;
      fillRef.current.style.top = `${relY}px`;
      fillRef.current.style.transform = 'translate(-50%, -50%) scale(0)';

      gsap.to(fillRef.current, {
        scale: 2.8,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleSweepLeave = (e: MouseEvent) => {
      if (!fillRef.current) return;
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      gsap.to(fillRef.current, {
        left: relX,
        top: relY,
        scale: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleSweepLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleSweepLeave);
    };
  }, [magneticRadius]);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-widest',
    md: 'px-7 py-3.5 text-xs sm:text-sm tracking-widest',
    lg: 'px-9 py-4 text-sm sm:text-base tracking-widest',
  };

  const variantClasses = {
    primary: 'bg-teal text-white border-transparent hover:text-ink',
    secondary: 'bg-pearl text-ink border border-teal/20 hover:text-white',
    outline: 'bg-transparent text-ink border border-teal/40 hover:text-white',
    ghost: 'bg-transparent text-teal-deep hover:bg-teal-mist/50',
  };

  const fillColors = {
    primary: 'bg-white',
    secondary: 'bg-teal',
    outline: 'bg-teal',
    ghost: 'bg-teal-mist',
  };

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center font-sans uppercase font-medium rounded-full overflow-hidden transition-colors duration-300 select-none will-change-transform ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Directional sweep ripple layer */}
      <span
        ref={fillRef}
        className={`absolute rounded-full pointer-events-none w-32 h-32 -translate-x-1/2 -translate-y-1/2 scale-0 z-0 ${fillColors[variant]}`}
      />
      <span ref={contentRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
}
