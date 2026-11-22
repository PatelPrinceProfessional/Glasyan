'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { MobileMenu } from '@/components/ui/MobileMenu';

/**
 * ClientLayoutWrapper
 * Manages mobile menu open/close state between Header and MobileMenu
 */
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      {children}
    </>
  );
}
