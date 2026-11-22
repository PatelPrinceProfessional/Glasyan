import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: 'var(--teal, #008C95)',
          deep: 'var(--teal-deep, #005A61)',
          light: 'var(--aqua-light, #7FC4C9)',
          mist: 'var(--aqua-mist, #E4F2F3)',
        },
        ink: {
          DEFAULT: 'var(--ink, #0A2E32)',
          muted: 'rgba(10, 46, 50, 0.65)',
          faint: 'rgba(10, 46, 50, 0.25)',
        },
        pearl: {
          DEFAULT: 'var(--pearl, #F7FAFA)',
          subtle: '#EEF4F5',
        },
        champagne: {
          DEFAULT: 'var(--champagne, #C8B58F)',
          faint: 'rgba(200, 181, 143, 0.3)',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        melodrama: ['var(--font-melodrama)', 'Didot', 'Bodoni MT', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        satoshi: ['var(--font-satoshi)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        serif: ['var(--font-melodrama)', 'Didot', 'Bodoni MT', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-satoshi)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.2rem, 2.2rem + 5vw, 7.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'display-l': ['clamp(2.4rem, 1.8rem + 3.2vw, 5.2rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-m': ['clamp(1.9rem, 1.4rem + 2.2vw, 3.6rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'headline-1': ['clamp(1.8rem, 1.3rem + 1.8vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'headline-2': ['clamp(1.4rem, 1.15rem + 1.1vw, 2.2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'headline-3': ['clamp(1.15rem, 1.05rem + 0.5vw, 1.6rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-l': ['clamp(1.05rem, 1rem + 0.2vw, 1.25rem)', { lineHeight: '1.65' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-s': ['0.875rem', { lineHeight: '1.5' }],
        'label-caps': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        widest: '0.2em',
        luxurious: '0.24em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
        glasyan: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'glass-subtle': '0 4px 20px -2px rgba(0, 140, 149, 0.06), 0 2px 6px -1px rgba(10, 46, 50, 0.04)',
        'glass-hover': '0 12px 36px -6px rgba(0, 140, 149, 0.14), 0 4px 12px -2px rgba(10, 46, 50, 0.06)',
        'capsule-ambient': '0 24px 48px -12px rgba(0, 90, 97, 0.18), 0 8px 16px -4px rgba(0, 140, 149, 0.08)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'breathe-slow': 'breathe 4s ease-in-out infinite',
        'drift-blob': 'drift 70s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        drift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(80px, -40px) scale(1.12)' },
          '100%': { transform: 'translate(-60px, 30px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
