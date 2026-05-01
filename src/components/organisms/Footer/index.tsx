import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Github, Twitter, Instagram } from 'lucide-react'
import { cn } from '@/utils/cn'
import { imgUrl } from '@/utils/assets'

/** Smooth-scroll a hash target into view if it exists in the DOM. */
function scrollToHash(hash: string) {
  if (!hash) return
  const id = hash.replace(/^#/, '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface FooterProps {
  className?: string
}

const year = new Date().getFullYear()

export function Footer({ className }: FooterProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Footer "Products" / "Routine" need to navigate AND scroll under HashRouter.
  const handleSectionLink = (path: string, section: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === path) {
      scrollToHash(section)
    } else {
      navigate(path, { state: { section } })
    }
  }

  return (
    <footer
      aria-label="Site footer"
      className={cn(
        'border-t border-neutral-200 dark:border-neutral-800',
        'bg-white dark:bg-neutral-900',
        className,
      )}
    >
      <div className="container-ds py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-3 w-fit">
              <img
                src={imgUrl('B-logo-2.png')}
                alt="BEYOND Skincare"
                className="h-10 w-auto dark:brightness-110"
              />
            </Link>
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400 max-w-xs text-pretty">
              The design language powering BEYOND Skincare — built with React, TypeScript, and Tailwind CSS.
            </p>
            <p className="mt-2 text-body-xs text-neutral-400 dark:text-neutral-600">DGL-309 Design Systems · Douglas College</p>
          </div>

          {/* Design System links */}
          <div>
            <h3 className="text-label-md uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">
              Design System
            </h3>
            <ul role="list" className="flex flex-col gap-2">
              {[
                ['Colors',      '/design-system/colors'],
                ['Typography',  '/design-system/typography'],
                ['Spacing',     '/design-system/spacing'],
                ['Components',  '/design-system/components'],
                ['Forms',       '/design-system/forms'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-body-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Website links */}
          <div>
            <h3 className="text-label-md uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">
              BEYOND Skincare
            </h3>
            <ul role="list" className="flex flex-col gap-2">
              {([
                { label: 'Home',     path: '/website' },
                { label: 'Products', path: '/website', section: 'products' },
                { label: 'Routine',  path: '/website', section: 'routine'  },
                { label: 'Contact',  path: '/website/contact' },
              ] as Array<{ label: string; path: string; section?: string }>).map(item => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={item.section ? handleSectionLink(item.path, item.section) : undefined}
                    className="text-body-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-label-md uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">
              Resources
            </h3>
            <ul role="list" className="flex flex-col gap-2">
              {[
                ['GitHub Repo',       'https://github.com/mariaelenacossio/DGL-309-design-system'],
                ['Tailwind CSS',      'https://tailwindcss.com'],
                ['React Docs',        'https://react.dev'],
                ['WCAG Guidelines',   'https://www.w3.org/WAI/WCAG22/quickref/'],
                ['Atlassian DS',      'https://atlassian.design'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-xs text-neutral-400 dark:text-neutral-600">
            &copy; {year} BEYOND Skincare · Maria Elena Cossio Clark · DGL-309
          </p>

          <div className="flex items-center gap-3">
            {/*
              Real social link goes through `<a>`. Twitter & Instagram are
              demo placeholders for the design system showcase — rendered as
              non-clickable icons with a "demo" tooltip so they don't 404.
            */}
            <a
              href="https://github.com/mariaelenacossio"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            {[
              { label: 'Twitter',   Icon: Twitter },
              { label: 'Instagram', Icon: Instagram },
            ].map(({ label, Icon }) => (
              <span
                key={label}
                role="img"
                aria-label={`${label} (placeholder)`}
                title={`${label} — demo placeholder`}
                className="text-neutral-300 dark:text-neutral-700 cursor-default"
              >
                <Icon size={18} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
