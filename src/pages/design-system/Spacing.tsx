import { Heading, Text, Code, Label } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'

const spacingScale = [
  { token: '0',   px: '0px',   tailwind: 'p-0'  },
  { token: '0.5', px: '2px',   tailwind: 'p-0.5'},
  { token: '1',   px: '4px',   tailwind: 'p-1'  },
  { token: '1.5', px: '6px',   tailwind: 'p-1.5'},
  { token: '2',   px: '8px',   tailwind: 'p-2'  },
  { token: '2.5', px: '10px',  tailwind: 'p-2.5'},
  { token: '3',   px: '12px',  tailwind: 'p-3'  },
  { token: '4',   px: '16px',  tailwind: 'p-4'  },
  { token: '5',   px: '20px',  tailwind: 'p-5'  },
  { token: '6',   px: '24px',  tailwind: 'p-6'  },
  { token: '8',   px: '32px',  tailwind: 'p-8'  },
  { token: '10',  px: '40px',  tailwind: 'p-10' },
  { token: '12',  px: '48px',  tailwind: 'p-12' },
  { token: '16',  px: '64px',  tailwind: 'p-16' },
  { token: '20',  px: '80px',  tailwind: 'p-20' },
  { token: '24',  px: '96px',  tailwind: 'p-24' },
]

export function Spacing() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">

      <div>
        <Badge variant="primary" dot className="mb-3">Design Tokens</Badge>
        <Heading level={1} size="display-sm">Spacing</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Based on a <strong>4px base unit</strong>. All spacing values are multiples of 4, keeping the
          layout system consistent and predictable.
        </Text>
      </div>

      {/* Scale visualizer */}
      <div>
        <Heading level={2} size="lg" className="mb-6">Spacing Scale</Heading>
        <div className="space-y-3">
          {spacingScale.map(({ token, px, tailwind }) => {
            const pxNum = parseInt(px)
            return (
              <div key={token} className="flex items-center gap-4">
                <div className="w-16 shrink-0">
                  <Code className="text-xs">{token}</Code>
                </div>
                <div className="w-14 shrink-0 text-right">
                  <span className="text-body-xs font-mono text-neutral-500">{px}</span>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className="bg-primary-400 dark:bg-primary-500 rounded-sm h-4 transition-all"
                    style={{ width: `${Math.min(pxNum * 2, 400)}px`, minWidth: '4px' }}
                    aria-label={`${px} spacing`}
                  />
                  <Code className="text-xs text-neutral-400">{tailwind}</Code>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="section-divider" />

      {/* Layout tokens */}
      <div>
        <Heading level={2} size="lg" className="mb-6">Layout Tokens</Heading>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Container Max Width', value: '1280px', class: 'max-w-7xl',    token: 'container-ds' },
            { label: 'Content Max Width',   value: '768px',  class: 'max-w-3xl',    token: 'content max' },
            { label: 'Sidebar Width',       value: '256px',  class: 'w-64',         token: 'sidebar' },
            { label: 'Nav Height',          value: '64px',   class: 'h-16',         token: 'navbar' },
          ].map(l => (
            <div key={l.label} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <Label size="sm" className="block mb-1">{l.label}</Label>
              <p className="text-heading-md font-bold text-neutral-900 dark:text-neutral-50">{l.value}</p>
              <div className="mt-2 flex gap-2">
                <Code className="text-xs">{l.class}</Code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* Spacing in practice */}
      <div>
        <Heading level={2} size="lg" className="mb-6">Spacing in Practice</Heading>
        <div className="space-y-4">
          {[
            { label: 'Component padding SM', tokens: 'p-3 (12px)',    usage: 'Compact UI, table cells, chips' },
            { label: 'Component padding MD', tokens: 'p-4 (16px)',    usage: 'Default buttons, inputs, list items' },
            { label: 'Component padding LG', tokens: 'p-6 (24px)',    usage: 'Cards, modals, panels' },
            { label: 'Section gap',          tokens: 'gap-6 (24px)',  usage: 'Between related items in a group' },
            { label: 'Section padding',      tokens: 'py-12 (48px)',  usage: 'Page section vertical rhythm' },
            { label: 'Page padding',         tokens: 'px-4–px-8',     usage: 'Responsive horizontal margins' },
          ].map(row => (
            <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <p className="text-body-sm font-semibold text-neutral-700 dark:text-neutral-300 w-52 shrink-0">{row.label}</p>
              <Code className="text-xs w-36 shrink-0">{row.tokens}</Code>
              <p className="text-body-sm text-neutral-500 dark:text-neutral-400">{row.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
