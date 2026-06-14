import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'

// ─── Hero bottle showcase ────────────────────────────────────────────────────

function HeroBottle({
  glass,
  liquid,
  capsule = 'oklch(0.50 0.18 322)',
  height = 260,
}: {
  glass: string
  liquid: string
  capsule?: string
  height?: number
}) {
  const w = Math.round(height * 0.43)
  return (
    <div style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))' }}>
      <svg width={w} height={height} viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* body */}
        <path d="M36 82 Q30 93 28 113 L25 252 Q25 264 60 264 Q95 264 95 252 L92 113 Q90 93 84 82 Z"
          fill={glass} opacity="0.88" />
        {/* liquid */}
        <path d="M36 82 Q30 93 28 113 L28 202 Q31 213 60 213 Q89 213 92 202 L92 113 Q90 93 84 82 Z"
          fill={liquid} opacity="0.72" />
        {/* label */}
        <rect x="33" y="136" width="54" height="62" rx="3" fill="white" opacity="0.93" />
        <rect x="40" y="148" width="40" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="157" width="28" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="166" width="34" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="175" width="22" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        {/* neck */}
        <rect x="49" y="30" width="22" height="54" rx="4" fill={glass} opacity="0.88" />
        {/* capsule */}
        <rect x="51" y="13" width="18" height="20" rx="3" fill={capsule} />
        <rect x="53" y="15" width="4" height="15" rx="2" fill="white" opacity="0.14" />
        {/* shoulder highlight */}
        <path d="M36 82 Q30 93 28 113 L30 113 Q32 95 38 84 Z" fill="white" opacity="0.07" />
      </svg>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

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
  { q: 'What label file format do I need?', a: 'A PNG with a transparent background works best. If you only have a PDF, AI, or JPG, use our free label prep service — we\'ll convert it within 2 business days at no charge.' },
  { q: 'Can I preview before paying?', a: 'Yes. Configure your bottle, upload your label, and position it with the live builder. You only pay once you\'re satisfied with the setup.' },
  { q: 'Is there a subscription?', a: 'No. It\'s a flat $29 per image. Your first 10 orders are $29 each, then the loyalty price of $23 applies automatically — no codes, no sign-ups.' },
  { q: 'What bottle shapes are available?', a: 'Bordeaux, Burgundy, Hock/Alsace, Champagne, and specialty styles in 375mL, 750mL, and 1.5L magnums. See the full catalog at the Library page.' },
  { q: 'What closure types are supported?', a: 'Screwcaps, natural and synthetic corks, DIAM corks, tin capsules (satin, gloss, and matte in 50+ colors), crown caps, wax seals, and Champagne cage & muselet.' },
  { q: 'Can I order multiple images at once?', a: 'Each image is ordered individually. If you need a batch, configure and submit each one — your loyalty discount applies across all orders automatically.' },
  { q: 'Is the label prep service really free?', a: 'Yes. Send us your label file in any format (PDF, AI, EPS, JPG) and we\'ll return a clean PNG with a transparent background within 2 business days, at no charge.' },
  { q: 'How accurate is the render?', a: 'Very accurate. We use true 3D rendering — not mockup templates or AI generation. Light, materials, glass refraction, and liquid color are all physically simulated.' },
  { q: 'What\'s the difference between this and a mockup?', a: 'Mockups place a 2D label image onto a flat photo. Our renders are built in 3D from scratch — the light wraps around the bottle correctly, glass refracts realistically, and the result is indistinguishable from studio photography.' },
  { q: 'Do you offer refunds?', a: 'If your render doesn\'t match the configuration you submitted, we\'ll redo it at no charge. See our refund policy for full details.' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, oklch(0.50 0.18 322 / 0.18) 0%, transparent 55%)' }}
        />
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-6">No photoshoot. No samples. No waiting.</Badge>
            <h1 className="text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Instant bottle shots, ready to sell.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Built for online listings, sales materials, and distributor presentations.
              True 3D rendering — not AI, not mockups.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/configure" className={buttonVariants({ size: 'lg' })}>Create my first bottle shot</Link>
              <Link href="/library" className={buttonVariants({ variant: 'outline', size: 'lg' })}>Explore options</Link>
            </div>
          </div>

          {/* Bottle showcase */}
          <div className="hidden md:flex justify-center items-end gap-5 pb-6">
            <HeroBottle glass="#1a3a20" liquid="#6B1A1A" height={220} />
            <HeroBottle glass="#c8bfa0" liquid="#C9963A" capsule="#5B4A2E" height={280} />
            <HeroBottle glass="#1e2d50" liquid="#D4899A" capsule="#4A2060" height={245} />
          </div>
        </div>
      </section>

      {/* ── Stats — plum gradient ─────────────────────────────────────────── */}
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

      {/* ── Pain point ───────────────────────────────────────────────────── */}
      <section className="border-b border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-extrabold mb-16 text-center">Getting great bottle photography is hard.</h2>
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0">
            {/* Old way */}
            <div className="pr-12">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-7">The old way</div>
              <ul className="space-y-5">
                {[
                  'Physical sample bottle needed',
                  'Shipping to a studio — and back',
                  'Scheduling a photoshoot',
                  'Days of retouching',
                  'Weeks of waiting',
                  'Hundreds or thousands of dollars',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-red-500 font-bold text-base leading-5 flex-shrink-0">✕</span>
                    <span className="text-sm leading-5 line-through decoration-red-500/40">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="hidden md:block bg-border mx-6" />

            {/* With WineRender */}
            <div className="pl-0 md:pl-12 mt-10 md:mt-0">
              <div className="text-xs font-semibold uppercase tracking-widest mb-7" style={{ color: 'oklch(0.68 0.15 322)' }}>With WineRender</div>
              <ul className="space-y-5">
                {[
                  'Label file only — no physical bottle',
                  'Upload from anywhere, anytime',
                  'No scheduling, no studio',
                  'Delivered in under 60 minutes',
                  'Ready to use immediately',
                  '$29 flat, no hidden fees',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-bold text-base leading-5 flex-shrink-0" style={{ color: 'oklch(0.50 0.18 322)' }}>✓</span>
                    <span className="text-sm leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech differentiator ──────────────────────────────────────────── */}
      <section className="border-b border-border" style={{ background: 'oklch(0.14 0.012 310)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">Why it looks real</p>
          <h2 className="text-5xl font-extrabold mb-6 leading-[1.1]">
            Not a mockup.<br />Not AI.<br />
            <span style={{ color: 'oklch(0.68 0.18 322)' }}>Just real 3D rendering.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-16">
            Every image is built from a fully 3D model. Light wraps around the bottle correctly.
            Glass refracts realistically. The result is indistinguishable from a studio photoshoot
            — because the physics are the same.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Accurate light & shadow', desc: 'Physically simulated — not painted on. Highlights and shadows move correctly with the bottle geometry.' },
              { title: 'Glass refraction', desc: 'The liquid color interacts with the glass shade. 12 glass types × 25+ liquid shades = real visual combinations.' },
              { title: '10+ years of 3D expertise', desc: 'Built on the same infrastructure used for professional wine photography studios.' },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'oklch(0.50 0.18 322 / 0.2)' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.50 0.18 322)' }} />
                </div>
                <div className="font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-3 text-center">How it works</h2>
        <p className="text-muted-foreground text-center mb-16">Four steps from label file to finished render.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} className="border-border bg-card overflow-hidden">
              <CardContent className="p-0">
                {/* accent bar */}
                <div className="h-0.5 w-full" style={{ background: `oklch(0.50 0.18 322 / ${0.3 + i * 0.12})` }} />
                <div className="p-8">
                  <div className="text-6xl font-extrabold mb-5 leading-none" style={{ color: 'oklch(0.50 0.18 322 / 0.35)' }}>{s.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────────────────────── */}
      <section className="border-y border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-3 text-center">Built for every stage of your sales cycle</h2>
          <p className="text-muted-foreground text-center mb-12">From pre-release to point-of-sale.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3.5 hover:border-border/60 transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'oklch(0.50 0.18 322)' }} />
                <span className="text-sm">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-3">Simple, flat-rate pricing</h2>
        <p className="text-muted-foreground mb-16">No subscription. No hidden fees. Pay per render.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
          {/* Featured card */}
          <div className="flex-1 rounded-xl border relative overflow-hidden" style={{ borderColor: 'oklch(0.50 0.18 322 / 0.7)', background: 'oklch(0.50 0.18 322 / 0.06)' }}>
            <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: 'oklch(0.50 0.18 322)' }} />
            <div className="p-8">
              <div className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'oklch(0.50 0.18 322 / 0.2)', color: 'oklch(0.75 0.15 322)' }}>
                Most popular
              </div>
              <div className="text-5xl font-extrabold mb-1">$29</div>
              <div className="text-sm text-muted-foreground mb-6">per image · first 10 orders</div>
              <Separator className="mb-6" />
              <ul className="text-sm text-muted-foreground space-y-3 text-left">
                {['2,160px PNG with transparent background', 'Royalty-free usage rights', 'Delivered in under 60 minutes', '12M+ configuration combinations', 'Live label builder included', 'Free label prep available'].map(item => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <span style={{ color: 'oklch(0.50 0.18 322)' }} className="font-bold mt-px flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/configure" className={buttonVariants({ size: 'lg' }) + ' w-full'}>Get started</Link>
              </div>
            </div>
          </div>

          {/* Volume card */}
          <Card className="flex-1 border-border bg-card">
            <CardContent className="p-8">
              <div className="h-7 mb-4" />
              <div className="text-5xl font-extrabold mb-1">$23</div>
              <div className="text-sm text-muted-foreground mb-6">per image · after 10 orders</div>
              <Separator className="mb-6" />
              <ul className="text-sm text-muted-foreground space-y-3 text-left">
                {['Everything in the standard plan', 'Loyalty discount applied automatically', 'No codes, no sign-ups required', 'No commitment or minimum orders'].map(item => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <span style={{ color: 'oklch(0.50 0.18 322)' }} className="font-bold mt-px flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-xs text-muted-foreground">Discount applies automatically after your 10th order. No action needed.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Label prep CTA ───────────────────────────────────────────────── */}
      <section className="border-y border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 md:flex items-center gap-16">
          <div className="flex-1 mb-8 md:mb-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Free service</div>
            <h2 className="text-2xl font-bold mb-3">Need help with your label file?</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Send us whatever you have — PDF, AI, EPS, JPG. We&apos;ll convert it into a clean PNG
              with a transparent background, ready to upload. Free, within 2 business days.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/label-prep" className={buttonVariants({ size: 'lg' })}>Request free label prep</Link>
            <Link href="/configure" className={buttonVariants({ variant: 'outline', size: 'lg' })}>I already have a PNG</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ — accordion ──────────────────────────────────────────────── */}
      <section id="faq">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 font-semibold cursor-pointer list-none select-none hover:text-foreground/90 transition-colors">
                  <span>{faq.q}</span>
                  <span
                    className="text-muted-foreground text-xl leading-none transition-transform duration-200 group-open:rotate-45 flex-shrink-0"
                    style={{ fontWeight: 300 }}
                  >+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA — plum gradient ───────────────────────────────────── */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">Ready to create your first bottle shot?</h2>
          <p className="mb-10 text-lg" style={{ color: 'oklch(0.96 0 0 / 0.60)' }}>
            Skip the samples, shipping, and photoshoots. Get your image in under 60 minutes.
          </p>
          <Link
            href="/configure"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white font-bold text-base hover:bg-white/92 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Create my first bottle shot — $29
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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
