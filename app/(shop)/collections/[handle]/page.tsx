'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { assets, ProductItem } from '@/assets.config';
import { ProductSlot } from '@/components/ui/ProductSlot';
import { useCart } from '@/lib/cart-context';
import { Footer } from '@/components/sections/Footer';
import { Star, Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * Collection Page Component
 * Section 7:
 * - Header text reveal
 * - Filter chips (All, Shampoo, Conditioner, Serum, Cosmetics, Treatment, Gift sets)
 * - Sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated)
 * - Framer layout animation for smooth grid reflow
 * - Quick-add with cart integration
 */
export default function CollectionPage() {
  const params = useParams();
  const initialCategory = typeof params?.handle === 'string' && params.handle !== 'all' ? params.handle : 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const { addItem } = useCart();

  const categories = ['all', 'Shampoo', 'Conditioner', 'Serum', 'Cosmetics', 'Treatment', 'Gift sets'];

  // Filter products
  const filteredProducts = assets.products.filter((prod) => {
    if (selectedCategory === 'all') return true;
    return prod.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <main className="min-h-screen bg-white pt-28 sm:pt-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-24">
        {/* Collection Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-teal block mb-2">
            The Dispensary &bull; Full Catalog
          </span>
          <h1 className="font-melodrama text-display-m sm:text-display-l font-normal text-ink tracking-tight">
            Curated Formulations
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink/70 mt-3 max-w-xl">
            Each formula features our signature low-deuterium glacial water core and biomimetic pearl peptides.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-teal/15">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? 'bg-teal text-white shadow-sm'
                      : 'bg-pearl text-ink/75 hover:bg-teal-mist/60 border border-teal/15'
                  }`}
                >
                  {cat === 'all' ? 'All Rituals' : cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-teal" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-pearl border border-teal/20 rounded-full px-4 py-2 text-xs font-sans font-medium text-ink focus:outline-none focus:border-teal"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Dynamic Animated Grid (Framer Motion layout) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {sortedProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-pearl/60 border border-teal/15 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-glass-hover hover:border-teal/30"
              >
                {/* Top Category and Rating */}
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

                {/* Capsule Showcase */}
                <Link
                  href={`/products/${product.handle}`}
                  className="relative h-64 sm:h-72 my-4 flex items-center justify-center overflow-hidden"
                >
                  <ProductSlot
                    size="md"
                    className="transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Quick Add Overlay Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem(product, 1);
                    }}
                    aria-label={`Add ${product.name} to cart`}
                    className="absolute bottom-3 inset-x-8 py-3 rounded-full bg-teal text-white text-xs font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-deep"
                  >
                    <Plus className="w-4 h-4" />
                    Quick Add
                  </button>
                </Link>

                {/* Bottom Details */}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
