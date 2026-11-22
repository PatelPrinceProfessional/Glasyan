'use client';

import React, { useState } from 'react';
import { Loader } from '@/components/sections/Loader';
import { Hero } from '@/components/sections/Hero';
import { Statement } from '@/components/sections/Statement';
import { ProductStory } from '@/components/sections/ProductStory';
import { Ingredients } from '@/components/sections/Ingredients';
import { WaveDivider } from '@/components/motion/WaveDivider';
import { CollectionSection } from '@/components/sections/CollectionSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';

/**
 * Animated Home Page
 * Full GSAP-first motion website with cinematic slow scroll choreography.
 */
export default function HomePage() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-white">
      {/* 6.0 Loader (SessionStorage-aware) */}
      <Loader onComplete={() => setLoaderComplete(true)} />

      {/* 6.1 Hero (Pinned 300% Desktop / 180% Mobile) */}
      <Hero />

      {/* 6.2 Statement (ScrollWords Scrub) */}
      <Statement />

      {/* 6.3 Product Story (4 Pinned Steps & Slot Rotation) */}
      <ProductStory />

      {/* 6.4 Ingredients (Editorial Grid using 5 Uploaded Images) */}
      <Ingredients />

      {/* 6.5 Wave Divider (Scrubbed SVG Path Drift) */}
      <WaveDivider fillColor="#FFFFFF" strokeColor="#7FC4C9" />

      {/* 6.6 Collection (Horizontal Scroll Pinned Track) */}
      <CollectionSection />

      {/* 6.7 Featured Products (Batch Enter & Fly-To-Cart) */}
      <FeaturedProducts />

      {/* 6.8 Marquee (Velocity-Reactive Infinite Loop) */}
      <MarqueeBand />

      {/* 6.9 Trust Strip (Hairline Divider & Counters) */}
      <TrustStrip />

      {/* 6.10 Testimonials (Interactive Luxury Carousel) */}
      <Testimonials />

      {/* 6.11 Final CTA (Draw Wave & Magnetic Ripple Button) */}
      <FinalCta />

      {/* 6.12 Footer (Sticky Parallax Reveal & Giant Wordmark) */}
      <Footer />
    </main>
  );
}
