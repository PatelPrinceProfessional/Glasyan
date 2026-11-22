import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/lib/lenis';
import { CartProvider } from '@/lib/cart-context';
import { PageTransitionProvider } from '@/components/ui/PageTransition';
import { Header } from '@/components/ui/Header';
import { Cursor } from '@/components/ui/Cursor';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { DebugPanel } from '@/components/ui/DebugPanel';
import ClientLayoutWrapper from './ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'GLASYAN — High Alpine Hair Essence & Cellular Alchemy',
  description: 'Pure glacial water, hydrolyzed pearl peptides, and sub-arctic marine kelp. Luxury hair care formulated for weightless hydration and cellular luminescence.',
  keywords: ['Glasyan', 'luxury hair care', 'glacial shampoo', 'pearl peptides', 'clean cosmetics', 'scalp serum'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-white text-ink overflow-x-hidden">
        <CartProvider>
          <LenisProvider>
            <PageTransitionProvider>
              <ClientLayoutWrapper>
                {/* Global Scroll Progress Hairline */}
                <ScrollProgress />

                {/* Ambient Drifting Glow Blobs */}
                <AmbientBackground />

                {/* Custom Desktop Cursor */}
                <Cursor />

                {/* Motion Debug Panel (?motion=debug) */}
                <DebugPanel />

                {/* Cart Drawer & Mobile Menu */}
                <CartDrawer />

                {/* Page Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </ClientLayoutWrapper>
            </PageTransitionProvider>
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
