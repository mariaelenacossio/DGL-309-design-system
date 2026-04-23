import { useId, type ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Label } from '@/components/atoms/Typography'

interface FormFieldProps {
  label?:       string
  hint?:        string
  error?:       string
  required?:    boolean
  disabled?:    boolean
  className?:   string
  children:     ReactNode | ((id: string, hasError: boolean) => ReactNode)
}

export function FormField({
  label,
  hint,
  error,
  required,
  disabled,
  className,
  children,
}: FormFieldProps) {
  const id       = useId()
  const hasError = Boolean(error)

  return (
    <div
      className={cn('flex flex-col gap-1.5', disabled && 'opacity-60 pointer-events-none', className)}
    >
      {label && (
        <Label htmlFor={id} required={required} size="md">
          {label}
        </Label>
      )}

      {typeof children === 'function' ? children(id, hasError) : children}

      {!hasError && hint && (
        <p id={`${id}-hint`} className="text-body-xs text-neutral-500 dark:text-neutral-400">
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-body-xs text-red-600 dark:text-red-400"
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 4.5v3M7 9.5h.008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Checkbox / Radio wrapper ────────────────────────────────────────────── */
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label:      string
  hint?:      string
  error?:     string
}

export function Checkbox({ label, hint, error, className, ...props }: CheckboxProps) {
  const id = useId()
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        id={id}
        type="checkbox"
        className={cn(
          'mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600',
          'bg-white dark:bg-neutral-800',
          'text-primary-500 focus:ring-2 focus:ring-primary-500/40',
          'transition-colors cursor-pointer',
          error && 'border-red-500',
        )}
        aria-describedby={hint ? `${id}-hint` : undefined}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
          {label}
        </label>
        {hint && <span id={`${id}-hint`} className="text-body-xs text-neutral-500 dark:text-neutral-400">{hint}</span>}
        {error && <span role="alert" className="text-body-xs text-red-600 dark:text-red-400">{error}</span>}
      </div>
    </div>
  )
}

export function RadioGroup({
  legend,
  children,
  className,
}: {
  legend: string
  children: ReactNode
  className?: string
}) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      <legend className="text-label-md text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

export function RadioOption({ label, hint, ...props }: CheckboxProps) {
  const id = useId()
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="radio"
        className="mt-0.5 h-4 w-4 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-primary-500 focus:ring-2 focus:ring-primary-500/40 cursor-pointer"
        {...props}
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
          {label}
        </label>
        {hint && <span className="text-body-xs text-neutral-500 dark:text-neutral-400">{hint}</span>}
      </div>
    </div>
  )
}
