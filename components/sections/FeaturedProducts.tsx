'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { assets, ProductItem } from '@/assets.config';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { useCart } from '@/lib/cart-context';
import { Star, Plus, ArrowUpRight } from 'lucide-react';

/**
 * FeaturedProducts Section
 * Section 6.7:
 * - Product grid using ScrollTrigger.batch for staggered rise-in
 * - Card hover: slow zoom, quick-add button slides up from bottom
 * - "Fly to cart" animation: Product thumbnail clones, flies to header cart icon, pulses badge!
 */
export function FeaturedProducts() {
  const containerRef = useRef<HTMLElement>(null);
  const { addItem } = useCart();
  const products = assets.products.slice(0, 6);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = container.querySelectorAll('.featured-product-card');

    const ctx = gsap.context(() => {
      // Staggered rise-in batch animation
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  /**
   * "Fly to cart" animation
   */
  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const button = e.currentTarget;
    const card = button.closest('.featured-product-card');
    const cartIcon = document.getElementById('cart-header-icon');

    if (!card || !cartIcon || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addItem(product, 1);
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Create a temporary flying thumbnail clone
    const clone = document.createElement('div');
    clone.style.position = 'fixed';
    clone.style.left = `${cardRect.left + cardRect.width / 2 - 24}px`;
    clone.style.top = `${cardRect.top + cardRect.height / 3}px`;
    clone.style.width = '48px';
    clone.style.height = '64px';
    clone.style.borderRadius = '9999px';
    clone.style.background = 'linear-gradient(135deg, #008C95 0%, #7FC4C9 100%)';
    clone.style.boxShadow = '0 8px 24px rgba(0, 140, 149, 0.4)';
    clone.style.zIndex = '99999';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);

    // Animate clone to cart icon
    gsap.to(clone, {
      left: cartRect.left + cartRect.width / 2 - 12,
      top: cartRect.top + cartRect.height / 2 - 16,
      width: 24,
      height: 32,
      scale: 0.4,
      opacity: 0.8,
      duration: 0.65,
      ease: 'power3.inOut',
      onComplete: () => {
        clone.remove();
        addItem(product, 1);

        // Pulse cart icon
        gsap.fromTo(
          cartIcon,
          { scale: 1.35 },
          { scale: 1, duration: 0.45, ease: 'back.out(2)' }
        );
      },
    });
  };

  return (
    <section ref={containerRef} className="featured-section relative w-full py-28 sm:py-36 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-teal">
              The Dispensary
            </span>
            <h2 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight mt-1">
              Signature Formulations
            </h2>
          </div>

          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold text-teal hover:text-teal-deep transition-colors"
          >
            Explore Complete Range
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="featured-product-card group relative bg-pearl/60 border border-teal/15 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-glass-hover hover:border-teal/30 will-change-transform"
            >
              {/* Card Top: Category and Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-teal">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-ink/70 text-xs font-sans">
                  <Star className="w-3.5 h-3.5 fill-champagne text-champagne" />
                  <span>{product.rating}</span>
                  <span className="text-ink/40">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Slot Capsule Showcase */}
              <Link
                href={`/products/${product.handle}`}
                className="relative h-64 sm:h-72 my-4 flex items-center justify-center overflow-hidden"
              >
                <ProductSlot
                  size="md"
                  className="transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Quick Add Overlay Button (Slides up on card hover) */}
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  aria-label={`Quick add ${product.name} to cart`}
                  className="absolute bottom-3 inset-x-8 py-3 rounded-full bg-teal text-white text-xs font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-deep"
                >
                  <Plus className="w-4 h-4" />
                  Quick Add
                </button>
              </Link>

              {/* Card Bottom Details */}
              <div className="pt-2">
                <div className="flex items-baseline justify-between">
                  <Link
                    href={`/products/${product.handle}`}
                    className="font-melodrama text-xl font-normal text-ink group-hover:text-teal transition-colors"
                  >
                    {product.name}
                  </Link>
                  <span className="font-sans text-sm font-semibold text-ink ml-2">
                    ${product.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-ink/65 line-clamp-1 mt-1">
                  {product.tagline}
                </p>
                <span className="font-sans text-[11px] text-ink/40 block mt-2">
                  {product.volume}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
