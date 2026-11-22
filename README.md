# GLASYAN — High Alpine Hair Essence & Cellular Alchemy

A cinematic, luxury e-commerce and brand experience engineered with **Next.js 15 (App Router)**, **GSAP 3.12+ (ScrollTrigger, Observer, Flip, CustomEase)**, **Lenis Smooth Scroll**, and **Framer Motion**.

---

## 1. Brand System & Color Tokens

| Token | Hex Value | Primary Purpose |
|---|---|---|
| `--teal` | `#008C95` | Brand accent: large headlines, buttons, droplet, wave, ripples |
| `--teal-deep` | `#005A61` | Small text, hovers, high contrast details |
| `--ink` | `#0A2E32` | Body typography & high readability surfaces |
| `--aqua-mist` | `#E4F2F3` | Subtle tinted section backdrops |
| `--aqua-light` | `#7FC4C9` | Secondary water ripples & soft gradients |
| `--pearl` | `#F7FAFA` | Off-white luxury surfaces and cards |
| `--white` | `#FFFFFF` | Core immaculate backdrop |
| `--champagne` | `#C8B58F` | Hairlines, reviews, and micro-accents |

### Typography
- **Melodrama**: Display titles, numerals, and luxury brand statements.
- **Satoshi / Plus Jakarta Sans**: Clean grotesk sans for body copy, navigational links, and technical specs.

---

## 2. Replacing Assets (The Swappable Placeholder System)

The entire website is designed around **swappable assets** configured in a single location: `assets.config.ts`.
All animation choreographies target component wrappers rather than inner asset geometries, guaranteeing that swapping placeholders for final 3D bottle renders or photo sequences requires **zero modifications to section or animation code**.

### How to Swap Assets

1. **Brand Logo (`/public/brand/logo-placeholder.svg`)**:
   - When replacing with your official SVG, ensure your SVG retains the three core group IDs:
     - `<g id="drop">`: Targeted by droplet loader fall & header breathing loop.
     - `<g id="wave">`: Targeted by DrawSVG wave sweeps.
     - `<g id="wordmark">`: Targeted by masked letter stagger reveals.
   - Update `assets.logo.svg` in `assets.config.ts` if using a new path.

2. **Hero Product Capsule (`<ProductSlot />`)**:
   - In `assets.config.ts`, change `heroProduct.type` from `"placeholder"` to `"image"`:
     ```ts
     heroProduct: {
       type: "image",
       src: "/brand/final-bottle-render.png",
       alt: "Glasyan Glacial Elixir Bottle"
     }
     ```
   - The `<ProductSlot />` component will automatically render your transparent high-res bottle shot with zero layout shift and preserve all floating, mouse parallax, and scroll scrub choreographies.

3. **Products & Collections**:
   - Edit the `products` array in `assets.config.ts` to adjust pricing, names, volume sizes, or attach real product imagery.
   - Edit `collections` to expand or regroup formulations.

4. **Ingredient Photos**:
   - The 5 ingredient photos are located in `/public/ingredients/`:
     - `glacier-water.jpg`
     - `pearl-protein.jpg`
     - `sea-kelp.jpg`
     - `rose-hydrosol.jpg`
     - `argan-oil.jpg`
   - You can replace these images directly with matching file names, or update paths in `assets.ingredients`.

---

## 3. Motion Architecture & System Rules

- **Motion Tokens**: Centralized in `motion.config.ts` with custom easing curves (`glasyan: "0.22, 1, 0.36, 1"`).
- **GSAP & Lenis Sync**: Driven via `lib/lenis.tsx` and `lib/gsap.ts`. `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- **Motion Primitives (`/components/motion/`)**:
  - `<SplitReveal>`: Character, word, or line masked reveal.
  - `<ScrollWords>`: Text scrub transitioning from 15% opacity to full ink with teal keyword highlights.
  - `<MaskReveal>`: Clip-path inset morph with inner scale dampening and parallax.
  - `<Parallax>`: Multi-layer yPercent velocity offsets.
  - `<PinSection>`: Pinned viewport choreography with `anticipatePin: 1`.
  - `<Magnetic>` & `<MagneticButton>`: Cursor attraction and directional sweep ripple.
  - `<Marquee>`: Infinite loop dynamically accelerated by scroll velocity.
  - `<Counter>`: Melodrama tabular numerals count-up.
  - `<WaveDivider>`: Scrubbed SVG wave path morphing.
  - `<Ripple>`: Concentric expanding water rings.
  - `<FloatingDroplets>`: Randomly drifting micro-droplets paused when off-screen.

### Motion Debug Mode
Append `?motion=debug` to any URL (e.g. `http://localhost:3000/?motion=debug`) to toggle on the developer panel, showing ScrollTrigger visual markers and a global animation speed slider (0.5x to 2x).

### Motion Laboratory Route
Visit `/lab` to interact with and verify every single motion primitive in an isolated sandbox.

---

## 4. Development & Production Commands

```bash
# Run local development server
npm run dev

# Compile production build
npm run build

# Start production server
npm start
```
