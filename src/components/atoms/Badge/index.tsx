import { cn } from '@/utils/cn'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
export type BadgeSize    = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  variant?:  BadgeVariant
  size?:     BadgeSize
  dot?:      boolean
  className?:string
  children:  React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  primary:
    'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  secondary:
    'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  success:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  warning:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger:
    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  info:
    'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  outline:
    'border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-transparent',
}

const dotColors: Record<BadgeVariant, string> = {
  default:   'bg-neutral-400',
  primary:   'bg-primary-500',
  secondary: 'bg-secondary-500',
  success:   'bg-green-500',
  warning:   'bg-amber-500',
  danger:    'bg-red-500',
  info:      'bg-sky-500',
  outline:   'bg-neutral-400',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-1.5 py-0.5 gap-1',
  md: 'text-xs px-2   py-0.5 gap-1.5',
  lg: 'text-sm px-2.5 py-1   gap-1.5',
}

export function Badge({
  variant  = 'default',
  size     = 'md',
  dot      = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])}
        />
      )}
      {children}
    </span>
  )
}
