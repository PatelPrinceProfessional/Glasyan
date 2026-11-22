'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Logo } from './Logo';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

/**
 * Header Component
 * Section 5.2:
 * - Transparent over hero
 * - Hides on scroll down, reappears on scroll up (ScrollTrigger direction)
 * - Gains white blurred background after 80px
 * - Logo droplet does a tiny idle "breath" (scale 1 to 1.04, 4s loop)
 * - Nav links get an underline that draws left-to-right on hover (scaleX with transform-origin swap)
 */
export function Header({ onOpenMobileMenu }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const dropGRef = useRef<SVGGElement | null>(null);
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Logo droplet idle breathing loop (scale 1 to 1.04, 4s sine)
    const dropEl = header.querySelector('#drop');
    let breatheTween: gsap.core.Tween | null = null;
    if (dropEl) {
      breatheTween = gsap.to(dropEl, {
        scale: 1.05,
        transformOrigin: 'center center',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Scroll-direction hide / show and blur threshold
    let lastScroll = 0;
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const currentScroll = self.scroll();

        // Background blur check
        if (currentScroll > 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        // Hide on scroll down, show on scroll up (with a minimum delta threshold)
        if (currentScroll > 150) {
          if (self.direction === 1) {
            // scrolling down
            gsap.to(header, { yPercent: -100, duration: 0.45, ease: 'power2.out' });
          } else {
            // scrolling up
            gsap.to(header, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
          }
        } else {
          gsap.to(header, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
        }

        lastScroll = currentScroll;
      },
    });

    return () => {
      st.kill();
      breatheTween?.kill();
    };
  }, []);

  const navLinks = [
    { label: 'Rituals', href: '/#rituals' },
    { label: 'Shop', href: '/collections/all' },
    { label: 'Ingredients', href: '/#ingredients' },
    { label: 'Story', href: '/story' },
    { label: 'Lab', href: '/lab' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 will-change-transform ${
        isScrolled
          ? 'glass-panel border-b border-teal/10 py-3.5 shadow-sm'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="inline-block transition-transform duration-300 hover:opacity-90 focus:outline-none">
          <Logo height={32} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NavLink key={link.label} href={link.href} label={link.label} isActive={isActive} />
            );
          })}
        </nav>

        {/* Action icons: Cart drawer trigger + Mobile menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            id="cart-header-icon"
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="relative p-2 text-ink hover:text-teal transition-colors rounded-full focus:outline-none"
            data-cursor="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span
                id="cart-badge-count"
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal text-white text-[10px] font-sans font-bold flex items-center justify-center shadow-md transition-transform duration-300"
              >
                {totalCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Mobile Menu"
            className="md:hidden p-2 text-ink hover:text-teal transition-colors focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * NavLink with Draw-Underline Animation
 * Draws left-to-right on hover; on mouseleave transform-origin flips to right and collapses.
 */
function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const line = lineRef.current;
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.set(line, { transformOrigin: 'left center' });
    gsap.to(line, { scaleX: 1, duration: 0.35, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    const line = lineRef.current;
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.set(line, { transformOrigin: 'right center' });
    gsap.to(line, { scaleX: 0, duration: 0.35, ease: 'power2.in' });
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative py-1 font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
        isActive ? 'text-teal' : 'text-ink/80 hover:text-teal'
      }`}
    >
      {label}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-teal origin-left scale-x-0 will-change-transform"
      />
    </Link>
  );
}
