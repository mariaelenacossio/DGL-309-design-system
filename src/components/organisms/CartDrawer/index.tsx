import { useEffect, useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/atoms/Button'
import { Heading, Text } from '@/components/atoms/Typography'
import { formatPrice } from '@/data/products'
import { cn } from '@/utils/cn'
import { CheckoutModal } from '@/components/organisms/CheckoutModal'

/**
 * Slide-in cart drawer. Mounts on the right side of the viewport.
 * Closes on Escape, on backdrop click, and after checkout completes.
 */
export function CartDrawer() {
  const { items, count, subtotalCents, resolve, setQty, remove, drawerOpen, closeDrawer, clear } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  // Esc to close
  useEffect(() => {
    if (!drawerOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [drawerOpen, closeDrawer])

  // Lock body scroll while open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [drawerOpen])

  const empty = items.length === 0

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!drawerOpen}
        onClick={closeDrawer}
        className={cn(
          'fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm transition-opacity duration-300',
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!drawerOpen}
        className={cn(
          'fixed top-0 right-0 z-50 h-dvh w-full max-w-md bg-white dark:bg-neutral-900',
          'border-l border-neutral-200 dark:border-neutral-800',
          'shadow-elevation-4 flex flex-col transition-transform duration-300',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
              <ShoppingBag size={18} aria-hidden="true" />
            </span>
            <div>
              <Heading level={2} size="md">Your Bag</Heading>
              <Text size="sm" color="muted">{count} {count === 1 ? 'item' : 'items'}</Text>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {/* Body */}
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <span className="h-20 w-20 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 mb-5">
              <ShoppingBag size={32} aria-hidden="true" />
            </span>
            <Heading level={3} size="md" className="mb-2">Your bag is empty</Heading>
            <Text color="muted" className="max-w-xs">
              Browse our best sellers or take the Skin Quiz for personalised recommendations.
            </Text>
            <Button variant="primary" className="mt-6" onClick={closeDrawer}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ul role="list" className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-200 dark:divide-neutral-800">
              {items.map(item => {
                const p = resolve(item)
                if (!p) return null
                return (
                  <li key={item.productId} className="py-4 flex gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-20 w-20 rounded-lg object-cover bg-neutral-100 shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-50 truncate">{p.name}</p>
                          {p.size && <p className="text-body-xs text-neutral-500">{p.size}</p>}
                        </div>
                        <button
                          onClick={() => remove(item.productId)}
                          aria-label={`Remove ${p.name}`}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1 -m-1"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        {/* Qty stepper */}
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                          <button
                            onClick={() => setQty(item.productId, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="h-7 w-7 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-l-lg"
                          >
                            <Minus size={12} aria-hidden="true" />
                          </button>
                          <span className="px-3 text-body-sm font-medium tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.productId, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="h-7 w-7 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-r-lg"
                          >
                            <Plus size={12} aria-hidden="true" />
                          </button>
                        </div>
                        <p className="text-body-sm font-bold text-primary-600 dark:text-primary-300 tabular-nums">
                          {formatPrice(p.priceCents * item.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-5 space-y-4 bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <Text size="sm" color="muted">Subtotal</Text>
                <Text className="font-bold text-heading-sm tabular-nums">{formatPrice(subtotalCents)}</Text>
              </div>
              <Text size="xs" color="muted" className="block">
                Shipping and taxes calculated at checkout. Free shipping on orders over $50.
              </Text>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconRight={<ArrowRight size={18} />}
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </Button>
              <button
                onClick={() => { if (confirm('Empty your bag?')) clear() }}
                className="w-full text-body-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                Empty bag
              </button>
            </footer>
          </>
        )}
      </aside>

      {/* Checkout */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
