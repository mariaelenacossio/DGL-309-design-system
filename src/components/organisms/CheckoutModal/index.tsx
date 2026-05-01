import { useState, useEffect } from 'react'
import { X, ArrowLeft, ArrowRight, Lock, CreditCard, Truck, Check, Package } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/atoms/Button'
import { Input, Select } from '@/components/atoms/Input'
import { FormField, Checkbox } from '@/components/molecules/FormField'
import { Heading, Text } from '@/components/atoms/Typography'
import { formatPrice } from '@/data/products'
import { cn } from '@/utils/cn'

interface Props {
  open:    boolean
  onClose: () => void
}

type Step = 'shipping' | 'payment' | 'review' | 'success'

const STEPS: { key: Step; label: string; Icon: typeof Truck }[] = [
  { key: 'shipping', label: 'Shipping', Icon: Truck },
  { key: 'payment',  label: 'Payment',  Icon: CreditCard },
  { key: 'review',   label: 'Review',   Icon: Package },
]

interface ShippingForm {
  email:    string
  fullName: string
  address:  string
  city:     string
  postal:   string
  country:  string
}

interface PaymentForm {
  cardName:   string
  cardNumber: string  // formatted with spaces
  expiry:     string  // MM/YY
  cvc:        string
  saveInfo:   boolean
}

const SHIPPING_FREE_THRESHOLD_CENTS = 5000
const SHIPPING_COST_CENTS           = 599
const TAX_RATE                      = 0.05

/** Calculate shipping cost based on subtotal. */
const calcShipping = (subtotal: number) =>
  subtotal === 0 ? 0 : subtotal >= SHIPPING_FREE_THRESHOLD_CENTS ? 0 : SHIPPING_COST_CENTS

/** Format a card number with a space every 4 digits. Caps at 19 digits + 4 spaces. */
const formatCardNumber = (raw: string) =>
  raw.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ')

/** Format expiry as MM/YY. */
const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function CheckoutModal({ open, onClose }: Props) {
  const { items, subtotalCents, resolve, clear } = useCart()
  const [step, setStep]         = useState<Step>('shipping')
  const [orderNum, setOrderNum] = useState('')
  const [shipping, setShipping] = useState<ShippingForm>({
    email: '', fullName: '', address: '', city: '', postal: '', country: 'Canada',
  })
  const [payment, setPayment]   = useState<PaymentForm>({
    cardName: '', cardNumber: '', expiry: '', cvc: '', saveInfo: false,
  })
  const [errors, setErrors]     = useState<Record<string, string>>({})

  // Reset to shipping every time the modal opens
  useEffect(() => {
    if (open) {
      setStep('shipping')
      setErrors({})
    }
  }, [open])

  // Lock scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  // Esc to close (but not from success — let user dismiss via Continue button)
  useEffect(() => {
    if (!open || step === 'success') return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, step, onClose])

  if (!open) return null

  // ── Validation ─────────────────────────────────────────────────────────────
  const validateShipping = () => {
    const e: Record<string, string> = {}
    if (!shipping.email)                                  e.email    = 'Email required'
    else if (!/\S+@\S+\.\S+/.test(shipping.email))        e.email    = 'Enter a valid email'
    if (!shipping.fullName.trim())                        e.fullName = 'Required'
    if (!shipping.address.trim())                         e.address  = 'Required'
    if (!shipping.city.trim())                            e.city     = 'Required'
    if (!shipping.postal.trim())                          e.postal   = 'Required'
    return e
  }

  const validatePayment = () => {
    const e: Record<string, string> = {}
    const digits = payment.cardNumber.replace(/\s/g, '')
    if (!payment.cardName.trim())                         e.cardName   = 'Required'
    if (digits.length < 13 || digits.length > 19)         e.cardNumber = 'Enter a valid card number'
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry))           e.expiry     = 'Format MM/YY'
    if (!/^\d{3,4}$/.test(payment.cvc))                   e.cvc        = '3–4 digits'
    return e
  }

  const goNext = () => {
    if (step === 'shipping') {
      const e = validateShipping()
      if (Object.keys(e).length) { setErrors(e); return }
      setErrors({}); setStep('payment')
    } else if (step === 'payment') {
      const e = validatePayment()
      if (Object.keys(e).length) { setErrors(e); return }
      setErrors({}); setStep('review')
    } else if (step === 'review') {
      // Place order — generate a fake order number
      const num = `BEY-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`
      setOrderNum(num)
      setStep('success')
      // Empty the cart on success
      setTimeout(() => clear(), 300)
    }
  }

  const goBack = () => {
    if (step === 'payment') setStep('shipping')
    else if (step === 'review') setStep('payment')
  }

  const stepIdx = STEPS.findIndex(s => s.key === step)

  const shipCents = calcShipping(subtotalCents)
  const taxCents  = Math.round(subtotalCents * TAX_RATE)
  const total     = subtotalCents + shipCents + taxCents

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={step === 'success' ? undefined : onClose}
        className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl shadow-elevation-4 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3 min-w-0">
            <span className="h-9 w-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
              <Lock size={16} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <Heading level={2} id="checkout-title" size="md">
                {step === 'success' ? 'Order Confirmed' : 'Secure Checkout'}
              </Heading>
              <Text size="xs" color="muted">256-bit SSL encrypted · Demo mode</Text>
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </header>

        {/* Stepper (hidden on success) */}
        {step !== 'success' && (
          <div className="px-6 sm:px-8 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30">
            <ol role="list" className="flex items-center gap-2">
              {STEPS.map((s, i) => {
                const active = i === stepIdx
                const done   = i < stepIdx
                return (
                  <li key={s.key} className="flex-1 flex items-center gap-2 min-w-0">
                    <div className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold',
                      done    && 'bg-primary-500 text-white',
                      active  && 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 ring-2 ring-primary-500',
                      !active && !done && 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500',
                    )}>
                      {done ? <Check size={14} aria-hidden="true" /> : <s.Icon size={14} aria-hidden="true" />}
                    </div>
                    <span className={cn(
                      'text-body-sm font-medium truncate',
                      active ? 'text-neutral-900 dark:text-neutral-50' : 'text-neutral-500',
                    )}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={cn(
                        'flex-1 h-0.5 mx-1 rounded',
                        done ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700',
                      )} aria-hidden="true" />
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {step === 'shipping' && (
            <div className="space-y-5">
              <FormField label="Email" required error={errors.email}>
                {(id, hasError) => (
                  <Input id={id} type="email" placeholder="you@example.com" error={hasError}
                    value={shipping.email} onChange={e => setShipping(s => ({ ...s, email: e.target.value }))} />
                )}
              </FormField>
              <FormField label="Full name" required error={errors.fullName}>
                {(id, hasError) => (
                  <Input id={id} placeholder="Jane Smith" error={hasError}
                    value={shipping.fullName} onChange={e => setShipping(s => ({ ...s, fullName: e.target.value }))} />
                )}
              </FormField>
              <FormField label="Street address" required error={errors.address}>
                {(id, hasError) => (
                  <Input id={id} placeholder="123 Main St, Apt 4B" error={hasError}
                    value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} />
                )}
              </FormField>
              <div className="grid sm:grid-cols-3 gap-4">
                <FormField label="City" required error={errors.city}>
                  {(id, hasError) => (
                    <Input id={id} placeholder="Vancouver" error={hasError}
                      value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
                  )}
                </FormField>
                <FormField label="Postal code" required error={errors.postal}>
                  {(id, hasError) => (
                    <Input id={id} placeholder="V6B 1A1" error={hasError}
                      value={shipping.postal} onChange={e => setShipping(s => ({ ...s, postal: e.target.value }))} />
                  )}
                </FormField>
                <FormField label="Country">
                  {id => (
                    <Select id={id}
                      value={shipping.country}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setShipping(s => ({ ...s, country: e.target.value }))}
                    >
                      <option>Canada</option>
                      <option>United States</option>
                      <option>Mexico</option>
                      <option>United Kingdom</option>
                    </Select>
                  )}
                </FormField>
              </div>
              <Text size="xs" color="muted">
                We'll send order confirmation and tracking to your email.
              </Text>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-body-sm text-blue-900 dark:text-blue-200">
                <strong>Demo mode:</strong> Use test card <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any CVC.
              </div>
              <FormField label="Name on card" required error={errors.cardName}>
                {(id, hasError) => (
                  <Input id={id} placeholder="Jane Smith" error={hasError}
                    value={payment.cardName} onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))} />
                )}
              </FormField>
              <FormField label="Card number" required error={errors.cardNumber}>
                {(id, hasError) => (
                  <Input id={id} inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" error={hasError}
                    value={payment.cardNumber}
                    onChange={e => setPayment(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))} />
                )}
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Expiry (MM/YY)" required error={errors.expiry}>
                  {(id, hasError) => (
                    <Input id={id} inputMode="numeric" placeholder="12/28" error={hasError}
                      value={payment.expiry}
                      onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
                  )}
                </FormField>
                <FormField label="CVC" required error={errors.cvc}>
                  {(id, hasError) => (
                    <Input id={id} inputMode="numeric" placeholder="123" error={hasError}
                      value={payment.cvc}
                      onChange={e => setPayment(p => ({ ...p, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                  )}
                </FormField>
              </div>
              <Checkbox
                label="Save this card for future orders"
                checked={payment.saveInfo}
                onChange={e => setPayment(p => ({ ...p, saveInfo: e.target.checked }))}
              />
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-5">
              {/* Order items */}
              <div>
                <Heading level={3} size="sm" className="mb-3">Order Summary</Heading>
                <ul role="list" className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                  {items.map(item => {
                    const p = resolve(item)
                    if (!p) return null
                    return (
                      <li key={item.productId} className="flex gap-3 p-3 items-center">
                        <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover bg-neutral-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm font-medium truncate">{p.name}</p>
                          <p className="text-body-xs text-neutral-500">Qty {item.qty}{p.size ? ` · ${p.size}` : ''}</p>
                        </div>
                        <p className="text-body-sm font-semibold tabular-nums">{formatPrice(p.priceCents * item.qty)}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Shipping address */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <Heading level={3} size="sm">Ship to</Heading>
                  <button onClick={() => setStep('shipping')} className="text-body-xs font-medium text-primary-500 hover:text-primary-600">Edit</button>
                </div>
                <Text size="sm" color="muted">
                  {shipping.fullName}<br />
                  {shipping.address}<br />
                  {shipping.city}, {shipping.postal}<br />
                  {shipping.country}
                </Text>
              </div>

              {/* Payment */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <Heading level={3} size="sm">Pay with</Heading>
                  <button onClick={() => setStep('payment')} className="text-body-xs font-medium text-primary-500 hover:text-primary-600">Edit</button>
                </div>
                <Text size="sm" color="muted">
                  Card ending in {payment.cardNumber.slice(-4)}<br />
                  Expires {payment.expiry}
                </Text>
              </div>

              {/* Totals */}
              <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/40 p-4 space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                  <span className="tabular-nums">{shipCents === 0 ? 'Free' : formatPrice(shipCents)}</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax (5%)</span>
                  <span className="tabular-nums">{formatPrice(taxCents)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="tabular-nums text-heading-sm text-primary-600 dark:text-primary-300">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <span className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-5 animate-scale-in">
                <Check size={40} aria-hidden="true" />
              </span>
              <Heading level={2} size="xl" className="mb-2">Thank you!</Heading>
              <Text color="muted" className="max-w-md mx-auto mb-6">
                Your order <span className="font-semibold text-neutral-900 dark:text-neutral-50">{orderNum}</span> is confirmed.
                We've sent a receipt to <span className="font-semibold text-neutral-900 dark:text-neutral-50">{shipping.email}</span>.
                Tracking info will follow shortly.
              </Text>
              <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 p-4 max-w-md mx-auto">
                <div className="flex items-center gap-3 text-left">
                  <Truck size={18} className="text-primary-500 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-body-sm font-semibold">Estimated delivery</p>
                    <p className="text-body-xs text-neutral-500">3–5 business days · {shipping.city}, {shipping.country}</p>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" className="mt-8" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== 'success' && (
          <footer className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            {step !== 'shipping' ? (
              <Button variant="ghost" iconLeft={<ArrowLeft size={16} />} onClick={goBack}>
                Back
              </Button>
            ) : <span />}
            <div className="flex items-center gap-4">
              <Text size="sm" color="muted" className="hidden sm:inline">
                Total: <span className="font-bold text-neutral-900 dark:text-neutral-50 tabular-nums">{formatPrice(total)}</span>
              </Text>
              <Button
                variant="primary"
                size="lg"
                iconRight={step === 'review' ? <Lock size={16} /> : <ArrowRight size={16} />}
                onClick={goNext}
                disabled={items.length === 0}
              >
                {step === 'review' ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
