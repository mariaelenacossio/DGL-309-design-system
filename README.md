<div align="center">
  <img src="img/B-logo-2.png" alt="BEYOND Skincare" height="80" />

  <h1>BEYOND Skincare — Design System</h1>

  <p>A modern, production-ready design system <strong>and a fully shoppable e-commerce sample site</strong> built with React 18, TypeScript, Vite, and Tailwind CSS. Powers the BEYOND Skincare brand with a consistent visual language, accessible UI components, an interactive documentation hub, a personalised <em>Skin Quiz</em>, a working <em>Cart</em>, and a <em>3-step Checkout</em> flow.</p>

  <p>
    <a href="https://mariaelenacossio.github.io/DGL-309-design-system/" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Site-Visit%20Now-072ac8?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" />
    </a>
    &nbsp;
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
    &nbsp;
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    &nbsp;
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    &nbsp;
    <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" />
  </p>

  <img src="img/B-Skincare.png" alt="BEYOND Skincare Design System" width="420" />
</div>

---

## ✨ Highlights

- 🎨 **Comprehensive design token system** — colors, typography, spacing, and shadows all defined as structured tokens with light and dark variants
- 🌙 **Seamless dark / light mode** — OS preference detection, `localStorage` persistence, zero flash on load
- ♿ **WCAG 2.1 AA accessible** — `focus-visible` rings, `aria-*` attributes, `role="alert"/"status"`, skip-to-main link, and screen-reader-friendly semantics throughout
- 🧩 **Atomic component library** — 20+ components organized across atoms → molecules → organisms
- 📖 **Interactive documentation hub** — live component previews, color swatches with click-to-copy hex, type scale explorer, spacing visualizer, form playground, and navigation demos
- 💄 **Fully shoppable BEYOND Skincare site** — real catalog, persistent cart, 3-step checkout with order confirmation, and a personalised 6-step Skin Quiz with a smart recommendation engine
- ⚡ **Vite 5 + HMR** — instant hot module replacement during development
- 🔒 **Strict TypeScript** — every component fully typed with `forwardRef`, `useId`, and proper HTML attribute extension
- 🧪 **Lint-clean** — strict ESLint v9 flat-config, zero warnings on `--max-warnings 0`

---

## 🚀 Live Site

**[→ View the Design System](https://mariaelenacossio.github.io/DGL-309-design-system/)**

The live site includes:
| Section | URL path |
|---|---|
| DS Home | `#/` |
| Colors | `#/design-system/colors` |
| Typography | `#/design-system/typography` |
| Spacing | `#/design-system/spacing` |
| Components | `#/design-system/components` |
| Forms | `#/design-system/forms` |
| Navigation | `#/design-system/navigation` |
| Images | `#/design-system/images` |
| BEYOND Home | `#/website` |
| **Skin Quiz** ⭐ | `#/website/skin-quiz` |
| Contact | `#/website/contact` |

---

## 🛒 The Functional Website

The BEYOND Skincare site is **not just a visual showcase** — it's a working e-commerce experience that demonstrates how the design system composes into a real product.

### 🧪 Skin Quiz (6-step personalisation wizard)

A research-driven product finder modeled on patterns from Kiehl's Healthy Skin Care Routine Finder and The INKEY List Recipe Builder, but tuned to BEYOND's voice.

| Step | Question | Input |
|---|---|---|
| 1 | What's your skin type? | 5 cards: oily / dry / combination / sensitive / normal |
| 2 | What are your top concerns? | Multi-select chips: 8 options (acne, dullness, dark spots, fine lines, redness, dryness, large pores, uneven tone) |
| 3 | What's your skin goal? | 5 single-select options (clarity, glow, hydration, even tone, anti-age) |
| 4 | How much routine do you want? | 4 cards: minimal (2 steps) → core (4) → complete (5) → expert (7) |
| 5 | Are you sensitive to actives? | Yes/No — sensitivity flag downranks retinol |
| 6 | Email (optional) | Save results + 15% off code |

**Smart recommendation engine** — every product carries structured tags (`forSkin: SkinType[]`, `forConcerns: Concern[]`, `step`). The engine scores each candidate against the answers (skin type +4, each matching concern +3, goal-aligned concern +2, retinol −10 if sensitive) and returns the top product per routine step.

**Result page**: animated success badge, profile chips (skin type, concerns, sensitivity), numbered routine list with step labels (Cleanse / Tone / Treat / Moisturise / Protect / Eye / Boost), per-product "Add only this", and a single **"Add full routine to bag"** CTA.

### 🛍 Cart system (persistent, real)

- **Live count badge** in the navbar — updates as items are added
- **Slide-in Cart Drawer** — backdrop blur, body-scroll lock, Esc to close
- **Per-line quantity steppers** (`+ / −`) with optimistic updates; stepping below 1 removes the item
- **Live subtotal** with free-shipping threshold messaging
- **Persistence** — items survive page reload via `localStorage` (degrades gracefully to in-memory if storage is unavailable)
- **Empty state** with illustration + "Continue Shopping" / "Take the Skin Quiz" CTAs

### 💳 Checkout flow (3 steps + confirmation)

A modal-based checkout that mirrors how Stripe / Shopify present a guided flow.

1. **Shipping** — email, name, street, city, postal, country (Canada / US / Mexico / UK)
2. **Payment** — card number with auto-formatted spaces, MM/YY auto-format, CVC, "Save card" toggle, demo banner with `4242 4242 4242 4242` test card
3. **Review** — line-item summary, edit-back links, shipping calc (free over $50, otherwise $5.99), 5% tax, total
4. **Success** — animated confirmation, generated order number (`BEY-XXXXXX-YYY`), email confirmation, estimated delivery, auto-empties cart

Per-step validation (email format, card length, expiry pattern, CVC length); all data preserved across back navigation.

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI rendering, hooks, StrictMode |
| TypeScript | 5 | Full static typing across all components |
| Vite | 5 | Build tool, HMR, path aliases |
| Tailwind CSS | 3 | Utility-first styling, design token integration |
| React Router | 6 (HashRouter) | Client-side routing — works on GitHub Pages with no server config |
| **React Context** | (built-in) | Cart state + persistence layer |
| Lucide React | latest | Icon library |
| clsx + tailwind-merge | latest | Safe conditional class composition via `cn()` |
| ESLint | 9 (flat config) | Strict linting with zero warnings tolerance |

---

## 🗂 Project Structure

```
├── img/                            # Brand assets and product photography
├── src/
│   ├── components/
│   │   ├── atoms/                  # Button, Badge, Avatar, Input, Spinner, Typography, ThemeToggle
│   │   ├── molecules/              # Card, FormField, Alert, Modal
│   │   └── organisms/              # Navbar, Footer, Hero,
│   │                               #   CartDrawer, CheckoutModal      ← NEW
│   ├── context/
│   │   └── CartContext.tsx         # Cart provider + useCart hook     ← NEW
│   ├── data/
│   │   └── products.ts             # Centralized product catalog with
│   │                               #   skin-type / concern tags        ← NEW
│   ├── hooks/
│   │   └── useTheme.ts             # Dark/light mode with OS sync + localStorage
│   ├── pages/
│   │   ├── design-system/          # DS docs: Colors, Typography, Spacing,
│   │   │                           #   Components, Forms, Navigation, Images
│   │   └── website/                # WebsiteHome, WebsiteContact,
│   │                               #   SkinQuiz                        ← NEW
│   ├── tokens/                     # colors.ts, typography.ts, spacing.ts, shadows.ts
│   ├── styles/
│   │   └── globals.css             # CSS custom properties for semantic tokens
│   └── utils/
│       ├── assets.ts               # imgUrl() — base-aware image resolver
│       └── cn.ts                   # clsx + tailwind-merge utility
├── archive/                        # Original static HTML/CSS preserved for reference
├── public/img                      # Symlink → ../img (Vite static serving)
├── eslint.config.js                # ESLint v9 flat config             ← NEW
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Design Tokens

### Color Scales
| Token | Value | Usage |
|---|---|---|
| `primary-600` | `#072ac8` | CTAs, focus rings, links |
| `secondary-500` | `#1e96fc` | Supporting accents |
| `accent-300` | `#a2d6f9` | Light backgrounds, chips |
| `cta-400` | `#fcf300` | Primary CTA buttons |
| `neutral-50` | `#fafbfc` | Light surface |
| `neutral-900` | `#111827` | Dark surface |

### Type Scale (15 steps)
```
display-lg → display-md → display-sm
heading-xl → heading-lg → heading-md → heading-sm → heading-xs
body-lg → body-md → body-sm → body-xs
label-lg → label-md → label-sm
```

### Spacing (4px base unit)
```
1 → 4px   |   4 → 16px   |   8 → 32px   |   16 → 64px   |   24 → 96px
```

---

## 🧩 Component Library

### Atoms
| Component | Variants / Notes |
|---|---|
| `Button` | 6 variants (primary, secondary, accent, ghost, danger, outline, cta), 5 sizes, loading state, icon slots |
| `Badge` | 8 variants, 3 sizes, optional dot indicator |
| `Avatar` | Image or initials fallback, status indicator, 6 sizes |
| `Input` | Default / Filled / Flushed, error & success states, icon slots, `aria-invalid` |
| `Textarea` | Matches Input variants, auto-resize ready |
| `Select` | Matches Input variants, custom chevron |
| `Spinner` | 5 sizes, `role="status"` |
| `Typography` | `Heading`, `Text`, `Label`, `Code` with full scale props |
| `ThemeToggle` | Animated pill, Sun/Moon icons, calls `useTheme()` |

### Molecules
| Component | Variants / Notes |
|---|---|
| `Card` | 5 variants (default, elevated, outlined, filled, glass) + `ProductCard` |
| `FormField` | Render-prop pattern, `useId()`, `aria-live` error messages |
| `Checkbox` | Indeterminate state, `aria-checked` |
| `RadioGroup` / `RadioOption` | Accessible grouping with `role="radiogroup"` |
| `Alert` | 4 variants, `role="alert"` (warning/danger) / `role="status"` (info/success), dismissible |
| `Modal` | Native `<dialog>`, `showModal()`, backdrop-click dismissal, `aria-labelledby` / `aria-describedby`, `useModal()` hook |

### Organisms
| Component | Notes |
|---|---|
| `Navbar` | Responsive, theme toggle, BEYOND logo, mobile hamburger |
| `DSSidebar` | Documentation nav with section groups |
| `Footer` | Brand block, links, copyright, navigates with section-scroll memory |
| `DSHero` | Full-bleed gradient hero for DS pages — uses `<Link>` (SPA-safe) |
| `WebsiteHero` | Product hero with image prop, configurable CTA + "Learn More" handlers |
| **`CartDrawer`** ⭐ | Slide-in cart panel — items, qty steppers, subtotal, checkout CTA |
| **`CheckoutModal`** ⭐ | 3-step wizard (Shipping → Payment → Review) + success screen |

---

## 💻 Usage Examples

### Button
```tsx
import { Button } from '@/components/atoms/Button'

<Button variant="primary" size="md" iconRight={<ArrowRight />}>
  Explore Components
</Button>

<Button variant="cta" loading={isSubmitting}>
  Add to Cart
</Button>
```

### Card
```tsx
import { Card, CardHeader, CardContent, ProductCard } from '@/components/molecules/Card'

<Card variant="elevated">
  <CardHeader title="Niacinamide Booster" subtitle="Brightening serum" />
  <CardContent>...</CardContent>
</Card>

<ProductCard
  name="Rosehip Face Oil"
  price="$38"
  image="/img/product-4.jpg"
  badge="Bestseller"
  onAddToCart={() => add(productId)}
/>
```

### FormField with validation
```tsx
import { FormField } from '@/components/molecules/FormField'
import { Input } from '@/components/atoms/Input'

<FormField label="Email" error={errors.email} required>
  {(id, hasError) => (
    <Input
      id={id}
      type="email"
      aria-invalid={hasError}
      placeholder="hello@beyond.com"
    />
  )}
</FormField>
```

### Cart hook ⭐
```tsx
import { useCart } from '@/context/CartContext'

function ProductButton({ productId }: { productId: number }) {
  const { add, openDrawer, count } = useCart()

  return (
    <button onClick={() => { add(productId); openDrawer() }}>
      Add to bag {count > 0 && `(${count})`}
    </button>
  )
}
```

### Mounting the cart at the layout level ⭐
```tsx
// App.tsx
<CartProvider>
  <Routes>
    <Route path="/website" element={<WebsiteLayout />}>
      <Route index element={<WebsiteHome />} />
      <Route path="skin-quiz" element={<SkinQuiz />} />
      <Route path="contact" element={<WebsiteContact />} />
    </Route>
  </Routes>
</CartProvider>

// WebsiteLayout.tsx — drawer is mounted once and persists across routes
<WebsiteNavbar />
<main><Outlet /></main>
<Footer />
<CartDrawer />
```

### Dark / Light Mode
```tsx
import { useTheme } from '@/hooks/useTheme'

const { theme, toggle, isDark } = useTheme()
// Reads localStorage → falls back to OS prefers-color-scheme
// Toggles .dark class on <html>
```

---

## ♿ Accessibility

- All interactive elements support **keyboard navigation** with `focus-visible:` rings
- Color contrast meets **WCAG 2.1 AA** across light and dark modes
- Form inputs use `aria-invalid`, `aria-describedby`, and `aria-live` for error announcements
- Icons are `aria-hidden="true"` when decorative; labeled when standalone
- Modal traps focus via native `<dialog>` with `showModal()`
- Skip-to-main link on every page layout
- **Cart Drawer** uses `role="dialog"` + `aria-modal="true"`, traps body scroll, closes on Esc
- **Checkout flow** uses an ordered `<ol role="list">` stepper with `aria-current` on the active step
- **Skin Quiz** uses `<fieldset>` / `<legend>` for grouped controls, `aria-pressed` on selected options, and a labelled progress bar

---

## 🏃 Getting Started

```bash
# Clone
git clone https://github.com/mariaelenacossio/DGL-309-design-system.git
cd DGL-309-design-system

# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev

# Production build
npm run build

# Lint (strict — zero warnings allowed)
npm run lint
```

---

## 🧪 Try the Live Flow

1. Open the **[Skin Quiz](https://mariaelenacossio.github.io/DGL-309-design-system/#/website/skin-quiz)**
2. Answer the 6 questions (or skip the email)
3. On the result page, hit **"Add full routine to bag"** — drawer pops with 4–7 personalised products
4. Click **Checkout** in the drawer
5. Walk through Shipping → Payment (use test card `4242 4242 4242 4242`, any future expiry, any CVC) → Review → **Place Order**
6. See the order confirmation — and reload the page mid-flow: your cart persists.

---

## 📋 Changelog

### v2.1.0 — Functional e-commerce ⭐ (current)
- **Skin Quiz** — 6-step personalisation wizard with smart recommendation engine
- **Cart system** — `CartProvider` context, `useCart()` hook, `localStorage` persistence
- **CartDrawer organism** — slide-in panel with qty steppers, live subtotal, empty state
- **CheckoutModal organism** — 3-step wizard (Shipping / Payment / Review) + success screen with order number
- **Centralized product catalog** (`src/data/products.ts`) with `forSkin[]` / `forConcerns[]` / `step` tags powering the recommendation engine
- All "Add to Cart" buttons across the site are now wired to real cart actions
- Live count badge on the navbar bag icon
- Sensitivity-aware quiz logic — downranks retinol when user is flagged sensitive

### v2.0.1 — QA pass
- Replaced `<a href>` with `<Link to>` everywhere SPA navigation is needed (DSHero, WebsiteHero, WebsiteNavbar)
- Hash-anchor scrolling in nav + footer (`/website#products`, `/website#routine`) now works under HashRouter via `location.state` handoff
- Wired previously-dead "Learn More", "Take the Skin Quiz", and "Shop Best Sellers" buttons
- Newsletter form now has real validation + animated success state
- Footer Twitter / Instagram placeholders converted to non-clickable `<span>` elements (no more `href="#"` 404s)
- ESLint v9 migrated to flat config (`eslint.config.js`); pinned `@eslint/js@^9` to align with `eslint@9` peer; lint runs strict (`--max-warnings 0`) and clean

### v2.0.0
- Full migration from static HTML/CSS to React 18 + TypeScript + Vite + Tailwind CSS
- Design token system (colors, typography, spacing, shadows)
- 20+ accessible components across atomic design hierarchy
- Interactive documentation hub with 7 pages
- BEYOND Skincare website rebuilt on the design system
- Dark / light mode with OS sync
- BEYOND Skincare branding throughout (logo, local images, color palette)

### v1.0.0
- Original static HTML/CSS design system (archived in `/archive`)

---

<div align="center">
  <img src="img/B-logo-2.png" alt="BEYOND Skincare" height="40" />
  <br />
  <sub>Designed & built by <strong>Mariaelena Cossio Clark</strong></sub>
</div>
