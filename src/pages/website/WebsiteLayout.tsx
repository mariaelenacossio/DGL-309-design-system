import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, ShoppingBag, Layers } from 'lucide-react'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { Footer } from '@/components/organisms/Footer'

const navItems = [
  { label: 'Skin Quiz',     to: '/website/contact' },
  { label: 'Best Sellers',  to: '/website#products' },
  { label: 'Routine',       to: '/website#routine'  },
  { label: 'Contact',       to: '/website/contact'  },
]

function WebsiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav aria-label="BEYOND Skincare navigation" className="container-ds">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/website" className="shrink-0" aria-label="BEYOND Skincare — home">
            <img
              src="/img/B-logo-2.png"
              alt="BEYOND Skincare"
              className="h-9 w-auto dark:brightness-110"
            />
          </Link>

          {/* Desktop nav */}
          <ul role="list" className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <li key={item.label}>
                <a
                  href={item.to}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/design-system" className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors no-underline" title="View Design System">
              <Layers size={14} aria-hidden="true" />
              DS Docs
            </Link>
            <ThemeToggle />
            <button
              aria-label="Shopping bag (0 items)"
              className="relative h-9 w-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag size={18} aria-hidden="true" />
            </button>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="website-mobile-menu"
              className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setOpen(o => !o)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="website-mobile-menu" className="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-3 animate-slide-down">
            <ul role="list" className="flex flex-col gap-1">
              {navItems.map(item => (
                <li key={item.label}>
                  <a
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="flex px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors no-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export function WebsiteLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <WebsiteNavbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
