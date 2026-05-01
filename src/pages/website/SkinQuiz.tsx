import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, RefreshCw, Sparkles, Check, ShoppingBag,
  Droplet, Sun, Leaf, Zap, Flame, AlertTriangle, Mail,
} from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Input } from '@/components/atoms/Input'
import { FormField, Checkbox } from '@/components/molecules/FormField'
import { Heading, Text } from '@/components/atoms/Typography'
import { useCart } from '@/context/CartContext'
import { products, formatPrice, type SkinType, type Concern, type Step as RoutineStep } from '@/data/products'
import { cn } from '@/utils/cn'

/* ─── Quiz model ──────────────────────────────────────────────────────────── */
type RoutineDepth = 'minimal' | 'core' | 'complete' | 'expert'

interface Answers {
  skinType:     SkinType | null
  concerns:     Concern[]
  goal:         'clarity' | 'glow' | 'hydration' | 'even-tone' | 'anti-age' | null
  depth:        RoutineDepth
  sensitive:    boolean | null
  email:        string
  newsletter:   boolean
}

const initialAnswers: Answers = {
  skinType:   null,
  concerns:   [],
  goal:       null,
  depth:      'core',
  sensitive:  null,
  email:      '',
  newsletter: false,
}

/* ─── Step config — declarative so the wizard renders from data ──────────── */
const skinTypeOptions: { value: SkinType; label: string; desc: string; Icon: typeof Droplet }[] = [
  { value: 'oily',        label: 'Oily',        desc: 'Shine all over by midday', Icon: Droplet },
  { value: 'dry',         label: 'Dry',         desc: 'Tightness, flakiness',     Icon: Sun },
  { value: 'combination', label: 'Combination', desc: 'Oily T-zone, dry cheeks',  Icon: Leaf },
  { value: 'sensitive',   label: 'Sensitive',   desc: 'Reacts to many products',  Icon: Flame },
  { value: 'normal',      label: 'Normal',      desc: 'Comfortable, balanced',    Icon: Zap },
]

const concernOptions: { value: Concern; label: string; emoji: string }[] = [
  { value: 'acne',         label: 'Breakouts & acne',     emoji: '🔴' },
  { value: 'dullness',     label: 'Dullness',             emoji: '✨' },
  { value: 'dark-spots',   label: 'Dark spots',           emoji: '🟤' },
  { value: 'fine-lines',   label: 'Fine lines & wrinkles',emoji: '〰️' },
  { value: 'redness',      label: 'Redness & irritation', emoji: '🌹' },
  { value: 'dryness',      label: 'Dryness & tightness',  emoji: '🏜️' },
  { value: 'large-pores',  label: 'Large pores',          emoji: '⬤' },
  { value: 'uneven-tone',  label: 'Uneven tone',          emoji: '🎨' },
]

const goalOptions: { value: NonNullable<Answers['goal']>; label: string; desc: string }[] = [
  { value: 'clarity',    label: 'Clear, balanced skin',         desc: 'Calm breakouts, refine pores' },
  { value: 'glow',       label: 'Brightness and glow',          desc: 'Even tone, lit-from-within radiance' },
  { value: 'hydration',  label: 'Deep hydration',               desc: 'Plump, dewy, comfortable skin' },
  { value: 'even-tone',  label: 'Even out my skin tone',        desc: 'Reduce dark spots and discoloration' },
  { value: 'anti-age',   label: 'Smooth fine lines',            desc: 'Firmer, smoother, more elastic skin' },
]

const depthOptions: { value: RoutineDepth; steps: number; label: string; desc: string }[] = [
  { value: 'minimal',  steps: 2, label: 'Minimal',  desc: 'The essentials — cleanse + SPF' },
  { value: 'core',     steps: 4, label: 'Core',     desc: 'Cleanse, treat, moisturise, SPF' },
  { value: 'complete', steps: 5, label: 'Complete', desc: 'Add toner for full balance' },
  { value: 'expert',   steps: 7, label: 'Expert',   desc: 'Multi-serum, eye, treatment layered routine' },
]

/* ─── Recommendation engine ──────────────────────────────────────────────── */

/**
 * Score products against the answers. Higher score = better fit.
 * Each step in the routine returns the top-scoring product for that step.
 */
function recommendRoutine(answers: Answers): { stepName: string; product: typeof products[0] }[] {
  const stepsByDepth: Record<RoutineDepth, RoutineStep[]> = {
    minimal:  ['cleanser', 'sunscreen'],
    core:     ['cleanser', 'serum', 'moisturiser', 'sunscreen'],
    complete: ['cleanser', 'tone', 'serum', 'moisturiser', 'sunscreen'],
    expert:   ['cleanser', 'tone', 'serum', 'eye', 'treatment', 'moisturiser', 'sunscreen'],
  }
  const steps = stepsByDepth[answers.depth]

  const scored = (p: typeof products[0]) => {
    let s = 0
    if (answers.skinType && p.forSkin.includes(answers.skinType))         s += 4
    answers.concerns.forEach(c => { if (p.forConcerns.includes(c))        s += 3 })
    // Goal-driven adjustments
    if (answers.goal === 'glow'      && p.forConcerns.includes('dullness'))   s += 2
    if (answers.goal === 'clarity'   && p.forConcerns.includes('acne'))       s += 2
    if (answers.goal === 'hydration' && p.forConcerns.includes('dryness'))    s += 2
    if (answers.goal === 'even-tone' && p.forConcerns.includes('dark-spots')) s += 2
    if (answers.goal === 'anti-age'  && p.forConcerns.includes('fine-lines')) s += 2
    // Avoid retinol if sensitive — penalize
    if (answers.sensitive && p.slug === 'retinol-renewal-serum') s -= 10
    return s
  }

  const stepNames: Record<RoutineStep, string> = {
    cleanser:    'Cleanse',
    tone:        'Tone',
    serum:       'Treat',
    moisturiser: 'Moisturise',
    sunscreen:   'Protect',
    eye:         'Eye care',
    treatment:   'Boost',
  }

  const used = new Set<number>()
  return steps
    .map(step => {
      const candidates = products
        .filter(p => p.step === step && !used.has(p.id))
        .map(p => ({ p, score: scored(p) }))
        .sort((a, b) => b.score - a.score)
      const pick = candidates[0]?.p
      if (pick) used.add(pick.id)
      return pick ? { stepName: stepNames[step], product: pick } : null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const TOTAL_STEPS = 6 // 0..5 question steps; 6 = result

export function SkinQuiz() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const { add, openDrawer }   = useCart()

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers(a => ({ ...a, [key]: value }))

  const toggleConcern = (c: Concern) =>
    setAnswers(a => ({
      ...a,
      concerns: a.concerns.includes(c) ? a.concerns.filter(x => x !== c) : [...a.concerns, c],
    }))

  // Per-step validation — disables Continue until current step is valid
  const canContinue = useMemo(() => {
    switch (step) {
      case 0: return !!answers.skinType
      case 1: return answers.concerns.length > 0
      case 2: return !!answers.goal
      case 3: return true   // depth always has a default
      case 4: return answers.sensitive !== null
      case 5: return answers.email === '' || /\S+@\S+\.\S+/.test(answers.email) // optional but valid if filled
      default: return true
    }
  }, [step, answers])

  const restart = () => { setStep(0); setAnswers(initialAnswers) }
  const goNext  = () => setStep(s => Math.min(TOTAL_STEPS, s + 1))
  const goBack  = () => setStep(s => Math.max(0, s - 1))

  const routine = useMemo(() => step === TOTAL_STEPS ? recommendRoutine(answers) : [], [step, answers])
  const totalCents = routine.reduce((sum, r) => sum + r.product.priceCents, 0)

  const addAllToCart = () => {
    routine.forEach(r => add(r.product.id, 1))
    openDrawer()
  }

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-dvh">
      {/* Header */}
      <section className="gradient-brand py-12">
        <div className="container-ds text-center">
          <Badge variant="secondary" dot className="mb-3 text-white border-white/30 bg-white/10">
            <Sparkles size={12} className="mr-1" aria-hidden="true" /> Personalised in 2 minutes
          </Badge>
          <Heading level={1} size="display-sm" className="text-white">Skin Quiz</Heading>
          <Text className="mt-2 text-white/80 max-w-md mx-auto">
            Answer 5 quick questions and get a routine built for your skin.
          </Text>
        </div>
      </section>

      <div className="container-ds py-12 max-w-3xl">
        {/* Progress bar (hidden on result) */}
        {step < TOTAL_STEPS && (
          <div className="mb-8" aria-label="Quiz progress">
            <div className="flex items-center justify-between mb-2">
              <Text size="sm" color="muted">Question {step + 1} of {TOTAL_STEPS}</Text>
              <Text size="sm" color="muted">{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</Text>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                role="progressbar"
                aria-valuenow={step + 1}
                aria-valuemin={1}
                aria-valuemax={TOTAL_STEPS}
                className="h-full bg-primary-500 transition-all duration-500"
                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Card container */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-elevation-2 p-6 md:p-10">

          {/* Step 0 — Skin type */}
          {step === 0 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">What's your skin type?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  Pick the option that sounds most like your skin on a typical day.
                </Text>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {skinTypeOptions.map(opt => {
                  const active = answers.skinType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set('skinType', opt.value)}
                      aria-pressed={active}
                      className={cn(
                        'flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all',
                        active
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                      )}
                    >
                      <span className={cn(
                        'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
                        active ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-primary-500',
                      )}>
                        <opt.Icon size={18} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-50">{opt.label}</p>
                        <p className="text-body-xs text-neutral-500">{opt.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {/* Step 1 — Concerns (multi-select) */}
          {step === 1 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">What are your top concerns?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  Select all that apply — pick at least one. We'll prioritise by what you choose.
                </Text>
              </legend>
              <div className="flex flex-wrap gap-2">
                {concernOptions.map(opt => {
                  const active = answers.concerns.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleConcern(opt.value)}
                      aria-pressed={active}
                      className={cn(
                        'inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-body-sm font-medium transition-all',
                        active
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-primary-300',
                      )}
                    >
                      <span aria-hidden="true">{opt.emoji}</span>
                      {opt.label}
                      {active && <Check size={14} aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
              {answers.concerns.length > 0 && (
                <Text size="sm" color="muted" className="mt-4">
                  {answers.concerns.length} selected
                </Text>
              )}
            </fieldset>
          )}

          {/* Step 2 — Goal */}
          {step === 2 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">What's your skin goal?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  If you could change one thing, what would it be?
                </Text>
              </legend>
              <div className="space-y-2">
                {goalOptions.map(opt => {
                  const active = answers.goal === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set('goal', opt.value)}
                      aria-pressed={active}
                      className={cn(
                        'w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3',
                        active
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                      )}
                    >
                      <span className={cn(
                        'h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center',
                        active ? 'border-primary-500 bg-primary-500' : 'border-neutral-300',
                      )}>
                        {active && <Check size={12} className="text-white" aria-hidden="true" />}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-50">{opt.label}</p>
                        <p className="text-body-xs text-neutral-500">{opt.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {/* Step 3 — Routine depth */}
          {step === 3 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">How much routine do you want?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  More steps = more results, but also more time. Pick what's realistic.
                </Text>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {depthOptions.map(opt => {
                  const active = answers.depth === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set('depth', opt.value)}
                      aria-pressed={active}
                      className={cn(
                        'p-4 rounded-2xl border-2 text-left transition-all',
                        active
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-50">{opt.label}</p>
                        <Badge variant="outline" size="sm">{opt.steps} steps</Badge>
                      </div>
                      <p className="text-body-xs text-neutral-500">{opt.desc}</p>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {/* Step 4 — Sensitivity */}
          {step === 4 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">Does your skin react to active ingredients?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  Things like retinol, AHAs, fragrance — does your skin tend to redden, sting, or flake?
                </Text>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { value: true,  label: 'Yes — I have to be careful', icon: AlertTriangle },
                  { value: false, label: 'No — I tolerate them well',  icon: Check },
                ].map(opt => {
                  const active = answers.sensitive === opt.value
                  return (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => set('sensitive', opt.value)}
                      aria-pressed={active}
                      className={cn(
                        'p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-3',
                        active
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                      )}
                    >
                      <span className={cn(
                        'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
                        active ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-primary-500',
                      )}>
                        <opt.icon size={18} aria-hidden="true" />
                      </span>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-50">{opt.label}</p>
                    </button>
                  )
                })}
              </div>
              {answers.sensitive && (
                <Text size="sm" color="muted" className="mt-4">
                  We'll skip strong actives like retinol and recommend gentler alternatives.
                </Text>
              )}
            </fieldset>
          )}

          {/* Step 5 — Email (optional) */}
          {step === 5 && (
            <fieldset>
              <legend>
                <Heading level={2} size="lg">Want your results saved?</Heading>
                <Text color="muted" className="mt-2 mb-6">
                  We'll email your routine and a 15% off code for your first order.
                  Skip this step if you'd rather not — your routine is ready either way.
                </Text>
              </legend>
              <div className="space-y-4">
                <FormField label="Email address (optional)">
                  {(id) => (
                    <Input
                      id={id}
                      type="email"
                      placeholder="you@example.com"
                      value={answers.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  )}
                </FormField>
                {answers.email && (
                  <Checkbox
                    label="Subscribe to skincare tips and new product launches"
                    checked={answers.newsletter}
                    onChange={e => set('newsletter', e.target.checked)}
                  />
                )}
              </div>
            </fieldset>
          )}

          {/* Step 6 — Result */}
          {step === TOTAL_STEPS && (
            <div>
              <div className="text-center mb-8">
                <span className="h-16 w-16 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 animate-scale-in">
                  <Sparkles size={28} aria-hidden="true" />
                </span>
                <Heading level={2} size="xl">Your skin profile is ready</Heading>
                <Text color="muted" className="mt-2 max-w-md mx-auto">
                  Built around your <span className="font-semibold text-primary-600 dark:text-primary-300">{answers.skinType}</span> skin and your goal: <span className="italic">{goalOptions.find(g => g.value === answers.goal)?.label.toLowerCase()}</span>.
                </Text>
              </div>

              {/* Profile summary chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {answers.skinType && <Badge variant="primary">{answers.skinType} skin</Badge>}
                {answers.concerns.map(c => (
                  <Badge key={c} variant="outline">
                    {concernOptions.find(o => o.value === c)?.label}
                  </Badge>
                ))}
                {answers.sensitive && <Badge variant="secondary">Sensitive-safe</Badge>}
              </div>

              {/* Routine list */}
              <ul role="list" className="space-y-3 mb-8">
                {routine.map((r, idx) => (
                  <li
                    key={r.product.id}
                    className="flex gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className="h-9 w-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-body-sm">
                        {idx + 1}
                      </div>
                      <span className="text-label-sm uppercase tracking-widest text-primary-500 mt-1">{r.stepName}</span>
                    </div>
                    <img src={r.product.image} alt={r.product.name} className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                    <div className="flex-1 min-w-0 flex flex-col">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-50">{r.product.name}</p>
                      <p className="text-body-xs text-neutral-500 mt-0.5 line-clamp-2">{r.product.description}</p>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="text-body-sm font-bold text-primary-600 dark:text-primary-300">{formatPrice(r.product.priceCents)}</span>
                        <button
                          onClick={() => { add(r.product.id); openDrawer() }}
                          className="text-body-xs font-medium text-primary-500 hover:text-primary-700 transition-colors"
                        >
                          Add only this
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total + Add-all CTA */}
              <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 p-6 text-center">
                <Text size="sm" color="muted" className="mb-1">Complete routine</Text>
                <p className="text-display-sm font-bold text-primary-600 dark:text-primary-300 mb-4 tabular-nums">
                  {formatPrice(totalCents)}
                </p>
                <Button
                  variant="cta"
                  size="lg"
                  fullWidth
                  iconLeft={<ShoppingBag size={18} />}
                  onClick={addAllToCart}
                >
                  Add full routine to bag
                </Button>
                {answers.email && (
                  <Text size="xs" color="muted" className="mt-3">
                    <Mail size={12} className="inline -mt-0.5 mr-1" aria-hidden="true" />
                    A copy of your routine has been sent to <span className="font-semibold">{answers.email}</span>
                  </Text>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Button variant="ghost" iconLeft={<RefreshCw size={16} />} onClick={restart}>
                  Retake quiz
                </Button>
                <Link to="/website">
                  <Button variant="outline">Continue browsing</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Step nav (hidden on result) */}
          {step < TOTAL_STEPS && (
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <Button
                variant="ghost"
                iconLeft={<ArrowLeft size={16} />}
                onClick={goBack}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                variant="primary"
                iconRight={<ArrowRight size={16} />}
                onClick={goNext}
                disabled={!canContinue}
              >
                {step === TOTAL_STEPS - 1 ? 'See my routine' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
