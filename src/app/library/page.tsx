import { supabase } from '@/lib/supabase'
import { Nav } from '@/components/nav'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import type { BottleShape, GlassColor, LiquidShade, ClosureFinish } from '@/types/database'

function Swatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="w-14 h-14 rounded-full border border-border"
        style={{ backgroundColor: color, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      />
      <span className="text-xs text-muted-foreground text-center leading-tight max-w-[64px]">{name}</span>
    </div>
  )
}

function BottleSvg({ glassColor }: { glassColor: string }) {
  return (
    <svg width="52" height="118" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 82 Q30 93 28 113 L25 252 Q25 264 60 264 Q95 264 95 252 L92 113 Q90 93 84 82 Z" fill={glassColor} opacity="0.87" />
      <path d="M36 82 Q30 93 28 113 L28 202 Q31 213 60 213 Q89 213 92 202 L92 113 Q90 93 84 82 Z" fill="#8B1A2E" opacity="0.45" />
      <rect x="34" y="136" width="52" height="56" rx="2" fill="white" opacity="0.88" />
      <rect x="49" y="30" width="22" height="54" rx="4" fill={glassColor} opacity="0.87" />
      <rect x="51" y="13" width="18" height="20" rx="3" fill="oklch(0.50 0.18 322)" />
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
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryShapes.map((shape) => (
                  <div key={shape.id} className="bg-card border border-border rounded-xl p-5 flex flex-col items-center gap-4 hover:border-primary/40 transition-colors">
                    <BottleSvg glassColor="#3a5e38" />
                    <span className="text-xs text-center text-muted-foreground leading-tight font-medium">{shape.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="border-t border-border" />

        {/* Glass colors */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-2">
            <h2 className="text-2xl font-bold">Glass colors</h2>
            <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See glass × liquid combinations →
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mb-10">{glassColors.length} options — from clear flint to cobalt blue.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6">
            {glassColors.map((color) => (
              <Swatch key={color.id} color={color.hex_preview ?? '#888'} name={color.name} />
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Liquid shades */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-2">
            <h2 className="text-2xl font-bold">Liquid shades</h2>
            <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See glass × liquid combinations →
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mb-10">{liquidShades.length} shades — reds, whites, rosé, orange, and specialty.</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4 md:gap-6">
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
