import { supabase } from '@/lib/supabase'
import { Nav } from '@/components/nav'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ColorsExplorer } from './ColorsExplorer'
import type { GlassColor, LiquidShade } from '@/types/database'

export default async function ColorsPage() {
  const [colorsRes, shadesRes] = await Promise.all([
    supabase.from('glass_colors').select('*'),
    supabase.from('liquid_shades').select('*'),
  ])

  const glassColors = (colorsRes.data ?? []) as GlassColor[]
  const liquidShades = (shadesRes.data ?? []) as LiquidShade[]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <div className="border-b border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Visual reference</p>
          <h1 className="text-4xl font-extrabold mb-4">Glass & liquid color combinations</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            See exactly how your wine appears through each glass shade. Select a glass color below to preview all {liquidShades.length} liquid shades rendered through it.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <ColorsExplorer glassColors={glassColors} liquidShades={liquidShades} />
      </div>

      {/* CTA */}
      <section className="bg-plum">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Found your combination?</h2>
          <p className="text-white/65 mb-8 text-sm">Configure your full bottle and get your render in under 60 minutes.</p>
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
