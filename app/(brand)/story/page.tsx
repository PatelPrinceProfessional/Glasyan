'use client';

import React from 'react';
import Image from 'next/image';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { ScrollWords } from '@/components/motion/ScrollWords';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { MagneticButton } from '@/components/motion/../ui/MagneticButton';
import { Footer } from '@/components/sections/Footer';
import { TransitionLink } from '@/components/ui/PageTransition';
import { Droplet, Sparkles, Mountain, Feather } from 'lucide-react';

/**
 * Brand Story Page
 * Deep dive into the Glasyan philosophy, Valais glacial harvest, and conchiolin peptide chemistry.
 */
export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white pt-28 sm:pt-36">
      {/* Story Hero */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 text-center pb-20">
        <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-teal inline-block mb-3">
          The Origin Chronicle
        </span>

        <SplitReveal
          as="h1"
          className="font-melodrama text-display-m sm:text-display-l md:text-display-xl font-normal text-ink tracking-tight mb-8"
        >
          Water Before Matter.
        </SplitReveal>

        <p className="font-sans text-base sm:text-lg text-ink/75 max-w-2xl mx-auto leading-relaxed">
          In 2026, Glasyan was conceived not in a commercial cosmetic laboratory, but amidst the crystalline silence of the Valais Glacier at 3,200 meters.
        </p>
      </section>

      {/* Hero Image Arch Showcase */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 mb-28">
        <MaskReveal shape="arch" className="h-[420px] sm:h-[560px] w-full shadow-2xl">
          <div className="relative w-full h-full">
            <Image
              src="/ingredients/glacier-water.jpg"
              alt="Swiss Valais Glacier sourcing site"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white max-w-xl">
              <span className="font-sans text-xs uppercase tracking-widest text-aqua-light block mb-1">
                Valais High Alps, Switzerland
              </span>
              <p className="font-melodrama text-2xl sm:text-3xl font-light">
                Milennia-old granite filtration creating low-deuterium water with unmatched cellular affinity.
              </p>
            </div>
          </div>
        </MaskReveal>
      </section>

      {/* Statement Strip */}
      <section className="bg-pearl py-24 sm:py-32 px-6 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollWords
            text="Traditional hair care dilutes formulas with generic tap water. We formulate with the ancient mineral marrow of the earth."
            highlightWords={['dilutes', 'formulate', 'mineral', 'marrow']}
            highlightColor="#008C95"
            className="font-melodrama text-2xl sm:text-4xl md:text-5xl font-normal text-ink leading-snug"
          />
        </div>
      </section>

      {/* Three Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="glass-panel p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-mist flex items-center justify-center text-teal">
              <Mountain className="w-6 h-6" />
            </div>
            <h3 className="font-melodrama text-2xl text-ink">Zero Deuterium Purity</h3>
            <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
              Alpine runoff possesses a reduced isotopic weight, allowing hydration molecules to cross the hydrophobic cuticular lipid envelope without silicones.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-mist flex items-center justify-center text-teal">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-melodrama text-2xl text-ink">Conchiolin Peptides</h3>
            <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
              Extracted from South Sea mother-of-pearl, our conchiolin micro-chains replicate human keratin structure, seamlessly repairing fractured cortex bonds.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-mist flex items-center justify-center text-teal">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-melodrama text-2xl text-ink">Weightless Drape</h3>
            <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
              No artificial occlusives or heavy petroleum derivatives. Hair moves with natural momentum, responding to touch with liquid silk drape.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 bg-white border-t border-teal/15">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-melodrama text-3xl sm:text-4xl text-ink mb-4">
            Begin Your Ceremony
          </h2>
          <p className="font-sans text-sm text-ink/70 mb-8">
            Experience the complete 4-step restorative ritual designed for lasting radiance.
          </p>
          <TransitionLink href="/collections/all">
            <MagneticButton variant="primary" size="lg">
              Explore Formulations
            </MagneticButton>
          </TransitionLink>
        </div>
      </section>

      <Footer />
    </main>
  );
}
