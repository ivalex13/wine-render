import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'

// ─── Gradient hero bottle ─────────────────────────────────────────────────────

function HeroBottle({
  glass, liquid, capsule = 'oklch(0.50 0.18 322)', height = 260, uid,
}: {
  glass: string; liquid: string; capsule?: string; height?: number; uid: string
}) {
  const w = Math.round(height * 0.43)
  const bId = `b-${uid}`, lId = `l-${uid}`, nId = `n-${uid}`
  return (
    <div style={{ filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.6))' }}>
      <svg width={w} height={height} viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={bId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0.22" />
            <stop offset="16%"  stopColor={glass} stopOpacity="0.74" />
            <stop offset="56%"  stopColor={glass} stopOpacity="0.93" />
            <stop offset="83%"  stopColor={glass} stopOpacity="0.76" />
            <stop offset="100%" stopColor="white" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id={lId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="black"  stopOpacity="0.28" />
            <stop offset="36%"  stopColor={liquid} stopOpacity="0.88" />
            <stop offset="72%"  stopColor={liquid} stopOpacity="0.70" />
            <stop offset="100%" stopColor="black"  stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id={nId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
            <stop offset="50%"  stopColor={glass} stopOpacity="0.92" />
            <stop offset="100%" stopColor="white" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* body */}
        <path d="M36 82 Q30 93 28 113 L25 252 Q25 264 60 264 Q95 264 95 252 L92 113 Q90 93 84 82 Z"
          fill={`url(#${bId})`} />
        {/* liquid */}
        <path d="M36 82 Q30 93 28 113 L28 202 Q31 213 60 213 Q89 213 92 202 L92 113 Q90 93 84 82 Z"
          fill={`url(#${lId})`} />
        {/* label */}
        <rect x="33" y="136" width="54" height="62" rx="3" fill="white" opacity="0.93" />
        <rect x="40" y="148" width="40" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="157" width="28" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="166" width="34" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        <rect x="40" y="175" width="22" height="2.5" rx="1.25" fill="#bbb" opacity="0.5" />
        {/* left edge highlight streak */}
        <path d="M36 82 Q30 93 28 113 L27 205" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.14" strokeLinecap="round" />
        {/* neck */}
        <rect x="49" y="30" width="22" height="54" rx="4" fill={`url(#${nId})`} />
        <rect x="49" y="30" width="22" height="54" rx="4" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.10" />
        {/* capsule */}
        <rect x="51" y="13" width="18" height="20" rx="3" fill={capsule} />
        <rect x="53" y="15" width="4" height="15" rx="2" fill="white" opacity="0.18" />
        {/* shoulder sheen */}
        <path d="M36 82 Q30 93 28 113 L30 113 Q32 95 38 84 Z" fill="white" opacity="0.07" />
      </svg>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { number: '12M+',  label: 'Unique configurations' },
  { number: '150+',  label: 'Bottle shapes' },
  { number: '<60min', label: 'Delivery time' },
  { number: '$29',   label: 'Per image' },
]

const STEPS = [
  { step: '01', title: 'Configure your bottle',  desc: 'Choose from 150+ bottle shapes, 12 glass colors, 25+ liquid shades, and 150+ closure finishes.' },
  { step: '02', title: 'Upload your label',       desc: 'Upload a PNG with a transparent background. Use our free label prep service if you need help.' },
  { step: '03', title: 'Preview and pay',         desc: "Position your label with the live builder. Only pay once you're happy with the setup." },
  { step: '04', title: 'Receive your render',     desc: 'A 2,160px PNG with transparent background lands in your inbox — typically within 60 minutes.' },
]

const USE_CASES = [
  'E-commerce product listings', 'Pre-order campaigns', 'TTB label approvals',
  'Distributor presentations', 'Investor pitch decks', 'Website refreshes',
  'Social media content', 'Press kits and media releases', 'Retailer shelf materials',
]

const GALLERY = [
  { glass: '#1E3B2A', liquid: '#5C0F1C', capsule: '#1A1A1A', wine: 'Cabernet Sauvignon', bottle: 'Bordeaux 750ml' },
  { glass: '#F5F5F0', liquid: '#F0E070', capsule: '#C0C0C0', wine: 'Chardonnay',          bottle: 'Burgundy 750ml' },
  { glass: '#1A3A6B', liquid: '#F0C4C0', capsule: '#C5A028', wine: 'Provence Rosé',       bottle: 'Provence 750ml' },
  { glass: '#4A6741', liquid: '#8B1A2E', capsule: '#8B1A1A', wine: 'Pinot Noir',          bottle: 'Burgundy 375ml' },
  { glass: '#F5F5F0', liquid: '#D08848', capsule: '#B87333', wine: 'Orange Wine',         bottle: 'Alsace 750ml'   },
  { glass: '#1A1A1A', liquid: '#EBE6C4', capsule: '#C5A028', wine: 'Blanc de Blancs',    bottle: 'Sparkling 750ml' },
]

const TESTIMONIALS = [
  {
    quote: "We went from 3 weeks and $800 for a photoshoot to 12 bottle images in a single afternoon. Impossible to tell them apart from our studio shots.",
    name: "Sarah M.",
    title: "Marketing Director, Creston Valley Estate",
  },
  {
    quote: "Used WineRender for our TTB submissions and distributor decks. Having photorealistic renders for every SKU before labels were even printed saved us weeks.",
    name: "Thomas K.",
    title: "Winemaker, Highfield Ridge Cellars",
  },
]

const FAQS = [
  { q: 'How long does a render take?', a: 'Renders are typically delivered within 60 minutes of payment confirmation.' },
  { q: 'What file format do I receive?', a: 'A high-resolution PNG at 2,160px on the long side, with a transparent background. Royalty-free usage rights included.' },
  { q: 'What label file format do I need?', a: "A PNG with a transparent background works best. If you only have a PDF, AI, or JPG, use our free label prep service — we'll convert it within 2 business days at no charge." },
  { q: 'Can I preview before paying?', a: "Yes. Configure your bottle, upload your label, and position it with the live builder. You only pay once you're satisfied with the setup." },
  { q: 'Is there a subscription?', a: "No. It's a flat $29 per image. Your first 10 orders are $29 each, then the loyalty price of $23 applies automatically — no codes, no sign-ups." },
  { q: 'What bottle shapes are available?', a: 'Bordeaux, Burgundy, Hock/Alsace, Champagne, Provence, Port, and specialty styles in 375mL, 750mL, and 1.5L magnums. See the full catalog at the Library page.' },
  { q: 'What closure types are supported?', a: 'Screwcaps, natural and synthetic corks, DIAM corks, tin/foil capsules (50+ colors), crown caps, wax seals, and Champagne cage & muselet.' },
  { q: "What's the difference between this and a mockup?", a: 'Mockups place a 2D label image onto a flat photo. Our renders are built in 3D from scratch — light wraps around the bottle correctly, glass refracts realistically, and the result is indistinguishable from studio photography.' },
  { q: 'Do you offer refunds?', a: "If your render doesn't match the configuration you submitted, we'll redo it at no charge." },
]

// ─── SVG icons ────────────────────────────────────────────────────────────────

const LightIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const PrismIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 19h20L12 2z" />
    <path d="M12 2l4 10" strokeOpacity="0.5" />
    <path d="M12 2l-4 10" strokeOpacity="0.5" />
  </svg>
)

const DiamondIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
  </svg>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, oklch(1 0 0 / 0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        {/* left glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 15% 75%, oklch(0.50 0.18 322 / 0.20) 0%, transparent 52%)',
        }} />
        {/* right glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 80% 60%, oklch(0.50 0.18 322 / 0.12) 0%, transparent 45%)',
        }} />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <Badge variant="secondary" className="mb-6">No photoshoot. No samples. No waiting.</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Instant bottle shots,{' '}
              <span style={{ color: 'oklch(0.68 0.18 322)' }}>ready to sell.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Built for online listings, sales materials, and distributor presentations.
              True 3D rendering — not AI, not mockups.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/configure" className={buttonVariants({ size: 'lg' })}>
                Create my first bottle shot
              </Link>
              <Link href="/library" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                Browse 150+ shapes & colors
              </Link>
            </div>
            {/* social proof nudge */}
            <div className="mt-8 space-y-1">
              <p className="text-xs text-muted-foreground">Trusted by 200+ wine producers across 14 countries</p>
              <p className="text-xs text-muted-foreground/60">2,160px PNG · transparent background · delivered in &lt;60 min</p>
            </div>
          </div>

          {/* Bottles */}
          <div className="hidden md:flex justify-center items-end gap-5 pb-6 relative">
            {/* glow behind bottles */}
            <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 50% 100%, oklch(0.50 0.18 322 / 0.30) 0%, transparent 65%)',
            }} />
            <div className="animate-float-slower">
              <HeroBottle glass="#1a3a20" liquid="#6B1A1A" height={220} uid="h0" />
            </div>
            <div className="animate-float">
              <HeroBottle glass="#c8bfa0" liquid="#C9963A" capsule="#5B4A2E" height={310} uid="h1" />
            </div>
            <div className="animate-float-slow">
              <HeroBottle glass="#1e2d50" liquid="#D4899A" capsule="#4A2060" height={255} uid="h2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 text-white">{s.number}</div>
              <div className="text-xs sm:text-sm text-white/65">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pain point ───────────────────────────────────────────────────── */}
      <section className="border-b border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-extrabold mb-16 text-center">
            Great bottle photography is slow, expensive, and fragile.
          </h2>
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0">
            <div className="md:pr-12">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-7">The old way</div>
              <ul className="space-y-5">
                {['Physical sample bottle needed', 'Shipping to a studio — and back', 'Scheduling a photoshoot', 'Days of retouching', 'Weeks of waiting', 'Hundreds or thousands of dollars'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-red-500 font-bold text-base leading-5 flex-shrink-0">✕</span>
                    <span className="text-sm leading-5 line-through decoration-red-500/40">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block bg-border mx-6" />
            <div className="block md:hidden border-t border-border mt-10 mb-0" />
            <div className="pl-0 md:pl-12 mt-10 md:mt-0">
              <div className="text-xs font-semibold uppercase tracking-widest mb-7" style={{ color: 'oklch(0.68 0.15 322)' }}>
                With WineRender
              </div>
              <ul className="space-y-5">
                {['Label file only — no physical bottle', 'Upload from anywhere, anytime', 'No scheduling, no studio', 'Delivered in under 60 minutes', 'Ready to use immediately', '$29 flat, no hidden fees'].map((item) => (
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-[1.1]">
            True 3D rendering —<br />
            <span style={{ color: 'oklch(0.68 0.18 322)' }}>indistinguishable from a studio shot.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-16">
            Every image is built from a fully 3D model. Light wraps around the bottle correctly.
            Glass refracts realistically. The result is indistinguishable from a studio photoshoot
            — because the physics are the same.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <LightIcon />, title: 'Accurate light & shadow', desc: 'Physically simulated — not painted on. Highlights and shadows move correctly with the bottle geometry.' },
              { icon: <PrismIcon />, title: 'Glass refraction',        desc: 'The liquid color interacts with the glass shade. 12 glass types × 25+ liquid shades = real visual combinations.' },
              { icon: <DiamondIcon />, title: '10+ years of 3D expertise', desc: 'Built on the same infrastructure used for professional wine photography studios.' },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center" style={{ background: 'oklch(0.50 0.18 322 / 0.18)', color: 'oklch(0.68 0.18 322)' }}>
                  {item.icon}
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
                <div className="h-0.5 w-full" style={{ background: `oklch(0.50 0.18 322 / ${0.3 + i * 0.12})` }} />
                <div className="p-5 sm:p-8">
                  <div className="text-4xl font-extrabold mb-5 leading-none" style={{ color: 'oklch(0.50 0.18 322 / 0.5)' }}>{s.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="border-y border-border" style={{ background: 'oklch(0.13 0.010 300)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">
            Sample outputs
          </p>
          <h2 className="text-3xl font-bold text-center mb-3">See what's possible</h2>
          <p className="text-muted-foreground text-center mb-4 text-sm font-medium">
            150+ bottle shapes × 12 glass colors × 25+ liquid shades × 150+ closures
          </p>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto text-sm leading-relaxed">
            Each render below is a unique glass × liquid combination. Yours will look just as good —
            2,160px PNG, transparent background, delivered in under 60 minutes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {GALLERY.map((config, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className="bg-card border border-border rounded-2xl p-5 w-full flex justify-center hover:border-primary/40 transition-all hover:-translate-y-1"
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                >
                  <HeroBottle
                    glass={config.glass}
                    liquid={config.liquid}
                    capsule={config.capsule}
                    height={150}
                    uid={`g${i}`}
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-foreground">{config.wine}</div>
                  <div className="text-xs text-muted-foreground">{config.bottle}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/colors" className={buttonVariants({ variant: 'outline' })}>
              See all glass × liquid combinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────────────────────── */}
      <section className="border-b border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-3 text-center">Built for every stage of your sales cycle</h2>
          <p className="text-muted-foreground text-center mb-12">From pre-release to point-of-sale.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3.5 hover:border-border/60 transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'oklch(0.50 0.18 322)' }} />
                <span className="text-sm">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-12">
          What customers say
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative"
              style={{ boxShadow: 'inset 0 1px 0 oklch(1 0 0 / 0.06)' }}
            >
              {/* quote mark */}
              <div className="text-5xl font-serif leading-none mb-5 select-none" style={{ color: 'oklch(0.50 0.18 322 / 0.5)' }}>&ldquo;</div>
              <p className="text-sm leading-relaxed mb-6 text-foreground/90">{t.quote}</p>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="border-t border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-3">Simple, flat-rate pricing</h2>
          <p className="text-muted-foreground mb-16">No subscription. No hidden fees. Pay per render.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">

            {/* Featured */}
            <div className="flex-1 rounded-2xl border relative overflow-hidden" style={{ borderColor: 'oklch(0.50 0.18 322 / 0.7)', background: 'oklch(0.50 0.18 322 / 0.06)' }}>
              <div className="absolute top-0 inset-x-0 h-1" style={{ background: 'oklch(0.50 0.18 322)' }} />
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
                  <Link href="/configure" className={buttonVariants({ size: 'lg' }) + ' w-full'}>Configure a bottle</Link>
                </div>
              </div>
            </div>

            {/* Volume */}
            <Card className="flex-1 border-border bg-card rounded-2xl">
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
        </div>
      </section>

      {/* ── Label prep CTA ───────────────────────────────────────────────── */}
      <section className="border-y border-border" style={{ background: 'oklch(0.13 0.010 300)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:flex items-center gap-16">
          <div className="flex-1 mb-8 md:mb-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Free service</div>
            <h2 className="text-2xl font-bold mb-3">Need help with your label file?</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Send us whatever you have — PDF, AI, EPS, JPG. We&apos;ll convert it into a clean PNG
              with a transparent background, ready to upload. Free, within 2 business days.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
            <Link href="/label-prep" className={buttonVariants({ size: 'lg' })}>Request free label prep</Link>
            <Link href="/configure" className={buttonVariants({ variant: 'outline', size: 'lg' })}>Skip — I have a PNG</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 font-semibold cursor-pointer list-none select-none hover:text-foreground/90 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-muted-foreground text-xl leading-none transition-transform duration-200 group-open:rotate-45 flex-shrink-0" style={{ fontWeight: 300 }}>+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────── */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white">Ready to create your first bottle shot?</h2>
          <p className="mb-10 text-base sm:text-lg" style={{ color: 'oklch(0.96 0 0 / 0.60)' }}>
            Skip the samples, shipping, and photoshoots. Get your image in under 60 minutes.
          </p>
          <Link
            href="/configure"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white font-bold text-base hover:bg-white/92 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Create my first bottle shot
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'oklch(0.96 0 0 / 0.45)' }}>$29 per image · no subscription · delivered in under 60 minutes</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <span>© 2026 WineRender</span>
          <div className="flex items-center gap-6">
            <Link href="/library" className="hover:text-foreground transition-colors">Library</Link>
            <Link href="/colors" className="hover:text-foreground transition-colors">Colors</Link>
            <Link href="/label-prep" className="hover:text-foreground transition-colors">Label prep</Link>
          </div>
          <span className="hidden sm:block">Professional 3D wine bottle renders</span>
        </div>
      </footer>
    </div>
  )
}
