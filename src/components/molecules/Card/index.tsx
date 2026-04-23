import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

export type CardVariant  = 'default' | 'elevated' | 'outlined' | 'filled' | 'interactive'
export type CardPadding  = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:  CardVariant
  padding?:  CardPadding
  as?:       'div' | 'article' | 'section' | 'li'
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-1',
  elevated:
    'bg-white dark:bg-neutral-800 shadow-elevation-3',
  outlined:
    'bg-transparent border-2 border-neutral-200 dark:border-neutral-700',
  filled:
    'bg-neutral-100 dark:bg-neutral-800/60',
  interactive:
    'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-1 ' +
    'hover:shadow-elevation-3 hover:-translate-y-0.5 cursor-pointer ' +
    'transition-all duration-200',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
  xl:   'p-10',
}

export function Card({
  variant = 'default',
  padding = 'md',
  as      = 'div',
  className,
  children,
  ...props
}: CardProps) {
  if (as === 'li') {
    const { ...divProps } = props as HTMLAttributes<HTMLDivElement>
    return (
      <li
        className={cn('rounded-2xl overflow-hidden', variantClasses[variant], paddingClasses[padding], className)}
      >
        <div {...divProps}>{children}</div>
      </li>
    )
  }
  const Tag = as as 'div' | 'article' | 'section'
  return (
    <Tag
      className={cn('rounded-2xl overflow-hidden', variantClasses[variant], paddingClasses[padding], className)}
      {...(props as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Tag>
  )
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */
export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-heading-md font-semibold text-neutral-900 dark:text-neutral-50', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-body-sm text-neutral-500 dark:text-neutral-400 text-pretty', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-3 pt-4 mt-auto', className)} {...props}>
      {children}
    </div>
  )
}

export function CardImage({
  src, alt, aspectRatio = '3/2', className,
}: { src: string; alt: string; aspectRatio?: string; className?: string }) {
  return (
    <div
      className={cn('overflow-hidden -mx-6 -mt-6 mb-4', className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )
}

/* ─── Product Card ────────────────────────────────────────────────────────── */
interface ProductCardProps {
  image:        string
  name:         string
  price:        string
  description?: string
  badge?:       string
  onAddToCart?: () => void
  className?:   string
}

export function ProductCard({ image, name, price, description, badge, onAddToCart, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        'group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden',
        'border border-neutral-200 dark:border-neutral-700 shadow-elevation-1',
        'hover:shadow-elevation-3 transition-all duration-300',
        className,
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-cta-400 text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-heading-sm font-semibold text-neutral-900 dark:text-neutral-50 truncate">{name}</h3>
        {description && (
          <p className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-heading-md font-bold text-primary-600 dark:text-primary-300">{price}</span>
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
