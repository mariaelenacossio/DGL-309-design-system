import { cn } from '@/utils/cn'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

/* ─── Heading ─────────────────────────────────────────────────────────────── */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize  = 'display-lg' | 'display-md' | 'display-sm' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  size?:  HeadingSize
  as?:    ElementType
}

const headingSizeClasses: Record<HeadingSize, string> = {
  'display-lg': 'text-display-lg',
  'display-md': 'text-display-md',
  'display-sm': 'text-display-sm',
  xl:           'text-heading-xl',
  lg:           'text-heading-lg',
  md:           'text-heading-md',
  sm:           'text-heading-sm',
  xs:           'text-heading-xs',
}

const defaultHeadingSize: Record<HeadingLevel, HeadingSize> = {
  1: 'display-md', 2: 'xl', 3: 'lg', 4: 'md', 5: 'sm', 6: 'xs',
}

export function Heading({ level = 2, size, as, className, children, ...props }: HeadingProps) {
  const Tag = (as ?? `h${level}`) as ElementType
  const resolvedSize = size ?? defaultHeadingSize[level]
  return (
    <Tag
      className={cn(
        'font-semibold text-neutral-900 dark:text-neutral-50 text-balance',
        headingSizeClasses[resolvedSize],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ─── Text ────────────────────────────────────────────────────────────────── */
type TextSize   = 'lg' | 'md' | 'sm' | 'xs'
type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
type TextColor  = 'default' | 'muted' | 'subtle' | 'inverted' | 'primary' | 'danger' | 'success' | 'warning'

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?:      ElementType
  size?:    TextSize
  weight?:  TextWeight
  color?:   TextColor
  italic?:  boolean
}

const textSizeClasses: Record<TextSize, string> = {
  lg: 'text-body-lg', md: 'text-body-md', sm: 'text-body-sm', xs: 'text-body-xs',
}

const textWeightClasses: Record<TextWeight, string> = {
  light:    'font-light',
  regular:  'font-normal',
  medium:   'font-medium',
  semibold: 'font-semibold',
  bold:     'font-bold',
}

const textColorClasses: Record<TextColor, string> = {
  default:  'text-neutral-800 dark:text-neutral-100',
  muted:    'text-neutral-600 dark:text-neutral-400',
  subtle:   'text-neutral-400 dark:text-neutral-600',
  inverted: 'text-white dark:text-neutral-900',
  primary:  'text-primary-600 dark:text-primary-300',
  danger:   'text-red-600 dark:text-red-400',
  success:  'text-green-600 dark:text-green-400',
  warning:  'text-amber-600 dark:text-amber-400',
}

export function Text({
  as      = 'p',
  size    = 'md',
  weight  = 'regular',
  color   = 'default',
  italic  = false,
  className,
  children,
  ...props
}: TextProps) {
  const Tag = as as ElementType
  return (
    <Tag
      className={cn(
        textSizeClasses[size],
        textWeightClasses[weight],
        textColorClasses[color],
        italic && 'italic',
        'text-pretty',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ─── Label ───────────────────────────────────────────────────────────────── */
type LabelSize = 'lg' | 'md' | 'sm'

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  size?:     LabelSize
  required?: boolean
  as?:       ElementType
  htmlFor?:  string
  children:  ReactNode
}

const labelSizeClasses: Record<LabelSize, string> = {
  lg: 'text-label-lg', md: 'text-label-md', sm: 'text-label-sm',
}

export function Label({ size = 'md', required, as, htmlFor, className, children, ...props }: LabelProps) {
  const Tag = (as ?? (htmlFor ? 'label' : 'span')) as ElementType
  return (
    <Tag
      htmlFor={htmlFor}
      className={cn(
        'text-neutral-700 dark:text-neutral-300 uppercase tracking-wider',
        labelSizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-red-500">*</span>
      )}
    </Tag>
  )
}

/* ─── Code ────────────────────────────────────────────────────────────────── */
export function Code({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <code className={cn(
      'font-mono text-sm px-1.5 py-0.5 rounded-md',
      'bg-neutral-100 dark:bg-neutral-800 text-primary-600 dark:text-primary-300',
      'border border-neutral-200 dark:border-neutral-700',
      className,
    )}>
      {children}
    </code>
  )
}
