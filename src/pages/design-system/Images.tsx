import { Heading, Text, Code } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <Heading level={2} size="lg">{title}</Heading>
      {children}
      <div className="section-divider" />
    </section>
  )
}

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-label-md uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">
      {children}
    </p>
  )
}

const UNSPLASH = {
  serum:    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&q=80',
  cream:    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
  oil:      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
  toner:    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80',
  cleanser: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80',
  mist:     'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=800&q=80',
}

/* ─── Aspect Ratio demos ─────────────────────────────────────────────────── */
const RATIOS: { label: string; cls: string; code: string }[] = [
  { label: '1 : 1 — Square',      cls: 'aspect-square',     code: 'aspect-square' },
  { label: '4 : 3 — Standard',    cls: 'aspect-[4/3]',      code: 'aspect-[4/3]' },
  { label: '16 : 9 — Widescreen', cls: 'aspect-video',      code: 'aspect-video' },
  { label: '3 : 4 — Portrait',    cls: 'aspect-[3/4]',      code: 'aspect-[3/4]' },
  { label: '21 : 9 — Cinematic',  cls: 'aspect-[21/9]',     code: 'aspect-[21/9]' },
  { label: '2 : 3 — Tall card',   cls: 'aspect-[2/3]',      code: 'aspect-[2/3]' },
]

/* ─── Hover thumbnails ───────────────────────────────────────────────────── */
const HOVER_DEMOS: { label: string; overlay: React.ReactNode; wrapCls?: string }[] = [
  {
    label: 'Scale + brighten',
    overlay: null,
    wrapCls: 'overflow-hidden rounded-xl group',
  },
  {
    label: 'Darken overlay',
    overlay: (
      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/50 transition-colors duration-300 rounded-xl" />
    ),
    wrapCls: 'overflow-hidden rounded-xl group relative',
  },
  {
    label: 'Label reveal',
    overlay: (
      <div className="absolute inset-0 flex items-end p-3 pointer-events-none">
        <span className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white text-sm font-semibold bg-neutral-900/70 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          View product
        </span>
      </div>
    ),
    wrapCls: 'overflow-hidden rounded-xl group relative',
  },
  {
    label: 'Border glow',
    overlay: null,
    wrapCls: 'overflow-hidden rounded-xl group ring-2 ring-transparent hover:ring-primary-400 transition-all duration-300',
  },
]

/* ─── Overlay patterns ───────────────────────────────────────────────────── */
const OVERLAYS: { label: string; overlayClass: string; textClass: string; caption: string }[] = [
  {
    label:        'Gradient bottom',
    overlayClass: 'absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent rounded-xl',
    textClass:    'absolute bottom-4 left-4 text-white',
    caption:      'bg-gradient-to-t from-neutral-900/80',
  },
  {
    label:        'Gradient top',
    overlayClass: 'absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-transparent to-transparent rounded-xl',
    textClass:    'absolute top-4 left-4 text-white',
    caption:      'bg-gradient-to-b from-neutral-900/70',
  },
  {
    label:        'Solid scrim',
    overlayClass: 'absolute inset-0 bg-primary-900/60 rounded-xl',
    textClass:    'absolute inset-0 flex items-center justify-center text-white',
    caption:      'bg-primary-900/60',
  },
  {
    label:        'Blur + frosted',
    overlayClass: 'absolute bottom-0 left-0 right-0 h-20 backdrop-blur-md bg-white/20 dark:bg-neutral-900/30 rounded-b-xl border-t border-white/30',
    textClass:    'absolute bottom-3 left-4 text-white',
    caption:      'backdrop-blur-md bg-white/20',
  },
]

export function Images() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">

      {/* Header */}
      <div>
        <Badge variant="primary" dot className="mb-3">Patterns</Badge>
        <Heading level={1} size="display-sm">Images</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Aspect ratios, responsive grids, thumbnail hover effects, and overlay patterns for consistent image presentation across the design system.
        </Text>
      </div>

      {/* Aspect Ratios */}
      <Section title="Aspect Ratios">
        <Text color="muted">
          Use Tailwind's <Code>aspect-*</Code> utilities with <Code>object-cover</Code> to enforce consistent proportions regardless of the source image dimensions.
        </Text>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {RATIOS.map(({ label, cls, code }) => (
            <div key={code} className="space-y-2">
              <div className={`${cls} w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800`}>
                <img
                  src={UNSPLASH.serum}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</p>
              <Code>{code}</Code>
            </div>
          ))}
        </div>
      </Section>

      {/* Responsive Image Grids */}
      <Section title="Responsive Image Grids">
        <div className="space-y-8">
          <div>
            <DemoLabel>2-column — sm:grid-cols-2</DemoLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[UNSPLASH.cream, UNSPLASH.oil].map((src, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <DemoLabel>3-column — sm:grid-cols-2 lg:grid-cols-3</DemoLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[UNSPLASH.serum, UNSPLASH.toner, UNSPLASH.cleanser].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <DemoLabel>Masonry-style — feature + thumbnails</DemoLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="col-span-2 sm:col-span-2 aspect-[16/9] overflow-hidden rounded-xl">
                <img src={UNSPLASH.mist} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 sm:col-span-1 grid grid-rows-2 gap-3">
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={UNSPLASH.cream} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={UNSPLASH.oil} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Thumbnail Hover Effects */}
      <Section title="Thumbnail Hover Effects">
        <Text color="muted">
          All effects use CSS transitions scoped to a parent <Code>group</Code> class. No JavaScript required.
        </Text>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HOVER_DEMOS.map(({ label, overlay, wrapCls }, i) => (
            <div key={i} className="space-y-2">
              <div className={wrapCls ?? 'overflow-hidden rounded-xl'}>
                <img
                  src={Object.values(UNSPLASH)[i % 6]}
                  alt={label}
                  className="aspect-square w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                />
                {overlay}
              </div>
              <p className="text-body-sm text-neutral-600 dark:text-neutral-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-1">
          <Text size="sm" color="muted">Hover effect recipe</Text>
          <Code>{'group'}</Code>
          {' '}on the wrapper · {' '}
          <Code>{'group-hover:scale-110 transition-transform duration-300'}</Code>
          {' '}on the <Code>{'<img>'}</Code>
        </div>
      </Section>

      {/* Overlay Patterns */}
      <Section title="Overlay Patterns">
        <Text color="muted">
          Overlays pair with absolute-positioned text. Always verify contrast meets WCAG AA (4.5 : 1) when placing copy over imagery.
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OVERLAYS.map(({ label, overlayClass, textClass, caption }) => (
            <div key={label} className="space-y-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={UNSPLASH.toner}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                <div className={overlayClass} />
                <p className={`${textClass} text-sm font-semibold pointer-events-none`}>
                  {label}
                </p>
              </div>
              <Code>{caption}</Code>
            </div>
          ))}
        </div>
      </Section>

    </div>
  )
}
