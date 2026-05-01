import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, Layers } from 'lucide-react'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { Footer } from '@/components/organisms/Footer'
import { imgUrl } from '@/utils/assets'

/**
 * Nav items use `path` for SPA navigation and an optional `section` to scroll
 * to an anchor on the website home page. Encoding both lets us route + scroll
 * cleanly under HashRouter (where `/website#products` would otherwise break).
 */
type NavItem = { label: string; path: string; section?: string }

const navItems: NavItem[] = [
  { label: 'Skin Quiz',    path: '/website/contact' },
  { label: 'Best Sellers', path: '/website', section: 'products' },
  { label: 'Routine',      path: '/website', section: 'routine'  },
  { label: 'Contact',      path: '/website/contact' },
]

/** Smooth-scroll a hash target into view if it exists in the DOM. */
function scrollToHash(hash: string) {
  if (!hash) return
  const id = hash.replace(/^#/, '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function WebsiteNavbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [bag, setBag] = useState(0)

  // After navigation completes, scroll to the saved section if any.
  // We stash it in location.state so it survives the route change.
  useEffect(() => {
    const section = (location.state as { section?: string } | null)?.section
    if (section) {
      // wait one frame for the new page to render
      requestAnimationFrame(() => scrollToHash(section))
    }
  }, [location])

  const handleNav = (item: NavItem) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)

    if (item.section && location.pathname === item.path) {
      // Already on the right page — just scroll
      scrollToHash(item.section)
    } else if (item.section) {
      // Navigate then scroll once mounted
      navigate(item.path, { state: { section: item.section } })
    } else {
      navigate(item.path)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav aria-label="BEYOND Skincare navigation" className="container-ds">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/website" className="shrink-0" aria-label="BEYOND Skincare — home">
            <img
              src={imgUrl('B-logo-2.png')}
              alt="BEYOND Skincare"
              className="h-9 w-auto dark:brightness-110"
            />
          </Link>

          {/* Desktop nav */}
          <ul role="list" className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={handleNav(item)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline"
                >
                  {item.label}
                </Link>
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
              aria-label={`Shopping bag (${bag} ${bag === 1 ? 'item' : 'items'})`}
              onClick={() => setBag(b => b + 1)}
              title="Demo cart — adds a sample item"
              className="relative h-9 w-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              {bag > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bag}
                </span>
              )}
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
                  <Link
                    to={item.path}
                    onClick={handleNav(item)}
                    className="flex px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors no-underline"
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
