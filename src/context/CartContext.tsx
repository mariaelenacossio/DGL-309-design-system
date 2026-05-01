import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { findProduct, type Product } from '@/data/products'

/** A line item in the cart — a product reference + quantity. */
export interface CartItem {
  productId: number
  qty:       number
}

/** Public shape of the cart context. */
interface CartContextValue {
  items:        CartItem[]
  count:        number             // total number of items (sum of qty)
  subtotalCents:number
  /** Add a product. If already in cart, qty increments by `qty`. */
  add:          (productId: number, qty?: number) => void
  /** Remove a line entirely. */
  remove:       (productId: number) => void
  /** Set absolute quantity. qty <= 0 removes the line. */
  setQty:       (productId: number, qty: number) => void
  clear:        () => void
  /** Get the resolved Product object for an item (null if missing). */
  resolve:      (item: CartItem) => Product | undefined
  /** Drawer open state (controlled here so any component can toggle it). */
  drawerOpen:   boolean
  openDrawer:   () => void
  closeDrawer:  () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'beyond:cart:v1'

/** Read the cart from localStorage, defensively. */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Filter out items pointing at products that no longer exist
    return parsed.filter(
      (i): i is CartItem =>
        i && typeof i.productId === 'number' && typeof i.qty === 'number' && i.qty > 0 && !!findProduct(i.productId),
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]           = useState<CartItem[]>(() => loadCart())
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Persist on every change. Swallow quota / private-mode errors silently —
  // a non-persisting cart is acceptable degraded behaviour.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* localStorage unavailable — cart will work in-memory only */
    }
  }, [items])

  const add = useCallback((productId: number, qty: number = 1) => {
    if (qty <= 0) return
    if (!findProduct(productId)) return
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId)
      if (existing) {
        return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { productId, qty }]
    })
  }, [])

  const remove = useCallback((productId: number) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const setQty = useCallback((productId: number, qty: number) => {
    if (qty <= 0) {
      remove(productId)
      return
    }
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i))
  }, [remove])

  const clear       = useCallback(() => setItems([]), [])
  const openDrawer  = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // Memoized totals
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  )
  const subtotalCents = useMemo(
    () => items.reduce((sum, i) => {
      const p = findProduct(i.productId)
      return sum + (p ? p.priceCents * i.qty : 0)
    }, 0),
    [items],
  )

  const resolve = useCallback((item: CartItem) => findProduct(item.productId), [])

  const value = useMemo<CartContextValue>(() => ({
    items, count, subtotalCents,
    add, remove, setQty, clear, resolve,
    drawerOpen, openDrawer, closeDrawer,
  }), [items, count, subtotalCents, add, remove, setQty, clear, resolve, drawerOpen, openDrawer, closeDrawer])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Access the cart context. Throws if used outside the provider — that's
 * intentional: it surfaces wiring mistakes immediately rather than failing
 * silently with a no-op cart.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a <CartProvider>')
  return ctx
}
