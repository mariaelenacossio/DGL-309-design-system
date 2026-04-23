import { Outlet } from 'react-router-dom'
import { Navbar, DSSidebar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'

const sidebarSections = [
  {
    label: 'Foundations',
    items: [
      { label: 'Overview',    to: '/design-system'             },
      { label: 'Colors',      to: '/design-system/colors'      },
      { label: 'Typography',  to: '/design-system/typography'  },
      { label: 'Spacing',     to: '/design-system/spacing'     },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Components',  to: '/design-system/components'  },
      { label: 'Forms',       to: '/design-system/forms'       },
      { label: 'Navigation',  to: '/design-system/navigation'  },
    ],
  },
  {
    label: 'Sample',
    items: [
      { label: 'Website',     to: '/website'                   },
    ],
  },
]

export function DSLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />

      <div className="flex flex-1 container-ds gap-0">
        <DSSidebar sections={sidebarSections} />

        <main id="main-content" className="flex-1 min-w-0 py-2">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}
