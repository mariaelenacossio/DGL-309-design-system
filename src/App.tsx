import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

// Layouts
import { DSLayout }      from '@/pages/design-system/DSLayout'
import { WebsiteLayout } from '@/pages/website/WebsiteLayout'

// DS pages
import { DSHome }           from '@/pages/design-system/DSHome'
import { Colors }           from '@/pages/design-system/Colors'
import { Typography }       from '@/pages/design-system/Typography'
import { Spacing }          from '@/pages/design-system/Spacing'
import { Components }       from '@/pages/design-system/Components'
import { Forms }            from '@/pages/design-system/Forms'
import { NavigationPage }   from '@/pages/design-system/NavigationPage'
import { Images }           from '@/pages/design-system/Images'

// Website pages
import { WebsiteHome }    from '@/pages/website/WebsiteHome'
import { WebsiteContact } from '@/pages/website/WebsiteContact'

function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme() // initializes and syncs theme on mount
  return <>{children}</>
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/design-system" replace />} />

          {/* Design System */}
          <Route path="/design-system" element={<DSLayout />}>
            <Route index           element={<DSHome />}         />
            <Route path="colors"      element={<Colors />}         />
            <Route path="typography"  element={<Typography />}     />
            <Route path="spacing"     element={<Spacing />}        />
            <Route path="components"  element={<Components />}     />
            <Route path="forms"       element={<Forms />}          />
            <Route path="navigation"  element={<NavigationPage />} />
            <Route path="images"      element={<Images />}         />
          </Route>

          {/* BEYOND Skincare website */}
          <Route path="/website" element={<WebsiteLayout />}>
            <Route index         element={<WebsiteHome />}    />
            <Route path="contact" element={<WebsiteContact />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/design-system" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
