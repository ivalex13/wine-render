import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'

const STATS = [
  { number: '12M+', label: 'Unique configurations' },
  { number: '150+', label: 'Bottle shapes' },
  { number: '<60min', label: 'Delivery time' },
  { number: '$29', label: 'Per image' },
]

const STEPS = [
  {
    step: '01',
    title: 'Configure your bottle',
    desc: 'Choose from 150+ bottle shapes, 12 glass colors, 25+ liquid shades, and 150+ closure finishes.',
  },
  {
    step: '02',
    title: 'Upload your label',
    desc: 'Upload a PNG with a transparent background. Use our free label prep service if you need help.',
  },
  {
    step: '03',
    title: 'Preview and pay',
    desc: 'Position your label with the live builder. Only pay once you\'re happy with the setup.',
  },
  {
    step: '04',
    title: 'Receive your render',
    desc: 'A 2,160px PNG with transparent background lands in your inbox — typically within 60 minutes.',
  },
]

const USE_CASES = [
  'E-commerce product listings',
  'Pre-order campaigns',
  'TTB label approvals',
  'Distributor presentations',
  'Investor pitch decks',
  'Website refreshes',
  'Social media content',
  'Press kits and media releases',
  'Retailer shelf materials',
]

const FAQS = [
  { q: 'How long does a render take?', a: 'Renders are typically delivered within 60 minutes of payment confirmation.' },
  { q: 'What file format do I receive?', a: 'A high-resolution PNG at 2,160px on the long side, with a transparent background. Royalty-free usage rights included.' },
  { q: 'What label file format do I need?', a: 'A PNG with a transparent background works best. If you only have a PDF, AI, or JPG, use our free label prep service — we\'ll convert it within 2 business days.' },
  { q: 'Can I preview before paying?', a: 'Yes. Configure your bottle, upload your label, and position it with the live builder. You only pay once you\'re satisfied with the setup.' },
  { q: 'Is there a subscription?', a: 'No. It\'s a flat $29 per image. Your first 10 orders are $29 each, then the loyalty price of $23 applies automatically — no codes, no sign-ups.' },
  { q: 'What bottle shapes are available?', a: 'Bordeaux, Burgundy, Hock/Alsace, Champagne, and specialty styles in 375mL, 750mL, and 1.5L magnums. See the full library at /library.' },
  { q: 'What closure types are supported?', a: 'Screwcaps, natural and synthetic corks, DIAM corks, tin capsules (satin, gloss, and matte in 50+ colors), crown caps, wax seals, and Champagne cage & muselet.' },
  { q: 'Can I order multiple images at once?', a: 'Each image is ordered individually. If you need a batch, simply configure and submit each one — your loyalty discount applies across all orders automatically.' },
  { q: 'Is the label prep service really free?', a: 'Yes. Send us your label file in any format and we\'ll return a clean PNG ready to upload within 2 business days, at no charge.' },
  { q: 'How accurate is the render to what my bottle will look like?', a: 'Very accurate. We use true 3D rendering — not mockup templates or AI generation. Light, materials, glass refraction, and liquid color are all physically simulated.' },
  { q: 'What\'s the difference between this and a photo mockup?', a: 'Mockups place a 2D label image onto a flat photo. Our renders are built in 3D from scratch — the light wraps around the bottle correctly, the glass refracts realistically, and the result is indistinguishable from studio photography.' },
  { q: 'Do you offer refunds?', a: 'If your render doesn\'t match the configuration you submitted, we\'ll redo it at no charge. See our refund policy for full details.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 py-32 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 130%, oklch(0.50 0.18 322 / 0.20) 0%, transparent 62%)' }}
        />
        <Badge variant="secondary" className="mb-6">No photoshoot. No samples. No waiting.</Badge>
        <h1 className="text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
          Instant bottle shots, ready to sell.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Built for online listings, sales materials, and distributor presentations. True 3D rendering — not AI, not mockups.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/configure" className={buttonVariants({ size: 'lg' })}>Create my first bottle shot</Link>
          <Link href="/library" className={buttonVariants({ variant: 'outline', size: 'lg' })}>Explore options</Link>
        </div>
      </section>

      {/* Stats — plum gradient */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-extrabold mb-1 text-white">{s.number}</div>
              <div className="text-sm text-white/65">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain point */}
      <section className="border-b border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Getting great bottle photography is hard.</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">The old way</div>
              {[
                'Physical sample bottle needed',
                'Shipping to a studio — and back',
                'Scheduling a photoshoot',
                'Days of retouching',
                'Weeks of waiting',
                'Hundreds or thousands of dollars',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-red-400 font-bold text-lg leading-none">✕</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'oklch(0.65 0.18 322)' }}>With WineRender</div>
              {[
                'Label file only — no physical bottle',
                'Upload from anywhere, anytime',
                'No scheduling, no studio',
                'Delivered in under 60 minutes',
                'Ready to use immediately',
                '$29 flat, no hidden fees',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="font-bold text-lg leading-none" style={{ color: 'oklch(0.50 0.18 322)' }}>✓</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech differentiator */}
      <section className="border-b border-border" style={{ background: 'oklch(0.14 0.010 310)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Why it looks real</p>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Not a mockup.<br />Not AI.<br />
            <span style={{ color: 'oklch(0.65 0.18 322)' }}>Just real 3D rendering.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every image is rendered from a fully 3D model. Light wraps around the bottle correctly. Glass refracts realistically. Liquid color interacts with the glass shade. The result is indistinguishable from a studio photoshoot — because the physics are the same.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            {[
              { label: 'Accurate light & shadow', desc: 'Physically simulated, not painted on' },
              { label: 'Glass refraction', desc: 'Real interaction between glass and liquid' },
              { label: '10+ years of 3D expertise', desc: 'Built on professional studio infrastructure' },
            ].map((item) => (
              <div key={item.label} className="p-4">
                <div className="font-semibold text-sm mb-1">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-3 text-center">How it works</h2>
        <p className="text-muted-foreground text-center mb-16">Four steps from label file to finished render.</p>
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
      <section className="border-y border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
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
                {['2,160px PNG with transparent background', 'Royalty-free usage rights', 'Delivered in under 60 minutes', '12M+ configuration combinations', 'Live label builder included'].map(item => (
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
                {['Everything in the standard plan', 'Loyalty discount applied automatically', 'No codes, no sign-ups required', 'No commitment or minimum orders'].map(item => (
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
          <Link href="/configure" className={buttonVariants({ size: 'lg' })}>Create my first bottle shot</Link>
        </div>
      </section>

      {/* Label prep CTA */}
      <section className="border-y border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Free service</p>
          <h2 className="text-3xl font-bold mb-4">Need help with your label file?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Send us whatever you have — PDF, AI, JPG, EPS. We&apos;ll convert it into a clean PNG with a transparent background, ready to upload. Free, delivered within 2 business days.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/label-prep" className={buttonVariants({ size: 'lg' })}>Request free label prep</Link>
            <Link href="/configure" className={buttonVariants({ variant: 'outline', size: 'lg' })}>I already have a PNG</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
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
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to create your first bottle shot?</h2>
          <p className="mb-8" style={{ color: 'oklch(0.96 0 0 / 0.65)' }}>Skip the samples, shipping, and photoshoots. Get your image in under 60 minutes.</p>
          <Link
            href="/configure"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white font-semibold text-sm hover:bg-white/90 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Create my first bottle shot — $29
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-4">
          <span>© 2026 WineRender</span>
          <div className="flex items-center gap-6">
            <Link href="/library" className="hover:text-foreground transition-colors">Library</Link>
            <Link href="/colors" className="hover:text-foreground transition-colors">Colors</Link>
            <Link href="/label-prep" className="hover:text-foreground transition-colors">Label prep</Link>
          </div>
          <span>Professional 3D wine bottle renders</span>
        </div>
      </footer>
    </div>
  )
}
