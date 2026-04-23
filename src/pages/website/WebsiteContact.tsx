import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Check } from 'lucide-react'
import { Heading, Text } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Input, Textarea, Select } from '@/components/atoms/Input'
import { FormField, Checkbox } from '@/components/molecules/FormField'
import { Card } from '@/components/molecules/Card'

export function WebsiteContact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '', newsletter: false })
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Please enter your name'
    if (!form.email.trim())   e.email   = 'Please enter your email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.message.trim()) e.message = 'Please enter your message'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setSubmitted(true)
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">

      {/* Page header */}
      <section className="gradient-brand py-16">
        <div className="container-ds text-center">
          <Badge variant="secondary" dot className="mb-3 text-white border-white/30 bg-white/10">Get in touch</Badge>
          <Heading level={1} size="display-sm" className="text-white">Contact Us</Heading>
          <Text className="mt-3 text-white/80 max-w-md mx-auto">
            Questions about your skin? Looking for routine advice? We're here to help.
          </Text>
        </div>
      </section>

      <div className="container-ds py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <aside className="space-y-5">
            <Heading level={2} size="md">Get in Touch</Heading>

            {[
              { Icon: Mail,    label: 'Email',   value: 'hello@beyondskincare.com' },
              { Icon: Phone,   label: 'Phone',   value: '+1 (604) 555-0192'        },
              { Icon: MapPin,  label: 'Location',value: 'Vancouver, BC, Canada'    },
              { Icon: Clock,   label: 'Hours',   value: 'Mon–Fri, 9am–5pm PST'    },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-label-md uppercase tracking-wider text-neutral-400 dark:text-neutral-600">{label}</p>
                  <p className="text-body-sm font-medium text-neutral-800 dark:text-neutral-200">{value}</p>
                </div>
              </div>
            ))}

            <Card variant="filled" padding="md" className="mt-6">
              <p className="text-heading-xs font-semibold text-neutral-900 dark:text-neutral-50 mb-1">Not sure where to start?</p>
              <p className="text-body-sm text-neutral-600 dark:text-neutral-400">
                Take our free 2-minute Skin Quiz and get personalised product recommendations.
              </p>
              <Button variant="primary" size="sm" className="mt-4 w-full">Take the Skin Quiz</Button>
            </Card>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="lg">
              {submitted ? (
                <div className="text-center py-8">
                  <span className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                    <Check size={32} aria-hidden="true" />
                  </span>
                  <Heading level={2} size="lg" className="mb-2">Message Received!</Heading>
                  <Text color="muted" className="max-w-sm mx-auto">
                    Thanks for reaching out. One of our skincare specialists will be in touch within 1–2 business days.
                  </Text>
                  <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'', newsletter: false }) }}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <Heading level={2} size="md" className="mb-6">Send a Message</Heading>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label="Your name" required error={errors.name}>
                      {(id, hasError) => (
                        <Input id={id} placeholder="Jane Smith" error={hasError}
                          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                      )}
                    </FormField>

                    <FormField label="Email address" required error={errors.email}>
                      {(id, hasError) => (
                        <Input id={id} type="email" placeholder="jane@example.com" error={hasError}
                          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                      )}
                    </FormField>
                  </div>

                  <FormField label="What can we help with?">
                    {(id) => (
                      <Select id={id} value={form.subject} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, subject: e.target.value }))}>
                        <option value="">Select a topic…</option>
                        <option>Skin type quiz</option>
                        <option>Product recommendation</option>
                        <option>Order enquiry</option>
                        <option>Ingredient question</option>
                        <option>General feedback</option>
                      </Select>
                    )}
                  </FormField>

                  <FormField label="Your message" required error={errors.message}>
                    {(id, hasError) => (
                      <Textarea id={id} rows={5} placeholder="Tell us about your skin concerns or questions…" error={hasError}
                        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                    )}
                  </FormField>

                  <Checkbox
                    label="Subscribe to our newsletter for skincare tips and exclusive offers"
                    checked={form.newsletter}
                    onChange={e => setForm(f => ({ ...f, newsletter: e.target.checked }))}
                  />

                  <Button type="submit" variant="primary" size="lg" fullWidth iconLeft={<Check size={18} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
