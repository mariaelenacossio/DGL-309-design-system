import { Link } from 'react-router-dom'
import { Palette, Type, AlignLeft, Layers, FileInput, Navigation, Image, BookOpen, ArrowRight } from 'lucide-react'
import { DSHero } from '@/components/organisms/Hero'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/molecules/Card'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/utils/cn'

const sections = [
  {
    title: 'Colors',
    description: 'Primary, secondary, accent, and semantic colour tokens with WCAG-compliant contrast.',
    to:    '/design-system/colors',
    Icon:  Palette,
    badge: 'Tokens',
    color: 'text-primary-500',
    bg:    'bg-primary-50 dark:bg-primary-900/20',
  },
  {
    title: 'Typography',
    description: 'Typographic scale from display headings to body text and label styles.',
    to:    '/design-system/typography',
    Icon:  Type,
    badge: 'Tokens',
    color: 'text-secondary-500',
    bg:    'bg-secondary-50 dark:bg-secondary-900/20',
  },
  {
    title: 'Spacing',
    description: '4px base-unit spacing scale, container widths, and layout guidelines.',
    to:    '/design-system/spacing',
    Icon:  AlignLeft,
    badge: 'Tokens',
    color: 'text-accent-500',
    bg:    'bg-accent-50 dark:bg-accent-900/20',
  },
  {
    title: 'Components',
    description: 'Buttons, badges, cards, avatars, spinners and more — all accessible and themeable.',
    to:    '/design-system/components',
    Icon:  Layers,
    badge: 'UI',
    color: 'text-purple-500',
    bg:    'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    title: 'Forms',
    description: 'Inputs, textareas, selects, checkboxes, radio groups and form validation patterns.',
    to:    '/design-system/forms',
    Icon:  FileInput,
    badge: 'UI',
    color: 'text-pink-500',
    bg:    'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    title: 'Navigation',
    description: 'Navbar, sidebar, breadcrumbs and mobile menu patterns with keyboard support.',
    to:    '/design-system/navigation',
    Icon:  Navigation,
    badge: 'Patterns',
    color: 'text-teal-500',
    bg:    'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    title: 'Images & Media',
    description: 'Aspect ratio utilities, responsive image grids, thumbnails and overlays.',
    to:    '/design-system/images',
    Icon:  Image,
    badge: 'Patterns',
    color: 'text-orange-500',
    bg:    'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    title: 'Sample Website',
    description: 'See the full BEYOND Skincare website built with this design system.',
    to:    '/website',
    Icon:  BookOpen,
    badge: 'Live',
    color: 'text-cta-600',
    bg:    'bg-cta-50 dark:bg-cta-900/20',
  },
]

export function DSHome() {
  return (
    <div>
      <DSHero
        badge="v2.0 · React + Tailwind CSS · DGL-309"
        title="BEYOND Skincare Design System"
        subtitle="The design language powering BEYOND Skincare. A modern, accessible, and scalable component library built with React, TypeScript, and Tailwind CSS."
        primaryCta={{ label: 'Explore Components', to: '/design-system/components' }}
        secondaryCta={{ label: 'View BEYOND Site', to: '/website' }}
      />

      <div className="container-ds py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Components',     value: '20+' },
            { label: 'Design Tokens',  value: '100+' },
            { label: 'Colour Scales',  value: '5'    },
            { label: 'Accessible',     value: 'WCAG 2.1 AA' },
          ].map(stat => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
            >
              <p className="text-display-sm font-bold text-primary-600 dark:text-primary-300">{stat.value}</p>
              <p className="text-body-sm text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section grid */}
        <div className="mb-10">
          <h2 className="text-heading-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            What's inside
          </h2>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Explore tokens, components, and patterns that power the system.
          </p>
        </div>

        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map(section => (
            <li key={section.to}>
              <Link to={section.to} className="block group h-full no-underline">
                <Card variant="interactive" padding="md" className="h-full flex flex-col">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', section.bg)}>
                    <section.Icon size={20} aria-hidden="true" className={section.color} />
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>{section.title}</CardTitle>
                      <Badge variant="outline" size="sm">{section.badge}</Badge>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>

                  <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-primary-500 dark:text-primary-300 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        {/* Principles */}
        <div className="mt-20">
          <h2 className="text-heading-xl font-bold text-neutral-900 dark:text-neutral-50 mb-8 text-center">
            Design Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Accessible by default',
                desc:  'Every component meets WCAG 2.1 AA. Focus management, ARIA labels, keyboard navigation, and colour contrast are built in — not bolted on.',
              },
              {
                title: 'Composable & consistent',
                desc:  'Atomic design keeps components small and predictable. Combine atoms into molecules and organisms without fighting the system.',
              },
              {
                title: 'Themeable & scalable',
                desc:  'CSS custom properties and Tailwind\'s design token layer make it trivial to switch themes, add brand variants, or export to other platforms.',
              },
            ].map(p => (
              <Card key={p.title} variant="filled" padding="lg">
                <h3 className="text-heading-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{p.title}</h3>
                <p className="text-body-sm text-neutral-600 dark:text-neutral-400 text-pretty">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
