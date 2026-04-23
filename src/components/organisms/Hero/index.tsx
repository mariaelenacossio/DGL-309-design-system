import { cn } from '@/utils/cn'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

/* ─── DS Hero (documentation site) ───────────────────────────────────────── */
interface DSHeroProps {
  badge?:       string
  title:        string
  subtitle?:    ReactNode
  primaryCta?:  { label: string; to: string }
  secondaryCta?:{ label: string; to: string }
  className?:   string
}

export function DSHero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: DSHeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-500',
        'dark:from-neutral-900 dark:via-primary-900 dark:to-secondary-900',
        className,
      )}
    >
      {/* Background decorators */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-300/10 blur-3xl" />
      </div>

      <div className="container-ds relative py-24 md:py-32 text-center">
        {/* BEYOND Skincare logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/img/B-logo-2.png"
            alt="BEYOND Skincare"
            className="h-14 md:h-16 w-auto brightness-0 invert opacity-90"
          />
        </div>

        {badge && (
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" size="lg" dot className="glass text-white border-white/30">
              {badge}
            </Badge>
          </div>
        )}

        <h1
          id="hero-title"
          className="text-display-md font-bold text-white text-balance mx-auto max-w-4xl"
        >
          {title}
        </h1>

        {subtitle && (
          <div className="mt-6 text-body-lg text-white/80 max-w-2xl mx-auto text-pretty">
            {subtitle}
          </div>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {primaryCta && (
              <a href={primaryCta.to}>
                <Button
                  variant="cta"
                  size="lg"
                  iconRight={<ArrowRight size={18} />}
                >
                  {primaryCta.label}
                </Button>
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.to}>
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/30">
                  {secondaryCta.label}
                </Button>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── Website Hero (BEYOND Skincare) ─────────────────────────────────────── */
interface WebsiteHeroProps {
  headline:    string
  subheadline: string
  image:       string
  badge?:      string
  ctaLabel?:   string
  onCta?:      () => void
  className?:  string
}

export function WebsiteHero({
  headline,
  subheadline,
  image,
  badge,
  ctaLabel = 'Shop Now',
  onCta,
  className,
}: WebsiteHeroProps) {
  return (
    <section
      aria-label="Hero"
      className={cn(
        'relative min-h-[85vh] flex items-center overflow-hidden bg-neutral-900',
        className,
      )}
    >
      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-transparent" />
      </div>

      <div className="container-ds relative z-10 py-20">
        <div className="max-w-xl">
          {badge && (
            <Badge variant="secondary" dot className="mb-4">
              <Sparkles size={12} aria-hidden="true" className="mr-1" />
              {badge}
            </Badge>
          )}

          <h1 className="text-display-md font-bold text-white text-balance leading-tight">
            {headline}
          </h1>

          <p className="mt-4 text-body-lg text-white/80 text-pretty">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="cta"
              size="lg"
              iconRight={<ArrowRight size={18} />}
              onClick={onCta}
            >
              {ctaLabel}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/30"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
