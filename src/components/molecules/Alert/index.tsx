import { cn } from '@/utils/cn'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

interface AlertProps {
  variant?:    AlertVariant
  title?:      string
  children:    ReactNode
  onDismiss?:  () => void
  className?:  string
}

const variants: Record<AlertVariant, {
  wrapper:  string
  icon:     string
  title:    string
  body:     string
  dismiss:  string
  Icon:     typeof Info
}> = {
  info: {
    wrapper: 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800',
    icon:    'text-sky-600 dark:text-sky-400',
    title:   'text-sky-900 dark:text-sky-100',
    body:    'text-sky-800 dark:text-sky-300',
    dismiss: 'text-sky-500 hover:text-sky-700 dark:hover:text-sky-300',
    Icon:    Info,
  },
  success: {
    wrapper: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    icon:    'text-green-600 dark:text-green-400',
    title:   'text-green-900 dark:text-green-100',
    body:    'text-green-800 dark:text-green-300',
    dismiss: 'text-green-500 hover:text-green-700 dark:hover:text-green-300',
    Icon:    CheckCircle,
  },
  warning: {
    wrapper: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon:    'text-amber-600 dark:text-amber-400',
    title:   'text-amber-900 dark:text-amber-100',
    body:    'text-amber-800 dark:text-amber-300',
    dismiss: 'text-amber-500 hover:text-amber-700 dark:hover:text-amber-300',
    Icon:    AlertTriangle,
  },
  danger: {
    wrapper: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon:    'text-red-600 dark:text-red-400',
    title:   'text-red-900 dark:text-red-100',
    body:    'text-red-800 dark:text-red-300',
    dismiss: 'text-red-500 hover:text-red-700 dark:hover:text-red-300',
    Icon:    XCircle,
  },
}

const roleMap: Record<AlertVariant, string> = {
  info:    'status',
  success: 'status',
  warning: 'alert',
  danger:  'alert',
}

export function Alert({ variant = 'info', title, children, onDismiss, className }: AlertProps) {
  const v = variants[variant]
  const { Icon } = v

  return (
    <div
      role={roleMap[variant]}
      aria-live={variant === 'danger' || variant === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'flex gap-3 rounded-xl border p-4 animate-fade-in',
        v.wrapper,
        className,
      )}
    >
      <Icon size={18} aria-hidden="true" className={cn('shrink-0 mt-0.5', v.icon)} />

      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('text-body-sm font-semibold mb-0.5', v.title)}>{title}</p>
        )}
        <div className={cn('text-body-sm', v.body)}>{children}</div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn('shrink-0 transition-colors', v.dismiss)}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
