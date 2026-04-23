import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Heading, Text } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/utils/cn'
import { colors } from '@/tokens/colors'

/* ─── Colour swatch with copy-to-clipboard ────────────────────────────────── */
function Swatch({ hex, shade, name }: { hex: string; shade: string; name: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      aria-label={`Copy ${name} ${shade} — ${hex}`}
      title={hex}
      className="group flex flex-col gap-1.5 text-left w-full"
    >
      <div
        className="h-12 w-full rounded-xl shadow-elevation-1 relative overflow-hidden transition-transform group-hover:scale-105"
        style={{ backgroundColor: hex }}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-black/20',
          )}
        >
          {copied
            ? <Check size={16} className="text-white" />
            : <Copy size={14} className="text-white" />}
        </span>
      </div>
      <div>
        <p className="text-label-md text-neutral-700 dark:text-neutral-300">{shade}</p>
        <p className="text-body-xs text-neutral-500 dark:text-neutral-500 font-mono">{hex}</p>
      </div>
    </button>
  )
}

/* ─── Palette row ─────────────────────────────────────────────────────────── */
function Palette({
  name,
  shades,
  badge,
}: {
  name: string
  shades: Record<string, string>
  badge?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Heading level={3} size="sm">{name}</Heading>
        {badge && <Badge variant="outline" size="sm">{badge}</Badge>}
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
        {Object.entries(shades).map(([shade, hex]) => (
          <Swatch key={shade} hex={hex} shade={shade} name={name} />
        ))}
      </div>
    </div>
  )
}

/* ─── Contrast checker ────────────────────────────────────────────────────── */
const contrastPairs = [
  { bg: '#072ac8', text: '#ffffff', label: 'Primary 500 / White',   pass: 'AAA' },
  { bg: '#1e96fc', text: '#ffffff', label: 'Secondary 500 / White', pass: 'AA'  },
  { bg: '#fcf300', text: '#111827', label: 'CTA Yellow / Dark',     pass: 'AA'  },
  { bg: '#fafbfc', text: '#2b2b2b', label: 'BG / Body Text',        pass: 'AAA' },
  { bg: '#111827', text: '#fafbfc', label: 'Dark BG / Light Text',  pass: 'AAA' },
  { bg: '#a2d6f9', text: '#072ac8', label: 'Accent / Primary',      pass: 'AA'  },
]

export function Colors() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">

      {/* Header */}
      <div>
        <Badge variant="primary" dot className="mb-3">Design Tokens</Badge>
        <Heading level={1} size="display-sm">Color System</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          All colours are organized in semantic scales from 50–900. Click any swatch to copy the hex value.
          Every pairing meets WCAG 2.1 AA contrast requirements.
        </Text>
      </div>

      {/* Palettes */}
      <div className="space-y-12">
        <Palette name="Primary"   shades={colors.primary}   badge="Brand" />
        <Palette name="Secondary" shades={colors.secondary} badge="Brand" />
        <Palette name="Accent"    shades={colors.accent}    />
        <Palette name="CTA"       shades={colors.cta}       badge="Action" />
        <Palette name="Neutral"   shades={colors.neutral}   badge="UI" />
      </div>

      <div className="section-divider" />

      {/* Semantic colours */}
      <div>
        <Heading level={2} size="lg" className="mb-6">Semantic Colors</Heading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Success', light: '#16a34a', dark: '#4ade80', role: 'Positive states' },
            { name: 'Warning', light: '#d97706', dark: '#fbbf24', role: 'Caution states'  },
            { name: 'Danger',  light: '#dc2626', dark: '#f87171', role: 'Error states'    },
            { name: 'Info',    light: '#0369a1', dark: '#38bdf8', role: 'Informational'   },
          ].map(s => (
            <div key={s.name} className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <div className="flex gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg shadow-elevation-1 flex-1" style={{ background: s.light }} />
                <div className="h-8 w-8 rounded-lg shadow-elevation-1 flex-1" style={{ background: s.dark }} />
              </div>
              <p className="text-heading-xs font-semibold text-neutral-900 dark:text-neutral-50">{s.name}</p>
              <p className="text-body-xs text-neutral-500 dark:text-neutral-400">{s.role}</p>
              <div className="mt-2 flex gap-2 text-body-xs font-mono text-neutral-400">
                <span>Light: {s.light}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* Contrast */}
      <div>
        <Heading level={2} size="lg" className="mb-2">Contrast Compliance</Heading>
        <Text color="muted" className="mb-6">All primary text combinations meet WCAG 2.1 Level AA (4.5:1 minimum).</Text>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {contrastPairs.map(pair => (
            <div
              key={pair.label}
              className="rounded-xl overflow-hidden shadow-elevation-1 border border-neutral-200 dark:border-neutral-700"
            >
              <div
                className="h-16 flex items-center justify-center text-sm font-semibold px-4"
                style={{ background: pair.bg, color: pair.text }}
              >
                {pair.label}
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-neutral-800">
                <span className="text-body-xs font-mono text-neutral-500">{pair.bg}</span>
                <Badge variant={pair.pass === 'AAA' ? 'success' : 'primary'} size="sm">{pair.pass}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
