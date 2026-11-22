/**
 * GLASYAN Motion System Tokens & Configuration
 * Single source of truth for motion curves, durations, and distances.
 */

export const motionConfig = {
  ease: {
    luxe: "expo.out",
    soft: "power3.out",
    inOut: "expo.inOut",
    scrub: "none",
    glasyan: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  duration: {
    fast: 0.3,
    base: 0.7,
    slow: 1.2,
    cinematic: 1.8,
  },
  stagger: {
    words: 0.06,
    lines: 0.12,
    cards: 0.1,
    chars: 0.03,
  },
  distance: {
    small: 24,
    medium: 60,
    large: 120,
  },
} as const;

/**
 * Check if debug mode is active via URL search param ?motion=debug
 */
export function isMotionDebug(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("motion") === "debug";
}

/**
 * Read global motion speed multiplier (default: 1.0)
 */
export function getMotionSpeed(): number {
  if (typeof window === "undefined") return 1.0;
  const stored = window.sessionStorage.getItem("glasyan_motion_speed");
  return stored ? parseFloat(stored) : 1.0;
}
