import { cn } from '@/utils/cn'

export type AvatarSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarVariant = 'circle' | 'rounded'

interface AvatarProps {
  src?:       string
  alt?:       string
  initials?:  string
  size?:      AvatarSize
  variant?:   AvatarVariant
  status?:    'online' | 'offline' | 'away' | 'busy'
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  xs:  'h-6  w-6  text-xs',
  sm:  'h-8  w-8  text-xs',
  md:  'h-10 w-10 text-sm',
  lg:  'h-12 w-12 text-base',
  xl:  'h-16 w-16 text-lg',
  '2xl':'h-20 w-20 text-xl',
}

const statusSize: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5', sm: 'h-2 w-2', md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3', xl: 'h-3.5 w-3.5', '2xl': 'h-4 w-4',
}

const statusColor = {
  online:  'bg-green-500',
  offline: 'bg-neutral-400',
  away:    'bg-amber-500',
  busy:    'bg-red-500',
} as const

function getInitialsColor(initials: string) {
  const colors = [
    'bg-primary-500 text-white',
    'bg-secondary-500 text-white',
    'bg-accent-200 text-neutral-800',
    'bg-purple-500 text-white',
    'bg-pink-500 text-white',
    'bg-teal-500 text-white',
  ]
  const index = initials.charCodeAt(0) % colors.length
  return colors[index]
}

export function Avatar({
  src,
  alt = '',
  initials,
  size    = 'md',
  variant = 'circle',
  status,
  className,
}: AvatarProps) {
  const radiusClass = variant === 'circle' ? 'rounded-full' : 'rounded-xl'

  return (
    <span className={cn('relative inline-flex shrink-0', sizeClasses[size], className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn('h-full w-full object-cover', radiusClass)}
        />
      ) : (
        <span
          aria-label={alt || initials}
          className={cn(
            'flex h-full w-full items-center justify-center font-semibold select-none',
            radiusClass,
            initials ? getInitialsColor(initials) : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500',
          )}
        >
          {initials ?? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2 opacity-60" aria-hidden="true">
              <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
            </svg>
          )}
        </span>
      )}

      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900',
            statusSize[size],
            statusColor[status],
          )}
        />
      )}
    </span>
  )
}
