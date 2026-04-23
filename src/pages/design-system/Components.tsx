import { useState } from 'react'
import { Mail, Plus, Trash2, Bell, Star } from 'lucide-react'
import { Heading, Text } from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Avatar } from '@/components/atoms/Avatar'
import { Spinner } from '@/components/atoms/Spinner'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ProductCard } from '@/components/molecules/Card'
import { Alert } from '@/components/molecules/Alert'
import { Modal } from '@/components/molecules/Modal'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <Heading level={2} size="lg">{title}</Heading>
      {children}
      <div className="section-divider" />
    </section>
  )
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-label-md uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function Components() {
  const [modalOpen, setModalOpen]  = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">

      {/* Header */}
      <div>
        <Badge variant="primary" dot className="mb-3">UI Components</Badge>
        <Heading level={1} size="display-sm">Components</Heading>
        <Text color="muted" size="lg" className="mt-3 max-w-2xl">
          Every component supports variants, states, dark mode, and meets WCAG 2.1 AA accessibility standards.
        </Text>
      </div>

      {/* Buttons */}
      <Section title="Button">
        <DemoRow label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="cta">Call to Action</Button>
        </DemoRow>

        <DemoRow label="Sizes">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </DemoRow>

        <DemoRow label="States">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button iconLeft={<Mail size={16} />}>With Icon</Button>
          <Button variant="secondary" iconRight={<Plus size={16} />}>Add Item</Button>
          <Button variant="danger" iconLeft={<Trash2 size={16} />} size="sm">Delete</Button>
        </DemoRow>
      </Section>

      {/* Badges */}
      <Section title="Badge">
        <DemoRow label="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </DemoRow>

        <DemoRow label="With dot">
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Away</Badge>
          <Badge variant="danger"  dot>Offline</Badge>
          <Badge variant="info"    dot>Syncing</Badge>
        </DemoRow>

        <DemoRow label="Sizes">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </DemoRow>
      </Section>

      {/* Avatar */}
      <Section title="Avatar">
        <DemoRow label="Initials & Colors">
          <Avatar initials="ME" alt="Maria Elena" size="xl" />
          <Avatar initials="JD" alt="John Doe"    size="xl" />
          <Avatar initials="AK" alt="Alex Kim"    size="xl" />
          <Avatar initials="SL" alt="Sara Lee"    size="xl" />
        </DemoRow>

        <DemoRow label="Sizes">
          <Avatar initials="ME" alt="XS" size="xs" />
          <Avatar initials="ME" alt="SM" size="sm" />
          <Avatar initials="ME" alt="MD" size="md" />
          <Avatar initials="ME" alt="LG" size="lg" />
          <Avatar initials="ME" alt="XL" size="xl" />
          <Avatar initials="ME" alt="2XL" size="2xl" />
        </DemoRow>

        <DemoRow label="With status">
          <Avatar initials="ME" alt="Online"  size="lg" status="online"  />
          <Avatar initials="JD" alt="Away"    size="lg" status="away"    />
          <Avatar initials="AK" alt="Busy"    size="lg" status="busy"    />
          <Avatar initials="SL" alt="Offline" size="lg" status="offline" />
        </DemoRow>

        <DemoRow label="Variants">
          <Avatar initials="ME" alt="Circle"  variant="circle"  size="xl" />
          <Avatar initials="ME" alt="Rounded" variant="rounded" size="xl" />
        </DemoRow>
      </Section>

      {/* Spinner */}
      <Section title="Spinner">
        <DemoRow label="Sizes">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </DemoRow>
      </Section>

      {/* Cards */}
      <Section title="Card">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>A standard card with border and subtle shadow.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" color="muted">Card body content goes here. Great for grouping related information.</Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">Cancel</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" padding="md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Elevated</CardTitle>
                <Badge variant="secondary" size="sm">New</Badge>
              </div>
              <CardDescription>Larger shadow, no border. Great for prominent content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <Avatar initials="ME" size="md" />
                <div>
                  <p className="text-heading-xs font-semibold text-neutral-900 dark:text-neutral-50">Maria Elena</p>
                  <p className="text-body-xs text-neutral-500">Design System Lead</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="interactive" padding="md" className="cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
                <Star size={20} aria-hidden="true" />
              </span>
            </div>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Lifts on hover. Perfect for clickable list items or navigation.</CardDescription>
            </CardHeader>
          </Card>

          <Card variant="filled" padding="md">
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
              <CardDescription>Subtle background fill, no border. Good for secondary sections.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge>React</Badge>
                <Badge variant="secondary">Tailwind</Badge>
                <Badge variant="success">TypeScript</Badge>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Bold border with transparent background.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Notifications</span>
                <Badge variant="danger" size="sm">3 new</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Product Card */}
      <Section title="Product Card">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard
            image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80"
            name="C-Bright Eye Cream"
            price="$25"
            description="Brightening vitamin C formula for dark circles and fine lines."
            badge="Best Seller"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&q=80"
            name="Niacinamide Booster"
            price="$35"
            description="Pore-minimizing serum with 10% niacinamide and zinc."
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80"
            name="Rosehip Face Oil"
            price="$44"
            description="Rich in vitamin A and antioxidants for regenerative care."
            badge="New"
          />
        </div>
      </Section>

      {/* Alerts */}
      <Section title="Alert">
        <div className="space-y-3 max-w-2xl">
          <Alert variant="info"    title="Heads up">This is an informational alert with a title and body text.</Alert>
          <Alert variant="success" title="Success!">Your changes have been saved successfully.</Alert>
          <Alert variant="warning" title="Warning">This action may have unintended consequences.</Alert>
          {!alertDismissed && (
            <Alert variant="danger" title="Error" onDismiss={() => setAlertDismissed(true)}>
              Something went wrong. Please try again or contact support.
            </Alert>
          )}
        </div>
      </Section>

      {/* Modal */}
      <Section title="Modal">
        <Button onClick={() => setModalOpen(true)} iconLeft={<Bell size={16} />}>
          Open Modal
        </Button>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Action"
          description="This action cannot be undone. Please confirm before proceeding."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="danger"  size="sm" iconLeft={<Trash2 size={14} />} onClick={() => setModalOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <Alert variant="warning" title="Are you sure?">
            Deleting this item will permanently remove all associated data. This cannot be recovered.
          </Alert>
        </Modal>
      </Section>
    </div>
  )
}
