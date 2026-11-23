'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { assets } from '@/assets.config';

// Dynamic import with SSR disabled for Three.js WebGL to ensure zero server-client bundle desync
const Product3D = dynamic(
  () => import('./Product3D').then((mod) => mod.Product3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-28 rounded-full bg-teal-mist/40 animate-pulse blur-sm" />
      </div>
    ),
  }
);

interface ProductSlotProps {
  imageSrc?: string;
  alt?: string;
  type?: 'placeholder' | 'image' | 'video' | '3d';
  className?: string;
  aspectRatio?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
  interactive?: boolean;
  enableDrag?: boolean;
}

/**
 * ProductSlot Component
 * Renders:
 * - '3d': High-end interactive procedural 3D glass elixir bottle with "GLASYAN" label
 * - 'placeholder': Neutral soft-edged archetype glass capsule
 * - 'image': Real transparent PNG/WebP bottle shot
 * All animations target the outer wrapper element!
 */
export function ProductSlot({
  imageSrc,
  alt = 'Glasyan Archetype Elixir Capsule',
  type,
  className = '',
  size = 'hero',
  showLabel = true,
  interactive = true,
  enableDrag = true,
}: ProductSlotProps) {
  const activeType = type || assets.heroProduct.type || '3d';

  const sizeClasses = {
    sm: 'w-[120px] sm:w-[130px] h-[160px] sm:h-[180px]',
    md: 'w-[150px] sm:w-[170px] h-[210px] sm:h-[240px]',
    lg: 'w-[180px] sm:w-[220px] h-[250px] sm:h-[310px]',
    hero: 'w-[200px] sm:w-[230px] md:w-[250px] h-[280px] sm:h-[320px] md:h-[350px]',
  };

  // 1. Interactive 3D Luxury Glass Bottle Mode
  if (activeType === '3d') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <Product3D
          size={size}
          interactive={interactive}
          enableDrag={enableDrag}
          className={sizeClasses[size]}
        />
      </div>
    );
  }

  // 2. Static Transparent Image Mode
  if (activeType === 'image' && imageSrc) {
    return (
      <div className={`relative flex items-center justify-center select-none pointer-events-none ${sizeClasses[size]} ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>
    );
  }

  // Neutral Archetype Capsule Placeholder (No bottle shape)
  return (
    <div
      className={`product-slot-inner relative flex flex-col items-center justify-center rounded-[9999px] glass-capsule overflow-hidden select-none transition-shadow duration-500 ${sizeClasses[size]} ${className}`}
      data-product-slot="placeholder"
    >
      {/* Dynamic Glass Specular Light Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[9999px] opacity-75"
        style={{
          background: 'radial-gradient(ellipse 70% 45% at 28% 22%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 65%)',
        }}
      />

      {/* Internal Water Gradient Volume */}
      <div 
        className="absolute inset-2 sm:inset-3 rounded-[9999px] opacity-90 overflow-hidden"
        style={{
          background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 250, 0.8) 35%, rgba(228, 242, 243, 0.7) 65%, rgba(127, 196, 201, 0.45) 100%)',
        }}
      >
        {/* Soft Internal Meniscus Contour */}
        <div 
          className="absolute bottom-0 inset-x-0 h-2/5 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 100% 70% at 50% 100%, rgba(0, 140, 149, 0.3) 0%, rgba(0, 140, 149, 0) 75%)',
          }}
        />

        {/* Faint Internal Rising Droplet Micro-Ring */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-teal-light/30 opacity-60" />
      </div>

      {/* Outer Subtle Glass Rim Reflection */}
      <div className="absolute inset-0 rounded-[9999px] border border-white/60 pointer-events-none" />

      {/* Minimalist Archetype Label */}
      {showLabel && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <div className="w-5 h-5 mb-3 text-teal flex items-center justify-center opacity-85">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M12 2.5 C12 2.5, 4.5 13, 4.5 17 C4.5 21.14 7.86 24.5 12 24.5 C16.14 24.5 19.5 21.14 19.5 17 C19.5 13, 12 2.5, 12 2.5 Z" />
            </svg>
          </div>
          <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.28em] uppercase text-teal-deep opacity-80">
            PRODUCT
          </span>
          <span className="font-melodrama text-[13px] sm:text-[15px] font-normal tracking-[0.14em] text-ink/70 mt-1">
            Glasyan Elixir
          </span>
        </div>
      )}

      {/* Subtle Base Ground Shadow Anchor */}
      <div className="absolute -bottom-6 inset-x-8 h-6 bg-teal-deep/15 blur-xl rounded-full pointer-events-none -z-10" />
    </div>
  );
}
