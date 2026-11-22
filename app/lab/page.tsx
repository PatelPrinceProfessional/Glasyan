'use client';

import React from 'react';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { ScrollWords } from '@/components/motion/ScrollWords';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { Parallax } from '@/components/motion/Parallax';
import { PinSection } from '@/components/motion/PinSection';
import { Magnetic } from '@/components/motion/Magnetic';
import { Marquee } from '@/components/motion/Marquee';
import { Counter } from '@/components/motion/Counter';
import { WaveDivider } from '@/components/motion/WaveDivider';
import { Ripple } from '@/components/motion/Ripple';
import { FloatingDroplets } from '@/components/motion/FloatingDroplets';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ProductSlot } from '@/components/ui/ProductSlot';
import Image from 'next/image';

/**
 * Motion Laboratory Route (/lab)
 * Section 10 Phase 2:
 * Dedicated interactive testing environment for all 11 motion primitives.
 */
export default function MotionLabPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-32">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 text-center mb-24">
        <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-teal block mb-2">
          Motion System &bull; Verification Suite
        </span>
        <h1 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight mb-4">
          Motion Laboratory
        </h1>
        <p className="font-sans text-sm sm:text-base text-ink/70 max-w-xl mx-auto">
          Interactive isolated workbench testing every GSAP 3.12+ and Framer Motion building block from Section 4 of the master specification.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-32">
        {/* 1. SplitReveal */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">01. &lt;SplitReveal /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">mode: onEnter | chars / words / lines</span>
          </div>

          <SplitReveal as="h3" type="words" className="font-melodrama text-3xl sm:text-5xl text-ink">
            Pristine alpine meltwater awakening your hair&apos;s cellular luminescence.
          </SplitReveal>
        </div>

        {/* 2. ScrollWords */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">02. &lt;ScrollWords /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">mode: scrub | opacity 15% &rarr; 100%</span>
          </div>

          <ScrollWords
            text="Every formulation begins with water filtered through alpine quartz. Made for deep hydration and unmistakable radiance."
            highlightWords={['alpine', 'quartz', 'hydration', 'radiance']}
            highlightColor="#008C95"
            className="font-melodrama text-2xl sm:text-4xl text-ink leading-relaxed"
          />
        </div>

        {/* 3. MaskReveal & Parallax */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">03. &lt;MaskReveal /&gt; &amp; &lt;Parallax /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">clip-path inset &amp; inner scale 1.25 &rarr; 1.0</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <MaskReveal shape="arch" className="h-[360px] w-full shadow-lg">
              <div className="relative w-full h-full">
                <Image
                  src="/ingredients/glacier-water.jpg"
                  alt="Glacier Water"
                  fill
                  className="object-cover"
                />
              </div>
            </MaskReveal>

            <Parallax speed={-25} className="space-y-4">
              <h4 className="font-melodrama text-2xl text-ink">Asymmetric Parallax Flow</h4>
              <p className="font-sans text-sm text-ink/75 leading-relaxed">
                Elements move at independent scroll velocity vectors. Notice how this card gently lifts relative to the adjacent arch mask.
              </p>
            </Parallax>
          </div>
        </div>

        {/* 4. Magnetic & MagneticButton */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">04. &lt;Magnetic /&gt; &amp; &lt;MagneticButton /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">gsap.quickTo cursor pull &amp; directional sweep</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 py-4">
            <MagneticButton variant="primary" size="lg">
              Primary Magnetic Sweep
            </MagneticButton>

            <MagneticButton variant="secondary" size="md">
              Secondary Button
            </MagneticButton>

            <MagneticButton variant="outline" size="md">
              Outline Sweep
            </MagneticButton>

            <Magnetic radius={100} pullFactor={0.4}>
              <div className="w-16 h-16 rounded-full bg-teal-mist text-teal flex items-center justify-center font-bold text-xs">
                PULL
              </div>
            </Magnetic>
          </div>
        </div>

        {/* 5. Ripple & FloatingDroplets */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6 relative overflow-hidden min-h-[300px]">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4 relative z-10">
            <h2 className="font-mono text-sm text-teal font-semibold">05. &lt;Ripple /&gt; &amp; &lt;FloatingDroplets /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">concentric rings &amp; random drift vectors</span>
          </div>

          <FloatingDroplets count={12} color="#008C95" />

          <div className="relative z-10 flex items-center justify-center py-12">
            <Ripple ringCount={4} size={240} color="rgba(0, 140, 149, 0.45)" />
            <div className="absolute">
              <ProductSlot size="sm" />
            </div>
          </div>
        </div>

        {/* 6. Marquee */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">06. &lt;Marquee /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">velocity-reactive infinite marquee</span>
          </div>

          <Marquee
            items={['PURE', 'RADIANT', 'HYDRATED', 'CELLULAR', 'GLASYAN']}
            speed={1.5}
            outlineAlternate={true}
          />
        </div>

        {/* 7. Counter & Numerals */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">07. &lt;Counter /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">Melodrama tabular numerals</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-melodrama text-teal">
                <Counter value={100} suffix="%" duration={2} />
              </div>
              <span className="text-xs font-sans text-ink/60 mt-1 uppercase tracking-wider block">Alpine Purity</span>
            </div>
            <div>
              <div className="text-4xl font-melodrama text-teal">
                <Counter value={88} suffix="%" duration={2.4} />
              </div>
              <span className="text-xs font-sans text-ink/60 mt-1 uppercase tracking-wider block">Breakage Reduction</span>
            </div>
            <div>
              <div className="text-4xl font-melodrama text-teal">
                <Counter value={4.9} decimals={1} suffix=" / 5" duration={2} />
              </div>
              <span className="text-xs font-sans text-ink/60 mt-1 uppercase tracking-wider block">Patron Score</span>
            </div>
            <div>
              <div className="text-4xl font-melodrama text-teal">
                <Counter value={3200} suffix="m" duration={2.6} />
              </div>
              <span className="text-xs font-sans text-ink/60 mt-1 uppercase tracking-wider block">Glacier Altitude</span>
            </div>
          </div>
        </div>

        {/* 8. WaveDivider */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-teal/15 pb-4">
            <h2 className="font-mono text-sm text-teal font-semibold">08. &lt;WaveDivider /&gt;</h2>
            <span className="text-xs text-ink/50 font-mono">scroll-scrubbed SVG wave</span>
          </div>

          <WaveDivider fillColor="#E4F2F3" strokeColor="#008C95" />
        </div>
      </div>
    </main>
  );
}
