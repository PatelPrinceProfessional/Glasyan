'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Logo } from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component (Framer Motion)
 * Section 7:
 * - Full screen white glass panel
 * - Links reveal line-by-line with stagger
 * - Floating droplet decoration and clean luxury typography
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuLinks = [
    { label: 'Home', href: '/' },
    { label: 'Rituals & Collection', href: '/collections/all' },
    { label: 'Ingredients & Science', href: '/#ingredients' },
    { label: 'Brand Story', href: '/story' },
    { label: 'Motion Lab', href: '/lab' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Top Bar with Logo and Close Button */}
          <div className="flex items-center justify-between">
            <Logo height={30} />
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-full border border-teal/20 text-ink hover:text-teal transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Links */}
          <nav className="flex flex-col gap-6 my-auto">
            {menuLinks.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-melodrama text-3xl sm:text-4xl text-ink hover:text-teal transition-colors tracking-tight flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-teal text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Footnote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="pt-6 border-t border-teal/15 flex items-center justify-between text-xs text-ink/60"
          >
            <span className="font-sans tracking-widest uppercase">Pure Alpine Hydration</span>
            <span className="font-melodrama text-sm text-teal">Est. 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
