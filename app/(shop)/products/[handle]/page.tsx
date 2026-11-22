'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { assets } from '@/assets.config';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useCart } from '@/lib/cart-context';
import { Footer } from '@/components/sections/Footer';
import { Star, ShieldCheck, Droplet, Sparkles, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Product Detail Page Component
 * Section 7:
 * - Product image/slot showcase with smooth crossfade and zoom on hover
 * - Sticky info panel with pricing, volume, rating
 * - Interactive quantity selector
 * - "Add to Cart" button with fly-to-cart effect
 * - Accordion sections (Benefits, Ritual, Pure Ingredients, Clinical Results)
 */
export default function ProductDetailPage() {
  const params = useParams();
  const handle = params?.handle as string;
  const product = assets.products.find((p) => p.handle === handle) || assets.products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ritual' | 'ingredients'>('benefits');
  const [addedNotice, setAddedNotice] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <main className="min-h-screen bg-white pt-28 sm:pt-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Product Slot Showcase */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 flex flex-col items-center justify-center p-8 sm:p-14 bg-pearl/70 border border-teal/15 rounded-3xl overflow-hidden relative">
            <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-mist text-teal-deep text-xs font-sans tracking-widest uppercase font-semibold">
              <Droplet className="w-3.5 h-3.5 text-teal" />
              {product.category}
            </div>

            <div className="my-8 sm:my-14">
              <ProductSlot size="hero" className="shadow-2xl" />
            </div>

            <div className="flex items-center gap-6 text-xs font-sans text-ink/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal" />
                Swiss Alpine Tested
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal" />
                100% Recyclable Glass
              </span>
            </div>
          </div>

          {/* Right Column: Sticky Product Info Panel */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-champagne">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-sans font-semibold text-ink">
                  {product.rating}
                </span>
                <span className="text-xs font-sans text-ink/50">
                  ({product.reviewsCount} verified patron reviews)
                </span>
              </div>

              <h1 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base text-teal mt-1">
                {product.tagline}
              </p>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-melodrama text-3xl font-medium text-ink">
                  ${product.price}
                </span>
                <span className="font-sans text-xs text-ink/50">
                  / {product.volume}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Quantity Selector and Add to Cart Button */}
            <div className="space-y-4 pt-4 border-t border-teal/15">
              <div className="flex items-center gap-4">
                {/* Quantity Pill */}
                <div className="inline-flex items-center border border-teal/20 rounded-full px-4 py-2 bg-pearl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="text-ink/70 hover:text-teal transition-colors p-1"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-sans text-sm font-semibold px-4 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="text-ink/70 hover:text-teal transition-colors p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <div className="flex-1">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        Added to Ritual Bag
                      </>
                    ) : (
                      <>
                        Add to Ritual &bull; ${(product.price * quantity).toFixed(2)}
                      </>
                    )}
                  </MagneticButton>
                </div>
              </div>

              <p className="font-sans text-[11px] text-ink/50 text-center sm:text-left">
                Complimentary express shipping &amp; two ritual samples included with every order.
              </p>
            </div>

            {/* Interactive Accordion Tabs */}
            <div className="pt-6 border-t border-teal/15 space-y-4">
              <div className="flex border-b border-teal/15 gap-6">
                {[
                  { id: 'benefits', label: 'Key Benefits' },
                  { id: 'ritual', label: 'The Ritual' },
                  { id: 'ingredients', label: 'Full Formula' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 font-sans text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-teal'
                        : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 inset-x-0 h-[2px] bg-teal"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="py-2 text-sm text-ink/80 leading-relaxed min-h-[140px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2.5">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ritual' && (
                  <p className="font-sans leading-relaxed">
                    {product.ritual}
                  </p>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <p className="font-sans text-xs leading-relaxed text-ink/70">
                      {product.fullIngredients.join(', ')}
                    </p>
                    <p className="font-sans text-[11px] text-teal font-medium">
                      Zero parabens, sulfates, synthetic fragrances, or petroleum derivatives.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
