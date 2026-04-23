import { useState } from 'react'
import { Mail, Lock, User, Search, Eye, EyeOff, Check } from 'lucide-react'
import { Heading, Text } from '@/components/atoms/Typography'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Input, Textarea, Select } from '@/components/atoms/Input'
import { FormField, Checkbox, RadioGroup, RadioOption } from '@/components/molecules/FormField'
import { Alert } from '@/components/molecules/Alert'

export function Forms() {
  const [showPw, setShowPw]       = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '', agree: false })
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Full name is required'
    if (!form.email.trim())   e.email   = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Message cannot be empty'
    if (!form.agree)          e.agree   = 'You must agree to the privacy policy'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">

      {/* Header */}
      <div>
        <Badge variant="primary" dot className="mb-3">UI Components</Badge>
        <Heading level={1} size="display-sm">Forms</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Accessible form components with built-in validation, error states, and ARIA support.
          Keyboard-navigable and screen-reader friendly.
        </Text>
      </div>

      {/* Input variants */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Input Variants</Heading>
        <div className="grid md:grid-cols-3 gap-6">
          <FormField label="Default input">
            {(id) => <Input id={id} placeholder="Placeholder text" />}
          </FormField>
          <FormField label="Filled input">
            {(id) => <Input id={id} variant="filled" placeholder="Filled variant" />}
          </FormField>
          <FormField label="Flushed input">
            {(id) => <Input id={id} variant="flushed" placeholder="Flushed variant" />}
          </FormField>
        </div>
      </section>

      {/* Input states */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Input States</Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField label="With left icon" hint="Your account email address">
            {(id) => <Input id={id} type="email" iconLeft={<Mail size={16} />} placeholder="name@example.com" />}
          </FormField>

          <FormField label="Password" hint="At least 8 characters">
            {(id) => (
              <Input
                id={id}
                type={showPw ? 'text' : 'password'}
                iconLeft={<Lock size={16} />}
                iconRight={
                  <button type="button" onClick={() => setShowPw(p => !p)} aria-label={showPw ? 'Hide password' : 'Show password'} className="cursor-pointer">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                placeholder="••••••••"
              />
            )}
          </FormField>

          <FormField label="Search">
            {(id) => <Input id={id} type="search" iconLeft={<Search size={16} />} placeholder="Search…" />}
          </FormField>

          <FormField label="Error state" error="This field is required">
            {(id, hasError) => <Input id={id} error={hasError} placeholder="Enter value" defaultValue="bad input" />}
          </FormField>

          <FormField label="Disabled">
            {(id) => <Input id={id} disabled placeholder="Disabled input" />}
          </FormField>

          <FormField label="Sizes">
            {(id) => (
              <div className="space-y-2">
                <Input id={`${id}-sm`} size="sm" placeholder="Small" />
                <Input id={`${id}-md`} size="md" placeholder="Medium (default)" />
                <Input id={`${id}-lg`} size="lg" placeholder="Large" />
              </div>
            )}
          </FormField>
        </div>
      </section>

      {/* Textarea */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Textarea</Heading>
        <div className="max-w-lg">
          <FormField label="Message" hint="Maximum 500 characters">
            {(id) => <Textarea id={id} rows={4} placeholder="Write your message here…" />}
          </FormField>
        </div>
      </section>

      {/* Select */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Select</Heading>
        <div className="max-w-xs">
          <FormField label="Country">
            {(id) => (
              <Select id={id}>
                <option value="">Select a country…</option>
                <option>Canada</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </Select>
            )}
          </FormField>
        </div>
      </section>

      {/* Checkboxes & Radios */}
      <section className="space-y-8">
        <Heading level={2} size="lg">Checkboxes & Radio Groups</Heading>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Text size="sm" weight="semibold" color="muted" className="uppercase tracking-widest text-xs">Checkboxes</Text>
            <Checkbox label="Subscribe to newsletter" hint="Receive weekly design system updates" defaultChecked />
            <Checkbox label="Enable dark mode by default" />
            <Checkbox label="Accept terms of service" error="You must accept the terms" />
          </div>

          <RadioGroup legend="Notification Preference">
            <RadioOption name="notifications" value="all"      label="All notifications"    hint="Receive every update"  />
            <RadioOption name="notifications" value="mentions" label="Mentions only"         hint="Only when tagged"      defaultChecked />
            <RadioOption name="notifications" value="none"     label="No notifications"      hint="Turn everything off"   />
          </RadioGroup>
        </div>
      </section>

      {/* Full contact form */}
      <section className="space-y-6">
        <Heading level={2} size="lg">Full Form Example</Heading>

        {submitted ? (
          <Alert variant="success" title="Message sent!" className="max-w-2xl">
            Thank you for reaching out. We'll get back to you within 1–2 business days.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Full name" required error={errors.name}>
                {(id, hasError) => (
                  <Input id={id} iconLeft={<User size={16} />} placeholder="Jane Smith" error={hasError}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                )}
              </FormField>

              <FormField label="Email address" required error={errors.email}>
                {(id, hasError) => (
                  <Input id={id} type="email" iconLeft={<Mail size={16} />} placeholder="jane@example.com" error={hasError}
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                )}
              </FormField>
            </div>

            <FormField label="Subject">
              {(id) => (
                <Select id={id} value={form.subject} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, subject: e.target.value }))}>
                  <option value="">Select a subject…</option>
                  <option>General inquiry</option>
                  <option>Product feedback</option>
                  <option>Support request</option>
                  <option>Partnership</option>
                </Select>
              )}
            </FormField>

            <FormField label="Message" required error={errors.message}>
              {(id, hasError) => (
                <Textarea id={id} rows={5} placeholder="Your message…" error={hasError}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              )}
            </FormField>

            <Checkbox
              label="I agree to the Privacy Policy and Terms of Service"
              error={errors.agree}
              checked={form.agree}
              onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" size="lg" iconLeft={<Check size={18} />}>
                Send Message
              </Button>
              <Button type="reset" variant="outline" size="lg" onClick={() => { setForm({ name:'', email:'', subject:'', message:'', agree:false }); setErrors({}) }}>
                Clear
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
