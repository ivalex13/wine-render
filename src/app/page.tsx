import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'

// ─── Realistic glass bottle ───────────────────────────────────────────────────

function HeroBottle({
  glass, liquid, capsule = '#3a1a4a', height = 260, uid,
}: {
  glass: string; liquid: string; capsule?: string; height?: number; uid: string
}) {
  const w = Math.round(height * 0.40)
  const body = `b-${uid}`, liq = `q-${uid}`, cap = `c-${uid}`,
        lbl = `l-${uid}`, sheen = `s-${uid}`, shadow = `sh-${uid}`,
        clip = `cl-${uid}`
  return (
    <svg width={w} height={height} viewBox="0 0 120 300" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 26px 40px rgba(0,0,0,0.55))', overflow: 'visible' }}>
      <defs>
        {/* cylindrical glass shading + vertical specular bands */}
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000"  stopOpacity="0.55" />
          <stop offset="9%"   stopColor={glass} stopOpacity="0.7" />
          <stop offset="22%"  stopColor={glass} stopOpacity="0.98" />
          <stop offset="34%"  stopColor="#fff"  stopOpacity="0.5" />
          <stop offset="44%"  stopColor={glass} stopOpacity="0.98" />
          <stop offset="64%"  stopColor={glass} stopOpacity="0.85" />
          <stop offset="80%"  stopColor="#fff"  stopOpacity="0.16" />
          <stop offset="90%"  stopColor={glass} stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000"  stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={liq} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000"   stopOpacity="0.45" />
          <stop offset="20%"  stopColor={liquid} stopOpacity="0.95" />
          <stop offset="36%"  stopColor="#fff"   stopOpacity="0.28" />
          <stop offset="50%"  stopColor={liquid} stopOpacity="0.95" />
          <stop offset="78%"  stopColor={liquid} stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000"   stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={cap} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000"    stopOpacity="0.4" />
          <stop offset="30%"  stopColor={capsule} stopOpacity="1" />
          <stop offset="44%"  stopColor="#fff"    stopOpacity="0.45" />
          <stop offset="58%"  stopColor={capsule} stopOpacity="1" />
          <stop offset="100%" stopColor="#000"    stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={lbl} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#ece7df" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
          <stop offset="18%"  stopColor="#fff" stopOpacity="0.5" />
          <stop offset="82%"  stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={shadow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <path d="M50 40 L50 86 Q40 92 35 118 L33 280 Q33 291 60 291 Q87 291 87 280 L85 118 Q80 92 70 86 L70 40 Z" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="60" cy="293" rx="40" ry="7" fill={`url(#${shadow})`} />

      {/* glass + contents, clipped to silhouette */}
      <g clipPath={`url(#${clip})`}>
        <rect x="30" y="36" width="60" height="258" fill={`url(#${body})`} />
        {/* liquid */}
        <path d="M35 116 Q42 108 60 108 Q78 108 85 116 L87 280 Q87 291 60 291 Q33 291 33 280 Z"
          fill={`url(#${liq})`} />
        {/* label */}
        <rect x="36" y="150" width="48" height="64" rx="2" fill={`url(#${lbl})`} />
        <rect x="36" y="150" width="48" height="64" rx="2" fill="none" stroke="#caa84a" strokeOpacity="0.45" strokeWidth="0.6" />
        <rect x="44" y="162" width="32" height="2" rx="1" fill="#caa84a" opacity="0.75" />
        <rect x="48" y="170" width="24" height="1.6" rx="0.8" fill="#8a8378" opacity="0.55" />
        <circle cx="60" cy="186" r="6" fill="none" stroke="#caa84a" strokeOpacity="0.5" strokeWidth="0.8" />
        <rect x="50" y="200" width="20" height="1.4" rx="0.7" fill="#8a8378" opacity="0.5" />
        <rect x="53" y="205" width="14" height="1.4" rx="0.7" fill="#8a8378" opacity="0.5" />
        {/* soft cylindrical sheen sweeping the whole bottle */}
        <rect x="38" y="36" width="9"  height="258" fill={`url(#${sheen})`} opacity="0.85" />
        <rect x="73" y="36" width="3.5" height="258" fill={`url(#${sheen})`} opacity="0.4" />
      </g>

      {/* glass outline for crispness */}
      <path d="M50 40 L50 86 Q40 92 35 118 L33 280 Q33 291 60 291 Q87 291 87 280 L85 118 Q80 92 70 86 L70 40 Z"
        fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1" />

      {/* capsule */}
      <path d="M49 21 L49 50 L71 50 L71 21 Q71 16 60 16 Q49 16 49 21 Z" fill={`url(#${cap})`} />
      <rect x="49" y="47" width="22" height="2" fill="#000" opacity="0.25" />
    </svg>
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
  { glass: '#E8E4D8', liquid: '#E6CE58', capsule: '#C0C0C0', wine: 'Chardonnay',          bottle: 'Burgundy 750ml' },
  { glass: '#1A3A6B', liquid: '#F0C4C0', capsule: '#C5A028', wine: 'Provence Rosé',       bottle: 'Provence 750ml' },
  { glass: '#4A6741', liquid: '#8B1A2E', capsule: '#8B1A1A', wine: 'Pinot Noir',          bottle: 'Burgundy 375ml' },
  { glass: '#E8E4D8', liquid: '#CC7A38', capsule: '#B87333', wine: 'Orange Wine',         bottle: 'Alsace 750ml'   },
  { glass: '#15151A', liquid: '#E2DCB8', capsule: '#C5A028', wine: 'Blanc de Blancs',    bottle: 'Sparkling 750ml' },
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

// Small gold rule used under eyebrows
const GoldRule = () => (
  <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: 'var(--gold)' }} />
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain">
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, oklch(1 0 0 / 0.045) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, #000 40%, transparent 100%)',
        }} />
        {/* glows */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 18% 70%, oklch(0.50 0.18 322 / 0.22) 0%, transparent 50%), radial-gradient(ellipse at 82% 55%, oklch(0.55 0.15 60 / 0.10) 0%, transparent 45%)',
        }} />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              No photoshoot. No samples. No waiting.
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.04] mb-6">
              Instant bottle shots,{' '}
              <span className="italic font-normal" style={{ color: 'oklch(0.72 0.16 322)' }}>ready to sell.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-9 leading-relaxed max-w-md">
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
            <div className="mt-8 space-y-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="text-gold">★★★★★</span>
                Trusted by 200+ wine producers across 14 countries
              </p>
              <p className="text-xs text-muted-foreground/60">2,160px PNG · transparent background · delivered in &lt;60 min</p>
            </div>
          </div>

          {/* Bottles */}
          <div className="hidden md:flex justify-center items-end gap-4 pb-4 relative">
            <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 50% 100%, oklch(0.50 0.18 322 / 0.32) 0%, transparent 62%)',
            }} />
            <div className="animate-float-slower relative z-10">
              <HeroBottle glass="#16331d" liquid="#5e1414" capsule="#1a1a1a" height={224} uid="h0" />
            </div>
            <div className="animate-float relative z-20">
              <HeroBottle glass="#d8d0b4" liquid="#c98f2f" capsule="#5B4A2E" height={312} uid="h1" />
            </div>
            <div className="animate-float-slow relative z-10">
              <HeroBottle glass="#1c2a4e" liquid="#d4899a" capsule="#3a1a4a" height={256} uid="h2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-1 text-white">{s.number}</div>
              <div className="text-xs sm:text-sm text-white/65">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pain point ───────────────────────────────────────────────────── */}
      <section className="border-b border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="font-display text-4xl font-semibold mb-16 text-center leading-tight max-w-3xl mx-auto">
            Great bottle photography is slow, expensive, and fragile.
          </h2>
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0">
            <div className="md:pr-12">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-7"><GoldRule />The old way</div>
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
              <div className="text-xs font-semibold uppercase tracking-widest mb-7" style={{ color: 'oklch(0.72 0.14 322)' }}>
                <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: 'oklch(0.50 0.18 322)' }} />With WineRender
              </div>
              <ul className="space-y-5">
                {['Label file only — no physical bottle', 'Upload from anywhere, anytime', 'No scheduling, no studio', 'Delivered in under 60 minutes', 'Ready to use immediately', '$29 flat, no hidden fees'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-bold text-base leading-5 flex-shrink-0" style={{ color: 'oklch(0.62 0.16 322)' }}>✓</span>
                    <span className="text-sm leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech differentiator ──────────────────────────────────────────── */}
      <section className="border-b border-border relative overflow-hidden grain" style={{ background: 'oklch(0.14 0.012 310)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8"><GoldRule />Why it looks real</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-[1.08]">
            Not a mockup. Not AI.<br />
            <span className="italic font-normal" style={{ color: 'oklch(0.72 0.16 322)' }}>Just real 3D rendering.</span>
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
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center" style={{ background: 'oklch(0.50 0.18 322 / 0.18)', color: 'oklch(0.72 0.16 322)' }}>
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
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4"><GoldRule />The process</p>
        <h2 className="font-display text-4xl font-semibold mb-3 text-center">How it works</h2>
        <p className="text-muted-foreground text-center mb-16">Four steps from label file to finished render.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} className="border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
              <CardContent className="p-0">
                <div className="h-0.5 w-full" style={{ background: `oklch(0.50 0.18 322 / ${0.3 + i * 0.12})` }} />
                <div className="p-5 sm:p-8">
                  <div className="font-display text-5xl sm:text-6xl font-semibold mb-5 leading-none" style={{ color: 'oklch(0.50 0.18 322 / 0.4)' }}>{s.step}</div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="border-y border-border relative overflow-hidden" style={{ background: 'oklch(0.13 0.010 300)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, oklch(0.50 0.18 322 / 0.12) 0%, transparent 55%)',
        }} />
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">
            <GoldRule />Sample outputs
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-center mb-3">See what&apos;s possible</h2>
          <p className="text-muted-foreground text-center mb-4 text-sm font-medium">
            150+ bottle shapes × 12 glass colors × 25+ liquid shades × 150+ closures
          </p>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto text-sm leading-relaxed">
            Each render below is a unique glass × liquid combination. Yours will look just as good —
            2,160px PNG, transparent background, delivered in under 60 minutes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {GALLERY.map((config, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div
                  className="bg-gradient-to-b from-card to-card/40 border border-border rounded-2xl p-5 w-full flex justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:-translate-y-1.5"
                  style={{ boxShadow: '0 10px 36px rgba(0,0,0,0.45)' }}
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
          <h2 className="font-display text-4xl font-semibold mb-3 text-center">Built for every stage of your sales cycle</h2>
          <p className="text-muted-foreground text-center mb-12">From pre-release to point-of-sale.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3.5 hover:border-primary/30 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span className="text-sm">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-12">
          <GoldRule />What customers say
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative"
              style={{ boxShadow: 'inset 0 1px 0 oklch(1 0 0 / 0.06)' }}
            >
              <div className="font-display text-6xl leading-none mb-4 select-none" style={{ color: 'oklch(0.50 0.18 322 / 0.5)' }}>&ldquo;</div>
              <p className="font-display text-lg italic leading-relaxed mb-6 text-foreground/90">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: 'oklch(0.50 0.18 322 / 0.2)', color: 'oklch(0.75 0.15 322)' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="border-t border-border" style={{ background: 'oklch(0.155 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"><GoldRule />Pricing</p>
          <h2 className="font-display text-4xl font-semibold mb-3">Simple, flat-rate pricing</h2>
          <p className="text-muted-foreground mb-16">No subscription. No hidden fees. Pay per render.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">

            {/* Featured */}
            <div className="flex-1 rounded-2xl border relative overflow-hidden" style={{ borderColor: 'oklch(0.50 0.18 322 / 0.7)', background: 'oklch(0.50 0.18 322 / 0.06)' }}>
              <div className="absolute top-0 inset-x-0 h-1" style={{ background: 'oklch(0.50 0.18 322)' }} />
              <div className="p-8">
                <div className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'oklch(0.50 0.18 322 / 0.2)', color: 'oklch(0.75 0.15 322)' }}>
                  Most popular
                </div>
                <div className="font-display text-6xl font-semibold mb-1">$29</div>
                <div className="text-sm text-muted-foreground mb-6">per image · first 10 orders</div>
                <Separator className="mb-6" />
                <ul className="text-sm text-muted-foreground space-y-3 text-left">
                  {['2,160px PNG with transparent background', 'Royalty-free usage rights', 'Delivered in under 60 minutes', '12M+ configuration combinations', 'Live label builder included', 'Free label prep available'].map(item => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <span style={{ color: 'oklch(0.62 0.16 322)' }} className="font-bold mt-px flex-shrink-0">✓</span>
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
                <div className="font-display text-6xl font-semibold mb-1">$23</div>
                <div className="text-sm text-muted-foreground mb-6">per image · after 10 orders</div>
                <Separator className="mb-6" />
                <ul className="text-sm text-muted-foreground space-y-3 text-left">
                  {['Everything in the standard plan', 'Loyalty discount applied automatically', 'No codes, no sign-ups required', 'No commitment or minimum orders'].map(item => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <span style={{ color: 'oklch(0.62 0.16 322)' }} className="font-bold mt-px flex-shrink-0">✓</span>
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
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-gold">Free service</div>
            <h2 className="font-display text-3xl font-semibold mb-3">Need help with your label file?</h2>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4"><GoldRule />Questions</p>
          <h2 className="font-display text-4xl font-semibold mb-12 text-center">Frequently asked questions</h2>
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
      <section className="bg-plum relative overflow-hidden grain">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-white leading-tight">Ready to create your first bottle shot?</h2>
          <p className="mb-10 text-base sm:text-lg" style={{ color: 'oklch(0.96 0 0 / 0.62)' }}>
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
          <span className="font-display font-semibold text-foreground">WineRender</span>
          <div className="flex items-center gap-6">
            <Link href="/library" className="hover:text-foreground transition-colors">Library</Link>
            <Link href="/colors" className="hover:text-foreground transition-colors">Colors</Link>
            <Link href="/label-prep" className="hover:text-foreground transition-colors">Label prep</Link>
          </div>
          <span className="hidden sm:block">© 2026 WineRender · 3D wine bottle renders</span>
        </div>
      </footer>
    </div>
  )
}
