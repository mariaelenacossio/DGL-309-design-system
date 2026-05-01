/**
 * Central product catalog for the BEYOND Skincare website.
 *
 * Each product has structured concern/skin-type tags so the Skin Quiz can
 * match recommendations against quiz answers.
 */
import { imgUrl } from '@/utils/assets'

export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal'
export type Concern  = 'acne' | 'dullness' | 'dark-spots' | 'fine-lines' | 'redness' | 'dryness' | 'large-pores' | 'uneven-tone'
export type Step     = 'cleanser' | 'tone' | 'serum' | 'moisturiser' | 'sunscreen' | 'eye' | 'treatment'

export interface Product {
  id:           number
  slug:         string
  name:         string
  priceCents:   number          // store in cents to avoid float math
  image:        string
  description:  string
  badge?:       string
  step:         Step             // which step in the routine this fills
  forSkin:      SkinType[]       // skin types this works well for
  forConcerns:  Concern[]        // concerns this addresses
  size?:        string
}

/** Format cents as USD currency string. */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'c-bright-eye-cream',
    name: 'C-Bright Eye Cream',
    priceCents: 2500,
    size: '15 ml',
    image: imgUrl('product-1.jpg'),
    description: 'Brightening vitamin C formula that reduces dark circles and fine lines.',
    badge: 'Best Seller',
    step: 'eye',
    forSkin:     ['normal', 'dry', 'combination', 'sensitive'],
    forConcerns: ['fine-lines', 'dullness', 'dark-spots'],
  },
  {
    id: 2,
    slug: 'homemade-lip-scrub',
    name: 'Homemade Lip Scrub',
    priceCents: 1600,
    size: '10 g',
    image: imgUrl('product-2.jpg'),
    description: 'Sugar-based exfoliant with sweet almond oil for soft, plump lips.',
    step: 'treatment',
    forSkin:     ['normal', 'dry', 'combination', 'sensitive', 'oily'],
    forConcerns: ['dryness'],
  },
  {
    id: 3,
    slug: 'niacinamide-booster-serum',
    name: 'Niacinamide Booster Serum',
    priceCents: 3500,
    size: '30 ml',
    image: imgUrl('product-3.jpg'),
    description: '10% niacinamide and zinc formula to minimise pores and even skin tone.',
    badge: 'Top Rated',
    step: 'serum',
    forSkin:     ['oily', 'combination', 'normal'],
    forConcerns: ['acne', 'large-pores', 'uneven-tone', 'dullness'],
  },
  {
    id: 4,
    slug: 'rosehip-face-oil',
    name: 'Rosehip Face Oil',
    priceCents: 4400,
    size: '30 ml',
    image: imgUrl('product-4.jpg'),
    description: 'Rich in vitamin A and antioxidants for regenerative overnight care.',
    badge: 'New',
    step: 'treatment',
    forSkin:     ['dry', 'normal', 'combination'],
    forConcerns: ['fine-lines', 'dryness', 'dullness'],
  },
  {
    id: 5,
    slug: 'hyaluronic-acid-serum',
    name: 'Hyaluronic Acid Serum',
    priceCents: 2200,
    size: '30 ml',
    image: imgUrl('product-5.jpg'),
    description: 'Multi-weight hyaluronic acid for deep and surface-level hydration.',
    step: 'serum',
    forSkin:     ['dry', 'normal', 'combination', 'sensitive', 'oily'],
    forConcerns: ['dryness', 'fine-lines'],
  },
  {
    id: 6,
    slug: 'gentle-gel-cleanser',
    name: 'Gentle Gel Cleanser',
    priceCents: 2000,
    size: '150 ml',
    image: imgUrl('product-1.jpg'),
    description: 'pH-balanced gel cleanser that removes impurities without stripping the skin barrier.',
    step: 'cleanser',
    forSkin:     ['normal', 'oily', 'combination', 'sensitive', 'dry'],
    forConcerns: ['acne', 'large-pores', 'redness'],
  },
  {
    id: 7,
    slug: 'rose-balancing-toner',
    name: 'Rose Balancing Toner',
    priceCents: 2400,
    size: '200 ml',
    image: imgUrl('product-2.jpg'),
    description: 'Alcohol-free toner with rose water and centella asiatica to calm and balance.',
    step: 'tone',
    forSkin:     ['sensitive', 'normal', 'dry', 'combination'],
    forConcerns: ['redness', 'dryness'],
  },
  {
    id: 8,
    slug: 'barrier-repair-cream',
    name: 'Barrier Repair Cream',
    priceCents: 3800,
    size: '50 ml',
    image: imgUrl('product-3.jpg'),
    description: 'Ceramide-rich moisturiser that restores and strengthens the skin barrier.',
    step: 'moisturiser',
    forSkin:     ['dry', 'sensitive', 'normal'],
    forConcerns: ['dryness', 'redness', 'fine-lines'],
  },
  {
    id: 9,
    slug: 'oil-control-moisturiser',
    name: 'Oil-Control Moisturiser',
    priceCents: 3200,
    size: '50 ml',
    image: imgUrl('product-4.jpg'),
    description: 'Lightweight gel-cream with niacinamide and zinc for a mattified finish.',
    step: 'moisturiser',
    forSkin:     ['oily', 'combination'],
    forConcerns: ['acne', 'large-pores'],
  },
  {
    id: 10,
    slug: 'mineral-spf-50',
    name: 'Mineral SPF 50',
    priceCents: 2800,
    size: '50 ml',
    image: imgUrl('product-5.jpg'),
    description: 'Broad-spectrum mineral sunscreen with zinc oxide. No white cast, no chemical filters.',
    badge: 'Daily',
    step: 'sunscreen',
    forSkin:     ['normal', 'oily', 'combination', 'sensitive', 'dry'],
    forConcerns: ['fine-lines', 'dark-spots', 'redness', 'uneven-tone'],
  },
  {
    id: 11,
    slug: 'retinol-renewal-serum',
    name: 'Retinol Renewal Serum',
    priceCents: 4800,
    size: '30 ml',
    image: imgUrl('product-1.jpg'),
    description: 'Encapsulated 0.5% retinol for smoother texture and reduced fine lines.',
    badge: 'PM only',
    step: 'serum',
    forSkin:     ['normal', 'oily', 'combination'],
    forConcerns: ['fine-lines', 'acne', 'uneven-tone'],
  },
  {
    id: 12,
    slug: 'vitamin-c-serum',
    name: 'Vitamin C Serum 15%',
    priceCents: 3900,
    size: '30 ml',
    image: imgUrl('product-2.jpg'),
    description: 'Stable 15% L-ascorbic acid serum that brightens and protects against environmental damage.',
    step: 'serum',
    forSkin:     ['normal', 'oily', 'combination', 'dry'],
    forConcerns: ['dullness', 'dark-spots', 'uneven-tone'],
  },
]

/** Lookup helper. */
export const findProduct = (id: number) => products.find(p => p.id === id)
