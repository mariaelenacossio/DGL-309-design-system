import { Heading, Text, Label, Code } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/utils/cn'

const typeScale = [
  { name: 'Display LG',  class: 'text-display-lg', sample: 'The quick brown fox', token: 'display-lg', weight: '700' },
  { name: 'Display MD',  class: 'text-display-md', sample: 'The quick brown fox', token: 'display-md', weight: '700' },
  { name: 'Display SM',  class: 'text-display-sm', sample: 'The quick brown fox', token: 'display-sm', weight: '600' },
  { name: 'Heading XL',  class: 'text-heading-xl', sample: 'The quick brown fox jumps', token: 'heading-xl', weight: '600' },
  { name: 'Heading LG',  class: 'text-heading-lg', sample: 'The quick brown fox jumps', token: 'heading-lg', weight: '600' },
  { name: 'Heading MD',  class: 'text-heading-md', sample: 'The quick brown fox jumps over the lazy dog', token: 'heading-md', weight: '600' },
  { name: 'Heading SM',  class: 'text-heading-sm', sample: 'The quick brown fox jumps over the lazy dog', token: 'heading-sm', weight: '600' },
  { name: 'Heading XS',  class: 'text-heading-xs', sample: 'The quick brown fox jumps over the lazy dog', token: 'heading-xs', weight: '600' },
  { name: 'Body LG',     class: 'text-body-lg',    sample: 'Open Sans delivers excellent legibility across all screen sizes, making it ideal for both display and body text in professional interfaces.', token: 'body-lg', weight: '400' },
  { name: 'Body MD',     class: 'text-body-md',    sample: 'Open Sans delivers excellent legibility across all screen sizes, making it ideal for both display and body text in professional interfaces.', token: 'body-md', weight: '400' },
  { name: 'Body SM',     class: 'text-body-sm',    sample: 'Open Sans delivers excellent legibility across all screen sizes, making it ideal for both display and body text in professional interfaces.', token: 'body-sm', weight: '400' },
  { name: 'Body XS',     class: 'text-body-xs',    sample: 'Open Sans delivers excellent legibility across all screen sizes, making it ideal for both display and body text in professional interfaces.', token: 'body-xs', weight: '400' },
  { name: 'Label LG',    class: 'text-label-lg uppercase tracking-wider',  sample: 'LABEL LARGE', token: 'label-lg', weight: '600' },
  { name: 'Label MD',    class: 'text-label-md uppercase tracking-widest', sample: 'LABEL MEDIUM', token: 'label-md', weight: '600' },
  { name: 'Label SM',    class: 'text-label-sm uppercase tracking-widest', sample: 'LABEL SMALL', token: 'label-sm', weight: '600' },
]

export function Typography() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">

      {/* Header */}
      <div>
        <Badge variant="primary" dot className="mb-3">Design Tokens</Badge>
        <Heading level={1} size="display-sm">Typography</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Built on <strong>Open Sans</strong> — a humanist sans-serif optimised for screen legibility at all sizes.
          A modular scale from display headings down to micro labels.
        </Text>
      </div>

      {/* Font info */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Typeface',   value: 'Open Sans' },
          { label: 'Weights',    value: '300 · 400 · 500 · 600 · 700 · 800' },
          { label: 'Mono',       value: 'JetBrains Mono' },
        ].map(f => (
          <div key={f.label} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <Label size="sm" className="block mb-1">{f.label}</Label>
            <p className="text-heading-sm font-semibold text-neutral-900 dark:text-neutral-50">{f.value}</p>
          </div>
        ))}
      </div>

      {/* Scale */}
      <div>
        <Heading level={2} size="lg" className="mb-8">Type Scale</Heading>
        <div className="space-y-1">
          {typeScale.map(row => (
            <div
              key={row.name}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-5 border-b border-neutral-100 dark:border-neutral-800 group"
            >
              <div className="shrink-0 w-32">
                <Label size="sm" className="text-neutral-400 dark:text-neutral-600">{row.name}</Label>
                <Code className="mt-1 text-xs">{row.token}</Code>
              </div>
              <p
                className={cn(
                  'flex-1 text-neutral-900 dark:text-neutral-50 font-sans truncate',
                  row.class,
                )}
                style={{ fontWeight: row.weight }}
              >
                {row.sample}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight showcase */}
      <div>
        <Heading level={2} size="lg" className="mb-6">Font Weights</Heading>
        <div className="space-y-4">
          {[
            { weight: '300', label: 'Light'     },
            { weight: '400', label: 'Regular'   },
            { weight: '500', label: 'Medium'    },
            { weight: '600', label: 'Semibold'  },
            { weight: '700', label: 'Bold'      },
            { weight: '800', label: 'Extrabold' },
          ].map(w => (
            <div key={w.weight} className="flex items-center gap-4">
              <Label size="sm" className="w-24 shrink-0 text-neutral-400">{w.label} · {w.weight}</Label>
              <p
                className="text-heading-md text-neutral-900 dark:text-neutral-50"
                style={{ fontWeight: w.weight }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Monospace */}
      <div>
        <Heading level={2} size="lg" className="mb-4">Monospace / Code</Heading>
        <div className="code-block">
          <p className="text-sm font-mono text-green-400">{'// JetBrains Mono — used for code snippets'}</p>
          <p className="text-sm font-mono text-blue-400 mt-2">{'const'} <span className="text-yellow-300">theme</span> {'= {'}</p>
          <p className="text-sm font-mono text-neutral-300 ml-4">{'colors: { primary: { 500: '}<span className="text-green-300">'#072ac8'</span>{' } },'}</p>
          <p className="text-sm font-mono text-neutral-300 ml-4">{'fonts:  { sans: '}<span className="text-green-300">'"Open Sans"'</span>{' },'}</p>
          <p className="text-sm font-mono text-blue-400">{'}'}</p>
        </div>
      </div>
    </div>
  )
}
