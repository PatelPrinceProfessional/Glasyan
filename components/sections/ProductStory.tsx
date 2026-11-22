'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { Ripple } from '@/components/motion/Ripple';
import { Droplet, Sparkles, Waves, ShieldCheck } from 'lucide-react';

interface StoryStep {
  number: string;
  category: string;
  title: string;
  tagline: string;
  body: string;
  metric: string;
  metricLabel: string;
  color: string;
  icon: any;
}

const STORY_STEPS: StoryStep[] = [
  {
    number: '01',
    category: 'ALPINE EXTRACTION',
    title: 'The Purity of Glacial Melt',
    tagline: 'Filtered over millennia through crystalline granite strata',
    body: 'At 3,200 meters elevation in the Valais Alps, ancient meltwater is collected at dawn. With ultra-low surface tension, it penetrates cuticle boundaries four times deeper than municipal cosmetic waters.',
    metric: '4.2x',
    metricLabel: 'Deeper Cuticular Infiltration',
    color: '#008C95',
    icon: Droplet,
  },
  {
    number: '02',
    category: 'PEARL PEPTIDES',
    title: 'Biomimetic Conchiolin Matrix',
    tagline: '17 bio-identical amino acids reconstruct damaged hair fibers',
    body: 'Hydrolyzed mother-of-pearl yields conchiolin proteins that fit seamlessly into broken keratin bonds. Fractured scales fuse flat, restoring tensile elasticity and diamond prismatic light refraction.',
    metric: '88%',
    metricLabel: 'Reduction in Breakage',
    color: '#7FC4C9',
    icon: Sparkles,
  },
  {
    number: '03',
    category: 'POLAR SEA KELP',
    title: 'Elastic Fucoidan Shield',
    tagline: 'Sub-arctic marine algae creates a breathable moisture seal',
    body: 'Cold-extracted Atlantic kelp creates a dynamic barrier matrix. It shields fibers from thermal degradation up to 450°F and environmental free radicals without synthetic silicones or heavy buildup.',
    metric: '450°F',
    metricLabel: 'Thermal Defense Barrier',
    color: '#005A61',
    icon: Waves,
  },
  {
    number: '04',
    category: 'THE DAILY CEREMONY',
    title: 'Liquid Silk Transformation',
    tagline: 'A weightless ritual resulting in mirror-like radiance',
    body: 'The culmination of our elemental science. Hair emerges soft to the touch, resilient against humidity, and radiating an effortless, incandescent halo.',
    metric: '100%',
    metricLabel: 'Silicone & Paraben Free',
    color: '#C8B58F',
    icon: ShieldCheck,
  },
];

/**
 * ProductStory Section
 * Section 6.3:
 * - Pinned section (4 steps)
 * - Product slot stays on left third (x: -28%, scale 0.9) and rotates 8deg per step
 * - Right side step stack swaps: outgoing slides up and fades, incoming slides in from below
 * - Large Melodrama numerals 01/02/03/04 count in
 * - Vertical progress line on far left fills as steps advance
 * - Different ripple color plays on each step swap
 * - Mobile: stacked layout with clean fade swap
 */
export function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinFrameRef = useRef<HTMLDivElement>(null);
  const slotContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinFrame = pinFrameRef.current;
    const slotContainer = slotContainerRef.current;
    const progressLine = progressLineRef.current;

    if (!container || !pinFrame || !slotContainer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const stepElements = pinFrame.querySelectorAll('.story-step-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400%',
          pin: pinFrame,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              STORY_STEPS.length - 1,
              Math.floor(self.progress * STORY_STEPS.length)
            );
            setCurrentStepIndex(index);

            // Update vertical progress line scale
            if (progressLine) {
              progressLine.style.transform = `scaleY(${self.progress})`;
            }
          },
        },
      });

      // Initial state of step cards: first visible, others positioned below
      stepElements.forEach((step, i) => {
        if (i !== 0) {
          gsap.set(step, { opacity: 0, y: 70, pointerEvents: 'none' });
        } else {
          gsap.set(step, { opacity: 1, y: 0, pointerEvents: 'auto' });
        }
      });

      // Rotate slot 8 degrees per step and animate cards
      STORY_STEPS.forEach((_, i) => {
        if (i > 0) {
          const prevStep = stepElements[i - 1];
          const currStep = stepElements[i];

          tl.to(
            slotContainer,
            {
              rotationZ: i * 8,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          if (prevStep) {
            tl.to(
              prevStep,
              {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: 'power2.in',
                pointerEvents: 'none',
              },
              `step-${i}`
            );
          }

          if (currStep) {
            tl.to(
              currStep,
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                pointerEvents: 'auto',
              },
              `step-${i}+=0.2`
            );
          }
        }
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  const activeStep = STORY_STEPS[currentStepIndex];

  return (
    <section ref={containerRef} id="rituals" className="product-story-section relative w-full bg-white select-none">
      <div
        ref={pinFrameRef}
        className="w-full h-screen overflow-hidden flex items-center justify-center relative px-6 sm:px-12 lg:px-20"
      >
        {/* Left Vertical Progress Line Indicator (DrawSVG style) */}
        <div className="absolute left-6 sm:left-10 top-1/4 bottom-1/4 w-[2px] bg-teal/15 hidden lg:block overflow-hidden">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-teal origin-top will-change-transform"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Step Index Badge (Desktop) */}
        <div className="absolute left-6 sm:left-10 top-1/4 -translate-y-8 hidden lg:flex flex-col items-center">
          <span className="font-melodrama text-xs text-teal font-semibold">
            {activeStep.number}
          </span>
          <span className="font-sans text-[9px] text-ink/40 tracking-widest">
            / 04
          </span>
        </div>

        {/* Content Grid: Left Third Slot, Right Two-Thirds Story */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          {/* Left Slot Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ripple Behind Slot (Colors change per active step) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
              <Ripple
                ringCount={3}
                size={280}
                color={activeStep.color}
              />
            </div>

            <div ref={slotContainerRef} className="will-change-transform">
              <ProductSlot size="lg" />
            </div>
          </div>

          {/* Right Content Column: Stacked Step Cards */}
          <div className="lg:col-span-7 relative h-[420px] flex items-center">
            {STORY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="story-step-card absolute inset-0 flex flex-col justify-center will-change-transform"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-melodrama text-4xl sm:text-5xl text-teal font-light">
                      {step.number}
                    </span>
                    <span className="h-4 w-[1px] bg-teal/30" />
                    <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-teal-deep">
                      {step.category}
                    </span>
                  </div>

                  <h3 className="font-melodrama text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="font-serif italic text-base sm:text-lg text-teal mb-5">
                    {step.tagline}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-ink/75 leading-relaxed max-w-xl mb-8">
                    {step.body}
                  </p>

                  {/* Impact Metric Strip */}
                  <div className="flex items-center gap-6 pt-6 border-t border-teal/15">
                    <div>
                      <span className="font-melodrama text-3xl sm:text-4xl text-ink font-light block">
                        {step.metric}
                      </span>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-ink/60">
                        {step.metricLabel}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-teal-mist/60 flex items-center justify-center text-teal ml-auto">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
