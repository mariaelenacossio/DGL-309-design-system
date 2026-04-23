import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={cn(
        'relative inline-flex h-8 w-14 items-center rounded-full',
        'bg-neutral-200 dark:bg-neutral-700',
        'transition-colors duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-primary-500',
        className,
      )}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-neutral-500 dark:text-neutral-400 transition-opacity duration-200"
            aria-hidden="true">
        <Sun size={13} />
      </span>
      <span className="absolute right-1.5 text-neutral-500 dark:text-neutral-400 transition-opacity duration-200"
            aria-hidden="true">
        <Moon size={13} />
      </span>

      {/* Thumb */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1 h-6 w-6 rounded-full shadow-elevation-2',
          'flex items-center justify-center text-white text-xs',
          'transition-all duration-300',
          isDark
            ? 'translate-x-7 bg-primary-500'
            : 'translate-x-1 bg-white',
        )}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} className="text-cta-400" />}
      </span>
    </button>
  )
}
