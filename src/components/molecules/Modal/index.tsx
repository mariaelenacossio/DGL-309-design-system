import { useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps {
  open:        boolean
  onClose:     () => void
  title?:      string
  description?:string
  size?:       ModalSize
  children:    ReactNode
  footer?:     ReactNode
  className?:  string
}

const sizeClasses: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-full mx-4',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size    = 'md',
  children,
  footer,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId   = 'modal-title'
  const descId    = 'modal-desc'

  // Sync open state with native <dialog>
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      if (!el.open) el.showModal()
    } else {
      if (el.open) el.close()
    }
  }, [open])

  // Close on Escape (native <dialog> does this, but we sync state)
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = () => onClose()
    el.addEventListener('close', handler)
    return () => el.removeEventListener('close', handler)
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const clickedOutside =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    if (clickedOutside) onClose()
  }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      onClick={handleBackdropClick}
      className={cn(
        // Reset native dialog styles
        'p-0 bg-transparent border-none outline-none',
        // Backdrop
        'backdrop:bg-neutral-900/60 backdrop:backdrop-blur-sm',
        // Sizing
        'w-full',
        sizeClasses[size],
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-4',
          'border border-neutral-200 dark:border-neutral-700',
          'animate-scale-in',
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 p-6 pb-0">
            <div>
              {title && (
                <h2 id={titleId} className="text-heading-md font-semibold text-neutral-900 dark:text-neutral-50">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-0 border-t border-neutral-200 dark:border-neutral-700 mt-0 pt-4">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  )
}

/* ─── Convenience hook ────────────────────────────────────────────────────── */
export function useModal(initial = false) {
  const [open, setOpen] = useState(initial)
  return {
    open,
    onOpen:  () => setOpen(true),
    onClose: () => setOpen(false),
    toggle:  () => setOpen((o: boolean) => !o),
  }
}
