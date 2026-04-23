import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'cta'
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
  iconLeft?: React.ReactNode
  iconRight?:React.ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 ' +
    'dark:bg-primary-400 dark:hover:bg-primary-500 dark:active:bg-primary-600 ' +
    'shadow-elevation-1 hover:shadow-elevation-2',
  secondary:
    'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 ' +
    'dark:bg-secondary-400 dark:hover:bg-secondary-500 ' +
    'shadow-elevation-1 hover:shadow-elevation-2',
  ghost:
    'bg-transparent text-primary-600 dark:text-primary-300 ' +
    'hover:bg-primary-50 dark:hover:bg-primary-900/30 ' +
    'active:bg-primary-100 dark:active:bg-primary-900/50',
  outline:
    'bg-transparent border border-neutral-300 dark:border-neutral-600 ' +
    'text-neutral-700 dark:text-neutral-200 ' +
    'hover:bg-neutral-50 dark:hover:bg-neutral-800 ' +
    'hover:border-neutral-400 dark:hover:border-neutral-500 ' +
    'active:bg-neutral-100 dark:active:bg-neutral-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 ' +
    'dark:bg-red-500 dark:hover:bg-red-600 ' +
    'shadow-elevation-1 hover:shadow-elevation-2',
  cta:
    'bg-cta-400 text-neutral-900 hover:bg-cta-500 active:bg-cta-600 ' +
    'font-semibold shadow-elevation-1 hover:shadow-elevation-2',
}

const sizeClasses: Record<ButtonSize, string> = {
  xs:  'h-7  px-2.5 text-xs   gap-1   rounded-md',
  sm:  'h-8  px-3   text-sm   gap-1.5 rounded-lg',
  md:  'h-10 px-4   text-sm   gap-2   rounded-lg',
  lg:  'h-11 px-5   text-base gap-2   rounded-xl',
  xl:  'h-13 px-6   text-lg   gap-2.5 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = 'primary',
      size     = 'md',
      loading  = false,
      iconLeft,
      iconRight,
      fullWidth= false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium select-none',
          'transition-all duration-150 cursor-pointer',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          // Disabled
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
        ) : (
          iconLeft && <span aria-hidden="true" className="shrink-0">{iconLeft}</span>
        )}

        {children && <span>{children}</span>}

        {!loading && iconRight && (
          <span aria-hidden="true" className="shrink-0">{iconRight}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
