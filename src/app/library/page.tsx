import { supabase } from '@/lib/supabase'
import { Nav } from '@/components/nav'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import type { BottleShape, GlassColor, LiquidShade, ClosureFinish } from '@/types/database'

function Swatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 rounded-full border border-border"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-muted-foreground text-center leading-tight">{name}</span>
    </div>
  )
}

function BottleSvg({ glassColor }: { glassColor: string }) {
  return (
    <svg width="36" height="80" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 80 Q30 90 28 110 L25 250 Q25 260 60 260 Q95 260 95 250 L92 110 Q90 90 85 80 Z" fill={glassColor} opacity="0.85" />
      <rect x="48" y="30" width="24" height="52" rx="4" fill={glassColor} opacity="0.85" />
      <rect x="50" y="15" width="20" height="18" rx="3" fill="#8B7355" />
    </svg>
  )
}

export default async function LibraryPage() {
  const [shapesRes, colorsRes, shadesRes, closuresRes] = await Promise.all([
    supabase.from('bottle_shapes').select('*').order('category'),
    supabase.from('glass_colors').select('*'),
    supabase.from('liquid_shades').select('*'),
    supabase.from('closure_finishes').select('*').order('category'),
  ])

  const shapes = (shapesRes.data ?? []) as BottleShape[]
  const glassColors = (colorsRes.data ?? []) as GlassColor[]
  const liquidShades = (shadesRes.data ?? []) as LiquidShade[]
  const closures = (closuresRes.data ?? []) as ClosureFinish[]

  const shapesByCategory = shapes.reduce<Record<string, BottleShape[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s]
    return acc
  }, {})

  const closuresByCategory = closures.reduce<Record<string, ClosureFinish[]>>((acc, c) => {
    acc[c.category] = [...(acc[c.category] ?? []), c]
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <div className="border-b border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Building blocks</p>
          <h1 className="text-4xl font-extrabold mb-4">The library</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Every bottle shape, glass color, liquid shade, and closure finish available in WineRender.
            Mix and match to build over 12 million unique configurations.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Bottle shapes */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Bottle shapes</h2>
          <p className="text-muted-foreground text-sm mb-10">Available in 375mL, 750mL, and 1.5L magnum formats.</p>
          {Object.entries(shapesByCategory).map(([category, categoryShapes]) => (
            <div key={category} className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryShapes.map((shape) => (
                  <div key={shape.id} className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-3">
                    <BottleSvg glassColor="#4A6741" />
                    <span className="text-xs text-center text-muted-foreground leading-tight">{shape.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="border-t border-border" />

        {/* Glass colors */}
        <section>
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-2xl font-bold">Glass colors</h2>
            <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See glass × liquid combinations →
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mb-10">{glassColors.length} options — from clear flint to cobalt blue.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {glassColors.map((color) => (
              <Swatch key={color.id} color={color.hex_preview ?? '#888'} name={color.name} />
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Liquid shades */}
        <section>
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-2xl font-bold">Liquid shades</h2>
            <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See glass × liquid combinations →
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mb-10">{liquidShades.length} shades — reds, whites, rosé, orange, and specialty.</p>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-6">
            {liquidShades.map((shade) => (
              <Swatch key={shade.id} color={shade.hex_preview ?? '#888'} name={shade.name} />
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Closure finishes */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Closure finishes</h2>
          <p className="text-muted-foreground text-sm mb-10">{closures.length} options across cork, capsule, wax, and specialty closures.</p>
          {Object.entries(closuresByCategory).map(([category, categoryClos]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categoryClos.map((c) => (
                  <span key={c.id} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

      </div>

      {/* CTA */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to build your bottle?</h2>
          <Link
            href="/configure"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white font-semibold text-sm hover:bg-white/90 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Start configuring — $29
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-6xl mx-auto text-sm text-muted-foreground">
          © 2026 WineRender
        </div>
      </footer>
    </div>
  )
}
