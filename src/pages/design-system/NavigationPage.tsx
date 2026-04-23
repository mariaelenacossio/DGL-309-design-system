import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight, ExternalLink } from 'lucide-react'
import { Heading, Text, Code } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/utils/cn'

/* ─── Breadcrumb ──────────────────────────────────────────────────────────── */
interface Crumb { label: string; to?: string }

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex flex-wrap items-center gap-1.5 text-body-sm">
        <li>
          <Link to="/" aria-label="Home" className="text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
            <Home size={15} aria-hidden="true" />
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            <ChevronRight size={14} aria-hidden="true" className="text-neutral-300 dark:text-neutral-600 shrink-0" />
            {i === crumbs.length - 1 || !crumb.to ? (
              <span aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                className="text-neutral-900 dark:text-neutral-100 font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.to} className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors no-underline">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */
function TabGroup({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0].id)

  return (
    <div>
      <div role="tablist" aria-label="Navigation tabs" className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              active === t.id
                ? 'bg-white dark:bg-neutral-700 shadow-elevation-1 text-primary-600 dark:text-primary-300'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map(t => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== t.id}
          className="mt-4"
        >
          {t.content}
        </div>
      ))}
    </div>
  )
}

/* ─── Dropdown ────────────────────────────────────────────────────────────── */
function Dropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative w-48">
      <Button
        variant="outline"
        iconRight={
          <svg className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        Dropdown Menu
      </Button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-elevation-3 border border-neutral-200 dark:border-neutral-700 py-1 z-10 animate-slide-down"
        >
          {['Profile', 'Settings', 'Resources', 'Sign out'].map(item => (
            <li key={item} role="option" aria-selected={false}>
              <button
                onClick={() => setOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function NavigationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">

      <div>
        <Badge variant="primary" dot className="mb-3">Patterns</Badge>
        <Heading level={1} size="display-sm">Navigation</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Navigation patterns designed for clarity, keyboard accessibility, and responsive behaviour.
        </Text>
      </div>

      {/* Breadcrumbs */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Breadcrumbs</Heading>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <Breadcrumb crumbs={[{ label: 'Design System', to: '/design-system' }, { label: 'Navigation' }]} />
          </div>
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <Breadcrumb crumbs={[
              { label: 'Design System', to: '/design-system' },
              { label: 'Components',    to: '/design-system/components' },
              { label: 'Modal',         to: '/design-system/components#modal' },
              { label: 'Props' },
            ]} />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Tabs</Heading>
        <TabGroup
          tabs={[
            {
              id:      'overview',
              label:   'Overview',
              content: (
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                  <Text>This is the Overview tab panel. Tabs use <Code>role="tab"</Code> and <Code>role="tabpanel"</Code> for full ARIA compliance.</Text>
                </div>
              ),
            },
            {
              id:      'usage',
              label:   'Usage',
              content: (
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                  <Text>Use tabs to organise related content into distinct views. Avoid nesting tabs within tabs.</Text>
                </div>
              ),
            },
            {
              id:      'accessibility',
              label:   'Accessibility',
              content: (
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                  <Text>Arrow keys navigate between tabs. <Code>Enter</Code> or <Code>Space</Code> selects the focused tab. Focus is managed with <Code>aria-selected</Code>.</Text>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Dropdown */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Dropdown Menu</Heading>
        <div className="flex gap-4 flex-wrap items-start">
          <Dropdown />
        </div>
      </section>

      {/* Link styles */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Link Styles</Heading>
        <div className="space-y-3">
          <p><a href="#" className="text-primary-500 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 underline transition-colors">Default link</a></p>
          <p><a href="#" className="text-primary-500 hover:text-primary-700 dark:text-primary-300 no-underline hover:underline transition-colors">No-underline link (hover to reveal)</a></p>
          <p>
            <a href="#" target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-700 dark:text-primary-300 transition-colors">
              External link <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
