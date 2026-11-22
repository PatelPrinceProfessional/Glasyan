'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { Logo } from '@/components/ui/Logo';
import { ArrowUpRight } from 'lucide-react';

/**
 * Footer Component
 * Section 6.12:
 * - Sticky reveal / parallax lift from behind previous section
 * - Giant "GLASYAN" wordmark at bottom drawing in letter-by-letter
 * - Newsletter signup, refined navigation columns, and draw-underline hover
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const giantWordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = giantWordmarkRef.current;
    if (!footer || !wordmark) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const letters = wordmark.querySelectorAll('.giant-footer-letter');

    const ctx = gsap.context(() => {
      // Parallax lift effect
      gsap.fromTo(
        footer,
        { yPercent: -15 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );

      // Letter-by-letter draw/rise in
      gsap.fromTo(
        letters,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 0.12,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const navColumns = [
    {
      title: 'Ceremonies',
      links: [
        { label: 'Glacier Shampoo', href: '/products/glacier-hydration-shampoo' },
        { label: 'Marine Conditioner', href: '/products/marine-silk-conditioner' },
        { label: 'Pearl Scalp Serum', href: '/products/pearl-peptide-scalp-serum' },
        { label: 'Rose Glossing Elixir', href: '/products/rose-hydrosol-glossing-elixir' },
        { label: 'Grand Discovery Set', href: '/products/grand-discovery-ritual-set' },
      ],
    },
    {
      title: 'The House',
      links: [
        { label: 'Philosophy & Story', href: '/story' },
        { label: 'Glacial Sourcing', href: '/#ingredients' },
        { label: 'Biomimetic Science', href: '/#rituals' },
        { label: 'Motion Laboratory', href: '/lab' },
        { label: 'Sustainability Accord', href: '/story' },
      ],
    },
    {
      title: 'Concierge',
      links: [
        { label: 'Ritual Consultations', href: '#' },
        { label: 'Complimentary Shipping', href: '#' },
        { label: 'Order Inquiries', href: '#' },
        { label: 'Bespoke Press Inquiries', href: '#' },
        { label: 'Terms & Privacy', href: '#' },
      ],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="footer-section relative w-full bg-white border-t border-teal/15 pt-24 pb-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-teal/10">
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-5 space-y-6">
            <Logo height={34} />
            <p className="font-sans text-xs sm:text-sm text-ink/70 max-w-sm leading-relaxed">
              Pristine alpine meltwater, conchiolin pearl peptides, and sub-arctic marine algae.
              Formulated to awaken cellular luminescence.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="font-sans text-[11px] uppercase tracking-widest text-teal font-semibold block mb-2">
                Join The Circle of Water
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to Glasyan dispatches.');
                }}
                className="flex items-center gap-2 max-w-md"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email for private dispatches"
                  className="flex-1 bg-pearl border border-teal/20 rounded-full px-4 py-2.5 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-5 py-2.5 rounded-full bg-teal text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-teal-deep transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.title} className="space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-teal-deep block">
                  {col.title}
                </span>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-xs text-ink/70 hover:text-teal transition-colors tracking-wide block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant Watermark Outline "GLASYAN" Drawing across footer */}
        <div
          ref={giantWordmarkRef}
          className="w-full overflow-hidden flex justify-center py-6 pointer-events-none select-none"
          aria-hidden="true"
        >
          {'GLASYAN'.split('').map((char, i) => (
            <span
              key={i}
              className="giant-footer-letter inline-block font-melodrama text-[16vw] font-normal leading-none tracking-[0.1em] text-teal will-change-transform opacity-10"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-ink/50 pt-4 gap-4">
          <p>&copy; {new Date().getFullYear()} Glasyan High Alpine Cosmetics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Crafted in Switzerland</span>
            <span>Zero Deuterium Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
