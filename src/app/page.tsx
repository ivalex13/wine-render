import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const FEATURES = [
  { number: '150+', label: 'Bottle shapes' },
  { number: '12+', label: 'Glass colors' },
  { number: '25+', label: 'Liquid shades' },
  { number: '150+', label: 'Closure finishes' },
]

const STEPS = [
  {
    step: '01',
    title: 'Configure your bottle',
    desc: 'Select bottle shape, glass color, liquid shade, and closure finish from our library of options.',
  },
  {
    step: '02',
    title: 'Upload your label',
    desc: 'Upload a PNG with a transparent background and adjust placement using our live label builder.',
  },
  {
    step: '03',
    title: 'Pay and submit',
    desc: 'Pay $29 per image. No subscription, no hidden fees. First 10 orders at $29, then $23.',
  },
  {
    step: '04',
    title: 'Receive your render',
    desc: 'Get a photorealistic 2,160px PNG with transparent background delivered within 60 minutes.',
  },
]

const USE_CASES = [
  'E-commerce product listings',
  'Pre-order campaigns',
  'TTB label approvals',
  'Distributor presentations',
  'Investor pitch decks',
  'Website refreshes',
]

const FAQS = [
  {
    q: 'How long does a render take?',
    a: 'Renders are typically delivered within 60 minutes of payment confirmation.',
  },
  {
    q: 'What file format do I receive?',
    a: 'High-resolution PNG files at 2,160px on the long side with a transparent background, royalty-free.',
  },
  {
    q: 'What label file format do I need?',
    a: 'PNG files with a transparent background work best. We offer a free label preparation service if you need help.',
  },
  {
    q: 'Can I preview before paying?',
    a: 'Yes. You can configure your bottle and see a preview before submitting payment.',
  },
  {
    q: 'Is there a subscription?',
    a: "No. It's a flat $29 per image for your first 10 orders, then $23 per image. Pay only for what you need.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">WineRender</span>
          <div className="flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/configure" className={buttonVariants({ size: 'sm' })}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 py-32 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 130%, oklch(0.50 0.18 322 / 0.22) 0%, transparent 62%)' }}
        />
        <Badge variant="secondary" className="mb-6">Professional renders in under 60 minutes</Badge>
        <h1 className="text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
          Photorealistic wine bottle imagery — without the photoshoot
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your label, configure your bottle, and receive a studio-quality 3D render ready for e-commerce, marketing, and compliance — all for a flat fee per image.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/configure" className={buttonVariants({ size: 'lg' })}>Create your render — $29</Link>
          <Link href="#how-it-works" className={buttonVariants({ variant: 'outline', size: 'lg' })}>See how it works</Link>
        </div>
      </section>

      {/* Stats — plum gradient */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {FEATURES.map((f) => (
            <div key={f.label}>
              <div className="text-5xl font-extrabold mb-1 text-white">{f.number}</div>
              <div className="text-sm text-white/65">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-3 text-center">How it works</h2>
        <p className="text-muted-foreground text-center mb-16">Four steps from configuration to finished render.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {STEPS.map((s) => (
            <Card key={s.step} className="border-border bg-card">
              <CardContent className="p-8">
                <div className="text-5xl font-extrabold mb-4" style={{ color: 'oklch(0.50 0.18 322 / 0.25)' }}>{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-3 text-center">Built for every stage of your sales cycle</h2>
          <p className="text-muted-foreground text-center mb-12">From pre-release to point-of-sale.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-center gap-3 bg-card rounded-lg border border-border px-4 py-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'oklch(0.50 0.18 322)' }} />
                <span className="text-sm">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-3">Simple, flat-rate pricing</h2>
        <p className="text-muted-foreground mb-16">No subscription. No hidden fees. Pay per render.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
          <Card className="flex-1 bg-card" style={{ borderColor: 'oklch(0.50 0.18 322 / 0.6)' }}>
            <CardContent className="p-8">
              <div className="text-4xl font-extrabold mb-2">$29</div>
              <div className="text-sm text-muted-foreground mb-6">per image · first 10 orders</div>
              <Separator className="mb-6" />
              <ul className="text-sm text-muted-foreground space-y-2.5 text-left">
                {['2,160px PNG with transparent background', 'Royalty-free', 'Delivered in under 60 minutes', '12M+ bottle configurations'].map(item => (
                  <li key={item} className="flex gap-2 items-start">
                    <span style={{ color: 'oklch(0.50 0.18 322)' }} className="font-bold mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="flex-1 border-border bg-card">
            <CardContent className="p-8">
              <div className="text-4xl font-extrabold mb-2">$23</div>
              <div className="text-sm text-muted-foreground mb-6">per image · after 10 orders</div>
              <Separator className="mb-6" />
              <ul className="text-sm text-muted-foreground space-y-2.5 text-left">
                {['Everything in the standard plan', 'Volume discount applied automatically', 'No commitment required'].map(item => (
                  <li key={item} className="flex gap-2 items-start">
                    <span style={{ color: 'oklch(0.50 0.18 322)' }} className="font-bold mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <Link href="/configure" className={buttonVariants({ size: 'lg' })}>Start your first render</Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-border">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA — plum gradient */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to create your first render?</h2>
          <p className="mb-8" style={{ color: 'oklch(0.96 0 0 / 0.65)' }}>Professional wine bottle imagery, delivered in under 60 minutes.</p>
          <Link
            href="/configure"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white font-semibold text-sm hover:bg-white/90 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Get started — $29 per image
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 WineRender</span>
          <span>Professional 3D wine bottle renders</span>
        </div>
      </footer>
    </div>
  )
}
