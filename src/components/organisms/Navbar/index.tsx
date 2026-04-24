import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { imgUrl } from '@/utils/assets'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { Button } from '@/components/atoms/Button'

interface NavItem {
  label:  string
  to:     string
  exact?: boolean
}

interface NavbarProps {
  items?:     NavItem[]
  logo?:      React.ReactNode
  actions?:   React.ReactNode
  className?: string
}

const defaultItems: NavItem[] = [
  { label: 'Design System', to: '/design-system' },
  { label: 'BEYOND Site',   to: '/website' },
]

export function Navbar({ items = defaultItems, logo, actions, className }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md',
        'border-b border-neutral-200 dark:border-neutral-800',
        className,
      )}
    >
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <nav aria-label="Primary" className="container-ds">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            aria-label="BEYOND Skincare Design System — home"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            {logo ?? (
              <img
                src={imgUrl('B-logo-2.png')}
                alt="BEYOND Skincare"
                className="h-9 w-auto dark:brightness-110"
              />
            )}
          </Link>

          {/* Desktop nav */}
          <ul role="list" className="hidden md:flex items-center gap-1">
            {items.map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.to)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {actions}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="sm"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden"
              onClick={() => setMenuOpen(o => !o)}
              iconLeft={menuOpen ? <X size={18} /> : <Menu size={18} />}
            />
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-3 animate-slide-down"
          >
            <ul role="list" className="flex flex-col gap-1">
              {items.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={cn(
                      'flex px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive(item.to)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

/* ─── DS Sidebar ──────────────────────────────────────────────────────────── */
interface SidebarSection {
  label: string
  items: { label: string; to: string }[]
}

interface DSSidebarProps {
  sections: SidebarSection[]
  className?: string
}

export function DSSidebar({ sections, className }: DSSidebarProps) {
  const location = useLocation()

  return (
    <aside
      aria-label="Design system navigation"
      className={cn(
        'hidden lg:flex flex-col w-56 shrink-0 py-6 pr-4',
        'border-r border-neutral-200 dark:border-neutral-800',
        className,
      )}
    >
      {sections.map(section => (
        <div key={section.label} className="mb-6">
          <p className="text-label-sm uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-2 px-3">
            {section.label}
          </p>
          <ul role="list" className="flex flex-col gap-0.5">
            {section.items.map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  className={cn(
                    'ds-nav-link',
                    location.pathname === item.to && 'active',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
