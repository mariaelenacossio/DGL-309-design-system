import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Leaf, Shield, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { imgUrl } from '@/utils/assets'
import { WebsiteHero } from '@/components/organisms/Hero'
import { ProductCard } from '@/components/molecules/Card'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Heading, Text } from '@/components/atoms/Typography'
import { cn } from '@/utils/cn'

/* ─── Data ────────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name:        'C-Bright Eye Cream',
    price:       '$25',
    image:       imgUrl('product-1.jpg'),
    description: 'Brightening vitamin C formula that reduces dark circles and fine lines.',
    badge:       'Best Seller',
  },
  {
    id: 2,
    name:        'Homemade Lip Scrub',
    price:       '$16',
    image:       imgUrl('product-2.jpg'),
    description: 'Sugar-based exfoliant with sweet almond oil for soft, plump lips.',
  },
  {
    id: 3,
    name:        'Niacinamide Booster Serum',
    price:       '$35',
    image:       imgUrl('product-3.jpg'),
    description: '10% niacinamide and zinc formula to minimise pores and even skin tone.',
    badge:       'Top Rated',
  },
  {
    id: 4,
    name:        'Rosehip Face Oil',
    price:       '$44',
    image:       imgUrl('product-4.jpg'),
    description: 'Rich in vitamin A and antioxidants for regenerative overnight care.',
    badge:       'New',
  },
  {
    id: 5,
    name:        'Hyaluronic Acid Serum',
    price:       '$22',
    image:       imgUrl('product-5.jpg'),
    description: 'Multi-weight hyaluronic acid for deep and surface-level hydration.',
  },
]

const routineSteps = [
  {
    step: '01', label: 'Tone',       icon: '💧',
    desc: 'Balance pH and prep skin to absorb treatments.',
    image: imgUrl('noah-usry-cojUQF-9GT0-unsplash.jpg'),
  },
  {
    step: '02', label: 'Serum',      icon: '✨',
    desc: 'Target specific concerns with concentrated actives.',
    image: imgUrl('product-3.jpg'),
  },
  {
    step: '03', label: 'Moisturise', icon: '🌿',
    desc: 'Lock in hydration and strengthen the skin barrier.',
    image: imgUrl('cheyenne-doig-qTBDxXIoCL4-unsplash.jpg'),
  },
  {
    step: '04', label: 'Sunscreen',  icon: '☀️',
    desc: 'Daily SPF protection — the most important step.',
    image: imgUrl('content-pixie-0z4h9qneDMA-unsplash.jpg'),
  },
]

const values = [
  { Icon: Leaf,     title: 'Clean Ingredients',  desc: 'Only INCI-listed, ethically sourced actives. No harmful fillers, no greenwashing.' },
  { Icon: Shield,   title: 'Dermatologist Tested',desc: 'Every formula is clinically validated for safety and efficacy on all skin types.' },
  { Icon: Sparkles, title: 'Science-Backed',      desc: 'Evidence-based concentrations of proven actives. Real results, not marketing.' },
]

/* ─── Carousel ────────────────────────────────────────────────────────────── */
function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const visible = 3
  const max     = products.length - visible

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-400 ease-in-out"
          style={{ transform: `translateX(calc(-${index} * (100% / ${visible} + 16px / ${visible})))` }}
        >
          {products.map(p => (
            <div key={p.id} className="shrink-0" style={{ width: `calc(${100/visible}% - ${(visible-1)*16/visible}px)` }}>
              <ProductCard {...p} onAddToCart={() => {}} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous products"
          className="h-10 w-10 rounded-full flex items-center justify-center border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 transition-all"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to product group ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all',
                i === index
                  ? 'w-6 bg-primary-500'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400',
              )}
            />
          ))}
        </div>

        <button
          onClick={() => setIndex(i => Math.min(max, i + 1))}
          disabled={index >= max}
          aria-label="Next products"
          className="h-10 w-10 rounded-full flex items-center justify-center border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 transition-all"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export function WebsiteHome() {
  return (
    <div>
      {/* Hero */}
      <WebsiteHero
        headline="Skincare backed by science. Loved by skin."
        subheadline="Evidence-based formulations designed for real results. No fluff, no fillers — just what your skin actually needs."
        image={imgUrl('shifaaz-shamoon-CE5wcAmL7gg-unsplash.jpg')}
        badge="New Arrivals Just Landed"
        ctaLabel="Shop Best Sellers"
      />

      {/* Values */}
      <section aria-labelledby="values-heading" className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container-ds">
          <div className="text-center mb-12">
            <Badge variant="secondary" dot className="mb-3">Why Beyond</Badge>
            <Heading level={2} id="values-heading" size="xl">Skincare you can trust</Heading>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-neutral-800 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                <span className="h-14 w-14 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 mb-4">
                  <v.Icon size={28} aria-hidden="true" />
                </span>
                <Heading level={3} size="sm" className="mb-2">{v.title}</Heading>
                <Text size="sm" color="muted" className="text-center">{v.desc}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="products" aria-labelledby="products-heading" className="py-20 bg-white dark:bg-neutral-800/20">
        <div className="container-ds">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="primary" dot className="mb-2">Curated</Badge>
              <Heading level={2} id="products-heading" size="xl">Best Sellers</Heading>
              <Text color="muted" className="mt-1">Our most-loved formulations, tried and tested by thousands.</Text>
            </div>
            <Link to="/website/contact">
              <Button variant="outline" iconRight={<ArrowRight size={16} />}>
                View all products
              </Button>
            </Link>
          </div>
          <ProductCarousel />
        </div>
      </section>

      {/* Routine */}
      <section id="routine" aria-labelledby="routine-heading" className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container-ds">
          <div className="text-center mb-12">
            <Badge variant="secondary" dot className="mb-3">Your Daily Ritual</Badge>
            <Heading level={2} id="routine-heading" size="xl">Build Your Routine</Heading>
            <Text color="muted" className="mt-2 max-w-lg mx-auto">
              Four steps. Proven results. Start with the essentials and build from there.
            </Text>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {routineSteps.map(step => (
              <div
                key={step.step}
                className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-elevation-1 hover:shadow-elevation-3 transition-all hover:-translate-y-1"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                  <img
                    src={step.image}
                    alt={step.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {step.step}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span aria-hidden="true">{step.icon}</span>
                    <Heading level={3} size="sm">{step.label}</Heading>
                  </div>
                  <Text size="sm" color="muted">{step.desc}</Text>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/website/contact">
              <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                Take the Skin Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-heading" className="py-20 bg-white dark:bg-neutral-800/20">
        <div className="container-ds">
          <div className="text-center mb-12">
            <Heading level={2} id="reviews-heading" size="xl">What our customers say</Heading>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah K.', text: 'The Niacinamide serum changed my skin. Pores are visibly smaller after just 3 weeks. I\'m obsessed.', rating: 5, product: 'Niacinamide Booster' },
              { name: 'Mia R.',   text: 'Finally found an eye cream that actually works. My dark circles are so much better now. Gentle and effective.', rating: 5, product: 'C-Bright Eye Cream' },
              { name: 'James T.', text: 'Sceptic turned believer. The Rosehip Oil is luxurious and my skin glows every morning. 100% worth it.', rating: 5, product: 'Rosehip Face Oil' },
            ].map(r => (
              <figure key={r.name} className="flex flex-col bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex gap-0.5 mb-3" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" aria-hidden="true" className="text-cta-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-body-sm text-neutral-700 dark:text-neutral-300 italic text-pretty mb-4">
                  "{r.text}"
                </blockquote>
                <figcaption>
                  <p className="text-label-md font-semibold text-neutral-900 dark:text-neutral-100">{r.name}</p>
                  <p className="text-body-xs text-neutral-500 dark:text-neutral-400">{r.product}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section aria-label="Newsletter" className="gradient-brand py-16">
        <div className="container-ds text-center">
          <Heading level={2} size="xl" className="text-white mb-3">
            Get 15% off your first order
          </Heading>
          <Text className="text-white/80 mb-8 max-w-md mx-auto">
            Sign up for science-backed skincare tips, exclusive offers, and early access to new launches.
          </Text>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              className="flex-1 h-11 px-4 rounded-xl text-sm bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button variant="cta" size="md" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
