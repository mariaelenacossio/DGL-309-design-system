import { Link } from 'react-router-dom'
import { Github, Twitter, Instagram } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FooterProps {
  className?: string
}

const year = new Date().getFullYear()

export function Footer({ className }: FooterProps) {
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
                src="/img/B-logo-2.png"
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
              {[
                ['Home',      '/website'],
                ['Products',  '/website#products'],
                ['Routine',   '/website#routine'],
                ['Contact',   '/website/contact'],
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
            {[
              { label: 'GitHub',    href: 'https://github.com/mariaelenacossio', Icon: Github },
              { label: 'Twitter',   href: '#', Icon: Twitter },
              { label: 'Instagram', href: '#', Icon: Instagram },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
