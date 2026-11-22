'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets.config';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { FloatingDroplets } from '@/components/motion/FloatingDroplets';
import { Sparkles, MapPin, Droplet } from 'lucide-react';

/**
 * Ingredients Section
 * Section 6.4:
 * - Editorial grid of 5 ingredient cards at varying sizes and offsets
 * - Incorporates the 5 user-provided images:
 *   1. Glacier Water (/ingredients/glacier-water.jpg)
 *   2. Hydrolyzed Pearl (/ingredients/pearl-protein.jpg)
 *   3. North Atlantic Sea Kelp (/ingredients/sea-kelp.jpg)
 *   4. Damask Rose Hydrosol (/ingredients/rose-hydrosol.jpg)
 *   5. Cold-Pressed Argan Oil (/ingredients/argan-oil.jpg)
 * - Arch & circle MaskReveal shapes with per-element parallax speeds (0.85 to 1.35)
 * - Drifting droplets and luxury typography
 */
export function Ingredients() {
  const { ingredients } = assets;

  return (
    <section id="ingredients" className="ingredients-section relative w-full py-28 sm:py-36 bg-pearl overflow-hidden select-none">
      {/* Background Micro-Droplets */}
      <FloatingDroplets count={10} color="#008C95" className="opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-mist text-teal-deep text-xs font-sans tracking-[0.22em] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            Elemental Alchemy
          </div>
          <h2 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight">
            The Five Rare Actives
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink/70 mt-3 font-normal leading-relaxed">
            Harvested at peak potency from remote high-altitude glaciers and pristine sub-arctic sea floors.
            Zero synthetics. Zero compromise.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Item 1: Alpine Glacier Water (Large Featured Arch Card) */}
          <div className="md:col-span-7 group">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:shadow-glass-hover">
              <MaskReveal shape="arch" parallaxSpeed={ingredients[0].parallaxSpeed} className="h-[360px] sm:h-[460px] w-full mb-6">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={ingredients[0].image}
                    alt={ingredients[0].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-sans text-[11px] tracking-[0.24em] uppercase text-aqua-light flex items-center gap-1.5 mb-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {ingredients[0].origin}
                    </span>
                    <h3 className="font-melodrama text-2xl sm:text-3xl font-normal">
                      {ingredients[0].name}
                    </h3>
                  </div>
                </div>
              </MaskReveal>

              <div className="space-y-2">
                <span className="font-serif italic text-sm text-teal">
                  {ingredients[0].scientificName}
                </span>
                <p className="font-sans text-sm text-ink/75 leading-relaxed">
                  {ingredients[0].description}
                </p>
                <div className="pt-3 border-t border-teal/15 flex items-center justify-between text-xs font-sans">
                  <span className="text-teal font-medium tracking-wide">Key Benefit:</span>
                  <span className="text-ink/80 font-semibold">{ingredients[0].keyBenefit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2: Hydrolyzed Pearl Protein (Circle Arch Format) */}
          <div className="md:col-span-5 group md:mt-12">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:shadow-glass-hover">
              <MaskReveal shape="circle" parallaxSpeed={ingredients[1].parallaxSpeed} className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6 shadow-md">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={ingredients[1].image}
                    alt={ingredients[1].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </MaskReveal>

              <div className="space-y-2 text-center sm:text-left">
                <span className="font-sans text-[11px] tracking-[0.24em] uppercase text-teal-deep flex items-center justify-center sm:justify-start gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {ingredients[1].origin}
                </span>
                <h3 className="font-melodrama text-2xl font-normal text-ink">
                  {ingredients[1].name}
                </h3>
                <p className="font-serif italic text-xs text-teal">
                  {ingredients[1].scientificName}
                </p>
                <p className="font-sans text-sm text-ink/75 leading-relaxed">
                  {ingredients[1].description}
                </p>
                <div className="pt-3 border-t border-teal/15 text-xs text-teal font-medium">
                  {ingredients[1].keyBenefit}
                </div>
              </div>
            </div>
          </div>

          {/* Item 3: North Atlantic Sea Kelp (Tall Rounded Format) */}
          <div className="md:col-span-4 group">
            <div className="glass-panel p-6 rounded-3xl transition-all duration-500 hover:shadow-glass-hover">
              <MaskReveal shape="arch" parallaxSpeed={ingredients[2].parallaxSpeed} className="h-[280px] sm:h-[320px] w-full mb-5">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={ingredients[2].image}
                    alt={ingredients[2].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </MaskReveal>

              <div className="space-y-1.5">
                <span className="font-sans text-[10px] tracking-widest uppercase text-teal flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3" />
                  {ingredients[2].origin}
                </span>
                <h3 className="font-melodrama text-xl font-normal text-ink">
                  {ingredients[2].name}
                </h3>
                <p className="font-sans text-xs text-ink/70 line-clamp-3">
                  {ingredients[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Item 4: Damask Rose Hydrosol (Arch Card) */}
          <div className="md:col-span-4 group md:-mt-6">
            <div className="glass-panel p-6 rounded-3xl transition-all duration-500 hover:shadow-glass-hover">
              <MaskReveal shape="arch" parallaxSpeed={ingredients[3].parallaxSpeed} className="h-[280px] sm:h-[320px] w-full mb-5">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={ingredients[3].image}
                    alt={ingredients[3].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </MaskReveal>

              <div className="space-y-1.5">
                <span className="font-sans text-[10px] tracking-widest uppercase text-teal flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3" />
                  {ingredients[3].origin}
                </span>
                <h3 className="font-melodrama text-xl font-normal text-ink">
                  {ingredients[3].name}
                </h3>
                <p className="font-sans text-xs text-ink/70 line-clamp-3">
                  {ingredients[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* Item 5: Cold-Pressed Argan Oil (Circle Card) */}
          <div className="md:col-span-4 group">
            <div className="glass-panel p-6 rounded-3xl transition-all duration-500 hover:shadow-glass-hover">
              <MaskReveal shape="circle" parallaxSpeed={ingredients[4].parallaxSpeed} className="w-48 h-48 mx-auto mb-5">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={ingredients[4].image}
                    alt={ingredients[4].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </MaskReveal>

              <div className="space-y-1.5 text-center">
                <span className="font-sans text-[10px] tracking-widest uppercase text-teal flex items-center justify-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3" />
                  {ingredients[4].origin}
                </span>
                <h3 className="font-melodrama text-xl font-normal text-ink">
                  {ingredients[4].name}
                </h3>
                <p className="font-sans text-xs text-ink/70 line-clamp-3">
                  {ingredients[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
