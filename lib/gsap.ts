'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

// Register standard GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip, Observer);

  // Register the signature Glasyan custom ease curve
  try {
    CustomEase.create('glasyan', '0.22, 1, 0.36, 1');
    CustomEase.create('luxe', '0.16, 1, 0.3, 1');
  } catch {
    // Fallback if already defined or in fast reload
  }

  // Ensure default smooth ticker config
  gsap.config({
    autoSleep: 60,
    force3D: true,
  });
}

/**
 * Robust DrawSVG alternative for standard SVG stroke animation.
 * Animates stroke-dasharray and stroke-dashoffset smoothly without Club GreenSock token.
 */
export function animateDrawSVG(
  target: SVGGeometryElement | SVGGeometryElement[] | string,
  vars: {
    duration?: number;
    delay?: number;
    ease?: string | gsap.EaseFunction;
    from?: number; // 0 to 100
    to?: number;   // 0 to 100
    onComplete?: () => void;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  if (typeof window === 'undefined') return null;

  const elements = typeof target === 'string'
    ? (Array.from(document.querySelectorAll(target)) as SVGGeometryElement[])
    : Array.isArray(target)
    ? target
    : [target];

  const { duration = 1.2, delay = 0, ease = 'expo.out', from = 0, to = 100, onComplete, scrollTrigger } = vars;

  elements.forEach((el) => {
    if (!el || typeof el.getTotalLength !== 'function') return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length} ${length}`;

    const startOffset = length * (1 - from / 100);
    const endOffset = length * (1 - to / 100);

    el.style.strokeDashoffset = `${startOffset}`;

    gsap.to(el, {
      strokeDashoffset: endOffset,
      duration,
      delay,
      ease,
      onComplete,
      scrollTrigger,
    });
  });
}

/**
 * Split text utility that wraps words, lines, or characters in overflow-hidden spans.
 * Works seamlessly with zero external plugins.
 */
export function splitTextIntoSpans(
  element: HTMLElement,
  options: { type?: 'words' | 'lines' | 'chars'; maskLines?: boolean } = {}
) {
  if (!element) return { words: [], chars: [], lines: [], revert: () => {} };

  const originalHTML = element.innerHTML;
  const rawText = element.innerText;
  const { type = 'words', maskLines = true } = options;

  if (type === 'chars') {
    const chars = rawText.split('');
    element.innerHTML = chars
      .map(
        (char) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block char-item">${
            char === ' ' ? '&nbsp;' : char
          }</span></span>`
      )
      .join('');
    const charElements = Array.from(element.querySelectorAll('.char-item')) as HTMLElement[];
    return {
      chars: charElements,
      words: [],
      lines: [],
      revert: () => {
        element.innerHTML = originalHTML;
      },
    };
  }

  // Words mode (default)
  const words = rawText.trim().split(/\s+/);
  element.innerHTML = words
    .map((word, index) => {
      const isLast = index === words.length - 1;
      const marginStyle = isLast ? '' : 'style="margin-right: 0.32em;"';
      const inner = `<span class="inline-block word-item will-change-transform">${word}</span>`;
      return maskLines
        ? `<span class="inline-block overflow-hidden align-top line-mask" ${marginStyle}>${inner}</span>`
        : `<span class="inline-block" ${marginStyle}>${inner}</span>`;
    })
    .join(' ');

  const wordElements = Array.from(element.querySelectorAll('.word-item')) as HTMLElement[];
  const maskElements = Array.from(element.querySelectorAll('.line-mask')) as HTMLElement[];

  return {
    words: wordElements,
    lines: maskElements,
    chars: [],
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}

export { gsap, ScrollTrigger, CustomEase, Flip, Observer };
