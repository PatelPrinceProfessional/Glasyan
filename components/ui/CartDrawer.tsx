'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductSlot } from './ProductSlot';
import { MagneticButton } from './MagneticButton';
import Link from 'next/link';

/**
 * CartDrawer Component (Framer Motion)
 * Section 7:
 * - Slides in from right with backdrop blur
 * - Items stagger in with smooth fade and slide
 * - Quantity increments and removals animate smoothly
 */
export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalCount, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[100]"
          />

          {/* Slide-in Drawer Container */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-teal/15 shadow-2xl z-[101] flex flex-col"
            aria-label="Shopping Cart Drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-teal/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-teal" />
                <h3 className="font-melodrama text-xl font-medium tracking-wide text-ink">
                  Your Ritual Bag
                </h3>
                <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-teal-mist text-teal-deep font-semibold">
                  {totalCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart drawer"
                className="p-2 text-ink/70 hover:text-teal transition-colors rounded-full focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-teal/10">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-teal-mist/50 flex items-center justify-center text-teal mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="font-melodrama text-xl text-ink mb-2">Your Bag is Empty</p>
                  <p className="font-sans text-xs text-ink/60 max-w-xs mb-6">
                    Discover our alpine-filtered hair care formulations and curate your daily ceremony.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-sans text-xs tracking-widest uppercase font-semibold text-teal hover:text-teal-deep transition-colors"
                  >
                    Explore Shop &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="pt-4 first:pt-0 flex gap-4 items-center"
                    >
                      {/* Product Thumbnail Capsule */}
                      <div className="w-16 h-20 rounded-xl bg-pearl border border-teal/15 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <ProductSlot size="sm" showLabel={false} className="scale-50 origin-center" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.handle}`}
                          onClick={closeCart}
                          className="font-melodrama text-sm font-medium text-ink hover:text-teal transition-colors truncate block"
                        >
                          {item.product.name}
                        </Link>
                        <p className="font-sans text-[11px] text-ink/60 truncate mt-0.5">
                          {item.product.volume}
                        </p>
                        <p className="font-sans text-xs font-semibold text-teal mt-1">
                          ${item.product.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="inline-flex items-center border border-teal/20 rounded-full px-2 py-0.5 bg-pearl">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="text-ink/70 hover:text-teal transition-colors p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-sans text-xs font-semibold px-2 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="text-ink/70 hover:text-teal transition-colors p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label="Remove item"
                            className="text-ink/40 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-teal/10 px-6 py-5 bg-pearl/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-xs tracking-wider uppercase text-ink/70">
                    Complimentary Shipping
                  </span>
                  <span className="font-sans text-xs font-medium text-teal">Included</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-melodrama text-base text-ink">Subtotal</span>
                  <span className="font-melodrama text-xl font-bold text-ink">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <MagneticButton
                  variant="primary"
                  className="w-full py-4 text-xs tracking-widest font-semibold flex items-center justify-center gap-2"
                  onClick={() => {
                    alert('Order initiated with Glasyan luxury checkout! Thank you.');
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <p className="font-sans text-[10px] text-center text-ink/50 mt-3">
                  Encased in recyclable alpine-frosted luxury packaging
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
