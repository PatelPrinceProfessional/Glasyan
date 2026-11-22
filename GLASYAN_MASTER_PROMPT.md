# GLASYAN — Master Build Prompt (GSAP-first motion website)

> Paste everything below the line into Claude Code (or any coding agent) in an empty project folder.
> Build in the phases listed at the end. After each phase, stop and show me what to review.

---

## 0. ROLE AND GOAL

You are a senior creative developer. Build the website for **GLASYAN**, a luxury hair-care and cosmetics brand (shampoo, conditioner, serums, cosmetics). The site has:

- **Animated brand pages** (Home first, then Story): every element is in motion. Cinematic, slow, expensive-feeling scroll choreography built with GSAP.
- **Store pages** (collection, product, cart): fast and clean with refined micro-interactions, and real commerce via the Shopify Storefront API later (use demo data now).

**Right now there is NO bottle, NO final product imagery and NO final logo.** Build everything around **swappable placeholders** (section 3). I will replace them with my own assets later, and the motion must still work after the swap with zero code changes except the asset config.

---

## 1. BRAND SYSTEM

**Mood:** luxurious, calm, water-inspired, bright white theme. Generous white space, thin hairlines, slow easing, no bounce, no gimmicks.

**Logo concept (placeholder for now):** a teal water droplet above a flowing wave swoosh, with a serif wordmark "Glasyan".

**Color tokens** (CSS variables + Tailwind theme; I estimated these from the logo, so keep them in ONE file so I can tune them):

| Token | Hex | Use |
|---|---|---|
| `--teal` | `#008C95` | Brand color. Large headlines, buttons, droplet, wave, ripples |
| `--teal-deep` | `#005A61` | Small text, hovers, dark sections |
| `--ink` | `#0A2E32` | Body text |
| `--aqua-mist` | `#E4F2F3` | Section tints |
| `--aqua-light` | `#7FC4C9` | Ripples, gradients |
| `--pearl` | `#F7FAFA` | Off-white surfaces |
| `--white` | `#FFFFFF` | Main background |
| `--champagne` | `#C8B58F` | Hairlines and micro-accents ONLY |

Rule: teal on white is only ~4:1 contrast. Use teal for large display text and graphics; use `--teal-deep` or `--ink` for small text.

**Typography**
- **Melodrama** (self-host via `next/font/local`, files in `/public/fonts`): headlines, statements, big numbers only. Use `font-display: swap` and a serif fallback.
- A clean grotesk sans (Satoshi or General Sans, self-hosted) for body, nav, buttons and labels.
- Type scale as tokens (display XL, display L, h1-h3, body, label). Tight tracking on display, wide tracking on small caps labels.
- IMPORTANT: wait for `document.fonts.ready` before creating any SplitText and before the first `ScrollTrigger.refresh()`.

---

## 2. TECH STACK

- Next.js (App Router), TypeScript, Tailwind CSS
- **GSAP 3.13+** with ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, Flip, Observer, CustomEase (GSAP's plugins are free in current versions; verify the license in the docs before shipping)
- `@gsap/react` (`useGSAP`) for all GSAP in React
- **Lenis** smooth scroll, synced with GSAP
- **Framer Motion** (`motion` package) for UI only: route transitions, cart drawer, mobile menu, filters and layout animation
- Shopify Storefront API (later phase, with a mock data layer now)
- Deploy target: Vercel

---

## 3. SWAPPABLE PLACEHOLDER SYSTEM (very important)

Create `assets.config.ts` as the single source of truth for everything I will replace:

```ts
export const assets = {
  logo: { svg: "/brand/logo-placeholder.svg" }, // later: my real SVG
  heroProduct: { type: "placeholder" },         // later: "image" | "sequence" | "video"
  products: [ /* 8 demo items: name, price, category, image: placeholder */ ],
  ingredients: [ /* 5 demo items: name, image: placeholder */ ],
}
```

**`<ProductSlot />`** renders whatever the config says. For now it draws a NEUTRAL placeholder (**no bottle shape**): a tall soft-edged capsule with a pearl-to-aqua gradient, a faint glass highlight, a subtle drop shadow and a small "PRODUCT" label. The same component must later accept a transparent PNG/WebP, an image sequence (canvas, scroll-scrubbed) or a video, without any change in the section code. Every animation targets the slot's wrapper, never its inner content.

**`<Logo />`** inlines an SVG with three required groups: `#drop`, `#wave`, `#wordmark`. Build a clean placeholder logo (droplet over wave over serif "Glasyan" text) with those ids. The loader, header and CTA animations target those ids, so when I drop in my real SVG I will keep the same ids. Document this contract in a README section "Replacing assets".

---

## 4. MOTION SYSTEM (global rules)

Create `motion.config.ts` with all tokens in one place, plus a dev-only debug mode (`?motion=debug` shows ScrollTrigger markers and a tiny panel to scale global speed 0.5x to 2x):

- **Easings:** `ease.luxe = "expo.out"`, `ease.soft = "power3.out"`, `ease.inOut = "expo.inOut"`, `ease.scrub = "none"`. Register one `CustomEase` called `"glasyan"` (a slow-in, long-settle curve, e.g. `0.22, 1, 0.36, 1`). **No bounce, no elastic anywhere.**
- **Durations:** fast 0.3s, base 0.7s, slow 1.2s, cinematic 1.8s.
- **Stagger:** words 0.06s, lines 0.12s, cards 0.1s.
- **Distances:** small 24px, medium 60px, large 120px.

**Technical rules**
1. All GSAP inside `useGSAP(() => {...}, { scope })` so everything cleans up automatically. No stray global listeners.
2. Lenis in a provider: `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. Do NOT use ScrollSmoother or `normalizeScroll` with Lenis.
3. Use `gsap.matchMedia()` for responsive animation: full choreography on desktop (>= 1024px), simplified on tablet and mobile (shorter pin distances, no heavy parallax, fewer layers).
4. `prefers-reduced-motion`: replace scroll-linked and looping motion with simple fades; disable Lenis, custom cursor, parallax and particles.
5. Animate only `transform`, `opacity`, `clip-path` and `filter` (sparingly). Never animate `top/left/width/height`. Use `autoAlpha`, `force3D`, and set `will-change` only while animating.
6. After fonts and images load and on resize, call `ScrollTrigger.refresh()`. Use `invalidateOnRefresh: true` where values depend on layout. Re-split SplitText on resize using `autoSplit` + `onSplit`.
7. **Ownership rule:** GSAP owns brand-page scroll choreography, the loader, ambient loops and the page-transition overlay. Framer Motion owns the cart drawer, mobile menu, filter and layout changes, and the route-content fade. They NEVER animate the same element.
8. Pause ambient loops when off-screen (ScrollTrigger `onToggle`) and when the tab is hidden.

**Reusable primitives** (build these first in `components/motion/`, each with typed props and defaults from the tokens):

- `<SplitReveal>`: split by chars/words/lines, each line masked in an overflow-hidden wrapper, rising from `yPercent: 110` with stagger; modes: `onEnter` and `scrub`.
- `<ScrollWords>`: words go from 15% opacity to 100% (and `--ink` color) as scroll progresses (scrub).
- `<MaskReveal>`: `clip-path: inset(100% 0 0 0)` to `inset(0)` with an inner image scale 1.25 to 1.
- `<Parallax speed={...}>`: `yPercent` scrub with per-element speed, plus optional `data-speed` batch mode.
- `<PinSection>`: pin with `pinSpacing`, `anticipatePin: 1`, mobile-safe config, and a timeline prop.
- `<Magnetic>`: elements pull toward the cursor within a radius using `gsap.quickTo`, returning with `ease.soft`.
- `<Marquee>`: infinite loop whose speed and direction react to scroll velocity.
- `<Counter>`: number counts up on enter (Melodrama numerals).
- `<WaveDivider>`: SVG path that morphs (MorphSVG) or drifts, scrubbed by scroll.
- `<Ripple>`: concentric rings (scale 0 to 3, opacity 0.5 to 0) in a repeating stagger; also triggerable on events.
- `<FloatingDroplets>`: 8-14 tiny teal/aqua droplet shapes drifting up and sideways with random durations and depth (blur/scale), paused off-screen.

---

## 5. GLOBAL "ALIVE" LAYER (runs on every page)

1. **Scroll progress:** a thin teal hairline at the top that scales X with page progress.
2. **Header:** transparent over the hero. Hides on scroll down, reappears on scroll up (ScrollTrigger direction), and gains a white blurred background after 80px. Logo droplet does a tiny idle "breath" (scale 1 to 1.04, 4s loop). Nav links get an underline that draws left-to-right on hover (scaleX with transform-origin swap on leave).
3. **Custom cursor (desktop only):** small teal dot with a trailing ring via `quickTo`. On links, the ring grows; on product areas it shows "View"; on draggable areas "Drag". Hidden on touch.
4. **Magnetic buttons:** all primary CTAs. On hover a teal fill sweeps in from the cursor entry side, text color flips.
5. **Ambient background:** 2-3 huge, blurred aqua blobs slowly drifting (60-90s loops) behind sections; a very subtle film-grain overlay (static) optional.
6. **Page transitions:** on internal link click, a teal wave overlay (SVG, owned by GSAP) sweeps up covering the screen (0.8s `expo.inOut`), the route changes (Framer fades the content), then the wave exits upward revealing the new page and the new page's intro timeline plays. Provide a `<TransitionLink>` component.
7. **Selection and focus:** custom `::selection` in aqua; visible, elegant focus rings (accessibility).

---

## 6. HOME PAGE — DETAILED CHOREOGRAPHY

Build each section as its own component in `components/sections/` with its own timeline. Times are guides; tune them to feel slow and premium.

### 6.0 Loader (first visit per session only; skip via `sessionStorage`)
Lock scroll. Timeline:
1. Droplet outline draws (DrawSVG 0 to 100%, 0.8s), then fills teal (opacity 0.4s).
2. Droplet falls 120px (`power2.in`, 0.5s), then 3 ripple rings expand from the impact point (scale 0 to 3, opacity 0.6 to 0, stagger 0.15).
3. Wave path draws across (DrawSVG, 0.9s `expo.out`) while the wordmark letters rise out of masks (stagger 0.05).
4. A small teal progress number counts 0 to 100.
5. Hold 0.3s, then the white loader curtain lifts (`clip-path` inset top to bottom, 1s `expo.inOut`) while the logo scales down and moves to the header position. Unlock scroll, then start the hero intro.

### 6.1 Hero (pinned 300% desktop / 180% mobile)
**Layers (back to front):** white background, aqua blobs, huge ghost "GLASYAN" outline text in Melodrama (stroke only, 6% opacity), ripple rings, `<ProductSlot />`, headline lines, small floating elements (droplets, 3 ingredient chips), scroll-hint.

**Intro (after loader):** ghost text fades up, product slot rises from `y: 140`, blur 12px to 0, `scale: 0.9` to 1 (1.8s `glasyan`), ripple rings start under it, headline lines reveal word-by-word from masks (stagger 0.12), nav and CTA fade in last.

**Idle:** slot floats (y +-10px, 5s sine, yoyo) with a soft shadow that inversely scales; droplets drift; subtle mouse parallax (slot +-12px, ghost text +-24px, droplets +-40px) using `quickTo`.

**Scroll timeline (scrub: 1):**
- 0-30%: headline lines split apart (line 1 `xPercent: -30`, line 2 `xPercent: 30`) and fade; ghost text scales 1 to 1.25.
- 0-60%: slot scale 1 to 1.18 and rotateZ -4 to 4deg; ripple rings expand continuously (scrubbed scale); background gradually brightens toward `--aqua-mist` at the bottom.
- 40-100%: chips orbit the slot along an elliptical path (MotionPath or manual sin/cos tween) and settle in a row; a new short line ("Pure water. Pure radiance." placeholder) fades in under the slot.
- End: slot is positioned to hand off into 6.3 (same x/y as the product story start) so the transition feels continuous.

### 6.2 Statement
Full-viewport, centered, one huge Melodrama sentence (placeholder: "Born from water. Made for your glow."). `<ScrollWords>` scrub. Behind it, a very large wave line draws across (DrawSVG scrubbed). Key words ("water", "glow") turn teal as they reach full opacity.

### 6.3 Product story (pinned, 4 steps)
Pin the section. Slot moves to the left third (`x`, `scale 0.9`). On the right, 3 steps (Ingredient / Benefit / Result) stack and swap: outgoing step slides up and fades with a mask, incoming slides in from below, large Melodrama numerals 01/02/03 count in. A vertical progress line (DrawSVG) on the far left fills as steps advance. Background tint crossfades white to `--aqua-mist` to white. The slot rotates 8deg per step and a different ripple color plays on each swap. Mobile: stack the slot above the text and use a simple fade swap.

### 6.4 Ingredients
Grid of 5 ingredient cards at different sizes and offsets (editorial, not uniform). Each uses `<MaskReveal>` (circle or arch clip shapes) with its own parallax speed (0.8 to 1.4), the label slides in from a mask, and a slow idle rotation or float on the cutout. Floating droplets drift through. On hover (desktop): image zooms 1.06, a ripple emits from the cursor position, label underline draws.

### 6.5 Wave divider
Full-width SVG wave that morphs between two path states as you scroll through it (scrub), filling teal while the next section's background slides under it.

### 6.6 Collection (horizontal scroll, pinned)
Pin the section; translate the track on X by `-(trackWidth - viewport)`. 5 cards (Shampoo, Conditioner, Serum, Cosmetics, Gift sets) each with a placeholder slot. Velocity effect: cards `skewX` (max 4deg) based on scroll velocity, easing back to 0. The heading stays pinned left and its words slide as progress advances. A thin teal progress bar fills at the bottom and the current card's number highlights. Desktop only. On mobile use native horizontal swipe with snap and fade-ins.

### 6.7 Featured products (fast section)
Product grid using `ScrollTrigger.batch` for a staggered rise-in. Card hover: image swap or slow zoom, a quick-add button slides up from the bottom, price and rating fade. Keep it light, with no pinning.

### 6.8 Marquee
Large outlined Melodrama text ("Pure • Radiant • Hydrated • Luxurious") scrolling infinitely, reversing direction and speeding up with scroll velocity; alternating filled and outlined words.

### 6.9 Trust strip
4 counters (placeholder numbers) using `<Counter>` plus small badge icons (draw-in via DrawSVG). Hairline dividers draw across first.

### 6.10 Testimonials
Draggable carousel (GSAP Draggable or Observer) with inertia; the active quote enlarges, neighbors scale down and fade, the large quote mark draws in.

### 6.11 Final CTA
Big Melodrama headline revealed line-by-line. The wave SVG sweeps across behind it (scrubbed). The magnetic "Shop the collection" button ripples on hover; clicking it triggers the page-transition wave into the shop.

### 6.12 Footer
Footer sits behind the previous section (sticky reveal): as the last section scrolls away the footer lifts into view with a slight parallax. Giant wordmark at the bottom draws in letter by letter. Links get the underline-draw hover.

---

## 7. STORE PAGES (light, fast motion)

- **Collection:** header text reveal, filter chips and sort (Framer layout animation for the grid reflow), cards fade-up stagger on enter.
- **Product page:** image gallery with a smooth crossfade and a zoom on hover; sticky info panel; accordion sections (Framer); **add-to-cart "fly to cart"** using GSAP Flip (the product thumbnail flies into the cart icon, the icon pulses once, the counter ticks up).
- **Cart drawer (Framer):** slides in from the right with a backdrop blur, items stagger in, quantity changes animate the number.
- **Mobile menu (Framer):** full-screen white panel, links reveal by line with stagger, droplet decoration.
- Skeleton shimmer while loading. All store motion must keep LCP fast (no heavy pins or parallax on these routes).

---

## 8. PERFORMANCE AND QUALITY BAR

- Lighthouse performance 85+ on mobile for Home, 90+ for store pages.
- Lazy-load below-the-fold sections and heavy effects (droplets, ripples) with dynamic import. Prioritize only the hero image/slot and fonts.
- WebP/AVIF images with `next/image`; reserve dimensions to prevent layout shift.
- Cap the animated particle count on mobile; pause everything off-screen.
- Accessible: semantic landmarks, alt text, keyboard navigation, visible focus, reduced-motion fallbacks, skip link. Do not trap scroll in pinned sections.
- Clean typed code, small reusable components, brief comments on the non-obvious timeline choices.
- Test: Chrome, Safari (including iOS), Firefox; mid-range Android; resize and orientation change without broken triggers.

---

## 9. PROJECT STRUCTURE

```
app/
  (brand)/page.tsx           # animated Home
  (brand)/story/page.tsx
  (shop)/collections/[handle]/page.tsx
  (shop)/products/[handle]/page.tsx
  layout.tsx                 # fonts, Lenis provider, cursor, transition overlay
components/
  motion/                    # SplitReveal, ScrollWords, MaskReveal, Parallax, PinSection,
                             # Magnetic, Marquee, Counter, WaveDivider, Ripple, FloatingDroplets
  sections/                  # Loader, Hero, Statement, ProductStory, Ingredients,
                             # Collection, Featured, MarqueeBand, Trust, Testimonials, FinalCta, Footer
  ui/                        # Button, ProductCard, ProductSlot, Logo, CartDrawer, MobileMenu, Cursor
lib/
  gsap.ts                    # plugin registration (one place)
  lenis.tsx                  # provider and GSAP sync
  shopify.ts                 # Storefront API client (mock data first)
motion.config.ts
assets.config.ts
tailwind.config.ts           # color and type tokens
README.md                    # setup, motion guide, "Replacing assets"
```

---

## 10. BUILD PHASES (stop after each and tell me what to review)

1. **Setup:** project, tokens, self-hosted fonts, Tailwind theme, `lib/gsap.ts`, Lenis + GSAP sync, `motion.config.ts`, `assets.config.ts`, placeholder `<Logo />` and `<ProductSlot />`, debug mode.
2. **Motion primitives:** all components in section 4, each with a small demo route (`/lab`) so I can see them working.
3. **Global alive layer:** header behavior, cursor, scroll progress, magnetic buttons, ambient blobs, page-transition overlay.
4. **Loader + Hero** (full intro, idle, mouse parallax, scrubbed pin).
5. **Statement + Product story + Ingredients + Wave divider.**
6. **Collection (horizontal) + Featured + Marquee + Trust + Testimonials + Final CTA + Footer.**
7. **Store pages** with demo data, fly-to-cart, cart drawer, mobile menu.
8. **Polish:** mobile versions of every pinned section, reduced-motion pass, performance and accessibility audit, README.

**Definition of done for each phase:** it runs without console errors; there are no jank or layout jumps on resize; every animation has a cleanup path; mobile fallback exists; and swapping `assets.config.ts` to a real image or logo changes the visuals without touching section code.

Start with Phase 1 now.
