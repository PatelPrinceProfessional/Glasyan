'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'wordmark';
  color?: string;
  accentColor?: string;
  textColor?: string;
  height?: number;
}

/**
 * Logo Component
 * Inlines an SVG with three required groups:
 * - #drop (droplet symbol)
 * - #wave (fluid wave swoosh)
 * - #wordmark ("GLASYAN" brand wordmark)
 * Animations across the site target these IDs.
 */
export function Logo({
  className = '',
  variant = 'full',
  color = '#008C95',
  accentColor = '#7FC4C9',
  textColor = '#0A2E32',
  height = 38,
}: LogoProps) {
  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: 'auto' }}
        className={`glasyan-logo-symbol ${className}`}
        aria-label="Glasyan Emblem"
      >
        <defs>
          <linearGradient id="dropGradSymbol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8B3" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <g id="drop">
          <path
            d="M22 3 C22 3, 7 21, 7 30 C7 38.284 13.716 45 22 45 C30.284 45 37 38.284 37 30 C37 21, 22 3, 22 3 Z"
            fill="url(#dropGradSymbol)"
            stroke="#005A61"
            strokeWidth="1.2"
          />
          <path
            d="M16 21 C14 24, 13 28, 13 32 C13 35, 15 39, 18 40"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>
        <g id="wave" transform="translate(4, 38)">
          <path
            d="M0 4 C10 0, 18 8, 28 3 C34 0, 40 6, 46 2"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: `${height}px`, width: 'auto' }}
      className={`glasyan-logo-full select-none ${className}`}
      aria-label="Glasyan Logo"
    >
      <defs>
        <linearGradient id="dropGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A8B3" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient id="waveGradMain" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="50%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#005A61" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Droplet group */}
      <g id="drop" transform="translate(18, 12)">
        <path
          d="M14 2 C14 2, 2 18, 2 26 C2 33.732 8.268 40 16 40 C23.732 40 30 33.732 30 26 C30 18, 18 2, 14 2 Z"
          fill="url(#dropGradMain)"
          stroke="#005A61"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="logo-drop-path"
        />
        <path
          d="M10 18 C8 21, 7 24, 7 28 C7 31, 9 34, 12 35"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.65"
        />
      </g>

      {/* Wave group */}
      <g id="wave" transform="translate(6, 46)">
        <path
          d="M0 14 C12 6, 26 22, 42 12 C52 6, 56 16, 68 10 C74 7, 82 18, 92 12"
          stroke="url(#waveGradMain)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          className="logo-wave-path"
        />
        <path
          d="M10 18 C22 12, 34 26, 48 16 C58 9, 66 18, 78 12"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.5"
          fill="none"
        />
      </g>

      {/* Wordmark group */}
      <g id="wordmark" transform="translate(68, 48)">
        <text
          x="0"
          y="0"
          fontFamily="'Melodrama', 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif"
          fontSize="36"
          fontWeight="500"
          letterSpacing="0.08em"
          fill={textColor}
          className="logo-wordmark-text"
        >
          GLASYAN
        </text>
        <text
          x="2"
          y="14"
          fontFamily="'Satoshi', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
          fontSize="7.5"
          fontWeight="500"
          letterSpacing="0.32em"
          fill={color}
          className="logo-submark-text"
        >
          HAIR ESSENCE &amp; ALCHEMY
        </text>
      </g>
    </svg>
  );
}
