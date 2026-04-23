import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type InputSize    = 'sm' | 'md' | 'lg'
export type InputVariant = 'default' | 'filled' | 'flushed'

interface BaseInputProps {
  size?:       InputSize
  variant?:    InputVariant
  error?:      boolean
  success?:    boolean
  iconLeft?:   React.ReactNode
  iconRight?:  React.ReactNode
  className?:  string
}

export interface InputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}
export interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number
}

const baseInputClasses = [
  'w-full font-sans text-neutral-800 dark:text-neutral-100',
  'bg-white dark:bg-neutral-800',
  'border border-neutral-300 dark:border-neutral-600',
  'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
  'transition-colors duration-150',
  'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500',
  'dark:focus:ring-primary-300/30 dark:focus:border-primary-300',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-900',
  'read-only:bg-neutral-50 dark:read-only:bg-neutral-900',
].join(' ')

const variantClasses: Record<InputVariant, string> = {
  default: 'rounded-xl',
  filled:  'rounded-xl bg-neutral-100 dark:bg-neutral-700 border-transparent focus:bg-white dark:focus:bg-neutral-800',
  flushed: 'rounded-none border-0 border-b-2 px-0 bg-transparent',
}

const sizeClasses: Record<InputSize, { input: string; icon: string }> = {
  sm: { input: 'h-8  px-3   text-sm', icon: 'px-2.5' },
  md: { input: 'h-10 px-3.5 text-sm', icon: 'px-3'   },
  lg: { input: 'h-12 px-4   text-base', icon: 'px-3.5' },
}

const stateClasses = {
  error:   'border-red-500 dark:border-red-400 focus:ring-red-500/40 focus:border-red-500',
  success: 'border-green-500 dark:border-green-400 focus:ring-green-500/40 focus:border-green-500',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    size    = 'md',
    variant = 'default',
    error   = false,
    success = false,
    iconLeft,
    iconRight,
    className,
    ...props
  }, ref) => {
    const hasLeftIcon  = Boolean(iconLeft)
    const hasRightIcon = Boolean(iconRight)
    const { input: sizeInput, icon: sizeIcon } = sizeClasses[size]

    return (
      <div className="relative flex items-center">
        {iconLeft && (
          <span aria-hidden="true" className={cn(
            'absolute left-0 flex items-center text-neutral-400 dark:text-neutral-500 pointer-events-none',
            sizeIcon,
          )}>
            {iconLeft}
          </span>
        )}

        <input
          ref={ref}
          className={cn(
            baseInputClasses,
            variantClasses[variant],
            sizeInput,
            error   && stateClasses.error,
            success && stateClasses.success,
            hasLeftIcon  && 'pl-9',
            hasRightIcon && 'pr-9',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />

        {iconRight && (
          <span aria-hidden="true" className={cn(
            'absolute right-0 flex items-center text-neutral-400 dark:text-neutral-500 pointer-events-none',
            sizeIcon,
          )}>
            {iconRight}
          </span>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', variant = 'default', error, success, className, rows = 4, ...props }, ref) => {
    const { input: sizeInput } = sizeClasses[size]

    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          baseInputClasses,
          variantClasses[variant],
          sizeInput,
          'py-2.5 resize-y min-h-[80px]',
          error   && stateClasses.error,
          success && stateClasses.success,
          className,
        )}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

/* ─── Select ──────────────────────────────────────────────────────────────── */
export interface SelectProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  children: React.ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', variant = 'default', error, success, className, children, ...props }, ref) => {
    const { input: sizeInput } = sizeClasses[size]

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseInputClasses,
            variantClasses[variant],
            sizeInput,
            'appearance-none pr-10 cursor-pointer',
            error   && stateClasses.error,
            success && stateClasses.success,
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    )
  },
)
Select.displayName = 'Select'
