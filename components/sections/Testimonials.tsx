'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Glasyan has transformed my hair texture in a single wash. The weightless silkiness without synthetic silicones is unlike anything from traditional luxury houses.',
    author: 'Elena Rostova',
    role: 'Editorial Stylist',
    location: 'Geneva, Switzerland',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'The glacial water base makes an immediately perceptible difference. My scalp micro-inflammation disappeared completely, and my blowout holds mirror luster for days.',
    author: 'Camille Laurent',
    role: 'Creative Director',
    location: 'Paris, France',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'A true masterwork of biomimetic chemistry. The Pearl Peptide serum restored fullness and tensile elasticity to heat-compromised strands without any greasy residue.',
    author: 'Dr. Sofia Vance',
    role: 'Trichologist & Dermatologist',
    location: 'London, UK',
    rating: 5,
  },
];

/**
 * Testimonials Section
 * Section 6.10:
 * - Luxury carousel with active quote scale, neighbors scale down and fade
 * - Large SVG quote mark
 */
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeIndex]);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="testimonials-section relative w-full py-28 sm:py-36 bg-white select-none overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-teal">
            Patron Echoes
          </span>
          <h2 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight mt-1">
            Voices of Transformation
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 border border-teal/20 shadow-glass-subtle">
          {/* Large Background Quote Mark Icon */}
          <div className="absolute top-8 left-8 text-teal-mist pointer-events-none -z-5 opacity-60">
            <Quote className="w-24 h-24 stroke-1 fill-teal-mist/50" />
          </div>

          <div ref={cardRef} className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            {/* 5-Star Rating */}
            <div className="flex items-center gap-1.5 mb-6 text-champagne">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="font-melodrama text-xl sm:text-2xl md:text-3xl font-normal text-ink leading-snug tracking-tight mb-8">
              &ldquo;{active.quote}&rdquo;
            </p>

            {/* Author Attribution */}
            <div>
              <h4 className="font-sans text-sm font-semibold tracking-wider text-ink uppercase">
                {active.author}
              </h4>
              <p className="font-sans text-xs text-teal mt-0.5">
                {active.role} &mdash; <span className="text-ink/60">{active.location}</span>
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-teal/15">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-teal' : 'w-2 bg-teal/20 hover:bg-teal/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous quote"
                className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-ink hover:text-teal hover:border-teal transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next quote"
                className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-ink hover:text-teal hover:border-teal transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
