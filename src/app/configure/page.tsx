'use client'

import { useEffect, useState, useCallback, useId } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase'
import type { BottleShape, GlassColor, LiquidShade, ClosureFinish } from '@/types/database'

type Step = 1 | 2 | 3 | 4 | 5

interface Config {
  bottleShapeId: string
  glassColorId: string
  liquidShadeId: string
  closureFinishId: string
  labelFile: File | null
  labelPositionX: number
  labelPositionY: number
  labelScale: number
  email: string
}

// ── Bottle geometry ────────────────────────────────────────────────────────────

type Rect = { x: number; y: number; w: number; h: number }
type BottleGeometry = { body: string; liquid: string; neck: Rect; capsule: Rect; label: Rect }

const GEO: Record<string, BottleGeometry> = {
  bordeaux: {
    body:   'M38 86 Q31 97 29 116 L27 253 Q27 265 60 265 Q93 265 93 253 L91 116 Q89 97 82 86 Z',
    liquid: 'M38 86 Q31 97 29 116 L28 205 Q31 217 60 217 Q89 217 92 205 L91 116 Q89 97 82 86 Z',
    neck:    { x: 49, y: 28, w: 22, h: 59 },
    capsule: { x: 51, y: 12, w: 18, h: 18 },
    label:   { x: 32, y: 130, w: 56, h: 68 },
  },
  burgundy: {
    body:   'M36 92 Q27 107 25 124 L23 253 Q23 266 60 266 Q97 266 97 253 L95 124 Q93 107 84 92 Z',
    liquid: 'M36 92 Q27 107 25 124 L24 207 Q28 219 60 219 Q92 219 96 207 L95 124 Q93 107 84 92 Z',
    neck:    { x: 49, y: 30, w: 22, h: 63 },
    capsule: { x: 51, y: 13, w: 18, h: 19 },
    label:   { x: 28, y: 134, w: 64, h: 70 },
  },
  sparkling: {
    body:   'M44 96 Q39 106 37 124 L35 253 Q35 263 60 263 Q85 263 85 253 L83 124 Q81 106 76 96 Z',
    liquid: 'M44 96 Q39 106 37 124 L36 206 Q38 218 60 218 Q82 218 84 206 L83 124 Q81 106 76 96 Z',
    neck:    { x: 51, y: 24, w: 18, h: 73 },
    capsule: { x: 52, y:  8, w: 16, h: 18 },
    label:   { x: 37, y: 132, w: 46, h: 64 },
  },
  hock: {
    body:   'M47 104 Q43 114 41 132 L39 253 Q39 263 60 263 Q81 263 81 253 L79 132 Q77 114 73 104 Z',
    liquid: 'M47 104 Q43 114 41 132 L40 207 Q42 217 60 217 Q78 217 80 207 L79 132 Q77 114 73 104 Z',
    neck:    { x: 52, y: 16, w: 16, h: 89 },
    capsule: { x: 53, y:  4, w: 14, h: 14 },
    label:   { x: 41, y: 134, w: 38, h: 62 },
  },
  provence: {
    body:   'M40 96 Q32 110 30 128 L28 186 Q26 222 28 248 Q34 266 60 266 Q86 266 92 248 Q94 222 92 186 L90 128 Q88 110 80 96 Z',
    liquid: 'M40 96 Q32 110 30 128 L29 184 Q27 218 29 242 Q35 258 60 258 Q85 258 91 242 Q93 218 91 184 L90 128 Q88 110 80 96 Z',
    neck:    { x: 49, y: 28, w: 22, h: 69 },
    capsule: { x: 51, y: 12, w: 18, h: 18 },
    label:   { x: 30, y: 122, w: 60, h: 70 },
  },
  port: {
    body:   'M36 78 Q28 88 26 106 L24 248 Q24 260 60 260 Q96 260 96 248 L94 106 Q92 88 84 78 Z',
    liquid: 'M36 78 Q28 88 26 106 L25 198 Q28 210 60 210 Q92 210 95 198 L94 106 Q92 88 84 78 Z',
    neck:    { x: 47, y: 20, w: 26, h: 59 },
    capsule: { x: 49, y:  6, w: 22, h: 16 },
    label:   { x: 28, y: 118, w: 64, h: 70 },
  },
}

function getGeometry(shapeId: string): BottleGeometry {
  if (shapeId.startsWith('sparkling')) return GEO.sparkling
  if (shapeId.startsWith('burgundy'))  return GEO.burgundy
  if (shapeId === 'alsace-750' || shapeId.startsWith('hock') || shapeId.startsWith('tokaj')) return GEO.hock
  if (shapeId === 'provence-750')      return GEO.provence
  if (shapeId.startsWith('port'))      return GEO.port
  return GEO.bordeaux
}

// ── Mini bottle (shape selector cards) ────────────────────────────────────────

function MiniBottle({ shapeId, glassHex, liquidHex }: { shapeId: string; glassHex: string; liquidHex: string }) {
  const g = getGeometry(shapeId)
  return (
    <svg width="28" height="66" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={g.body} fill={glassHex} opacity="0.88" />
      <path d={g.liquid} fill={liquidHex} opacity="0.65" />
      <rect x={g.label.x} y={g.label.y} width={g.label.w} height={g.label.h} rx="2" fill="white" opacity="0.85" />
      <rect x={g.neck.x} y={g.neck.y} width={g.neck.w} height={g.neck.h} rx="3" fill={glassHex} opacity="0.88" />
      <rect x={g.capsule.x} y={g.capsule.y} width={g.capsule.w} height={g.capsule.h} rx="2" fill="oklch(0.50 0.18 322)" />
    </svg>
  )
}

// ── Full bottle preview ────────────────────────────────────────────────────────

function BottlePreview({
  shapeId, glassHex, liquidHex, closureHex, isCork,
  labelUrl, posX, posY, scale,
  width = 130, height = 300,
}: {
  shapeId: string; glassHex: string; liquidHex: string
  closureHex: string; isCork: boolean
  labelUrl: string | null; posX: number; posY: number; scale: number
  width?: number; height?: number
}) {
  const uid = useId().replace(/:/g, '')
  const clipId = `lclip-${uid}`
  const g = getGeometry(shapeId)
  const lcx = g.label.x + g.label.w / 2
  const lcy = g.label.y + g.label.h / 2

  return (
    <svg
      width={width} height={height}
      viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={g.label.x} y={g.label.y} width={g.label.w} height={g.label.h} rx="3" />
        </clipPath>
      </defs>

      {/* Glass body */}
      <path d={g.body} fill={glassHex} opacity="0.88" />
      {/* Liquid */}
      <path d={g.liquid} fill={liquidHex} opacity="0.68" />
      {/* Body edge sheen */}
      <path d={g.body} fill="none" stroke="white" strokeWidth="1.5" opacity="0.07" />

      {/* Label */}
      {labelUrl ? (
        <g clipPath={`url(#${clipId})`}>
          <g transform={`translate(${lcx + posX * 0.4},${lcy + posY * 0.4}) scale(${scale})`}>
            <image
              href={labelUrl}
              x={-g.label.w / 2} y={-g.label.h / 2}
              width={g.label.w} height={g.label.h}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>
      ) : (
        <>
          <rect x={g.label.x} y={g.label.y} width={g.label.w} height={g.label.h} rx="3" fill="white" opacity="0.88" />
          <rect x={g.label.x + 7}  y={g.label.y + 13} width={g.label.w - 14} height="2.5" rx="1.25" fill="#ccc" opacity="0.5" />
          <rect x={g.label.x + 11} y={g.label.y + 22} width={g.label.w - 22} height="2.5" rx="1.25" fill="#ccc" opacity="0.5" />
          <rect x={g.label.x + 9}  y={g.label.y + 31} width={g.label.w - 18} height="2.5" rx="1.25" fill="#ccc" opacity="0.5" />
          <rect x={g.label.x + 14} y={g.label.y + 46} width={g.label.w - 28} height="2"   rx="1"    fill="#ccc" opacity="0.4" />
          <rect x={g.label.x + 11} y={g.label.y + 54} width={g.label.w - 22} height="2"   rx="1"    fill="#ccc" opacity="0.4" />
        </>
      )}

      {/* Neck */}
      <rect x={g.neck.x} y={g.neck.y} width={g.neck.w} height={g.neck.h} rx="4" fill={glassHex} opacity="0.88" />
      <rect
        x={g.neck.x + 3} y={g.neck.y + Math.round(g.neck.h * 0.35)}
        width={g.neck.w - 6} height={Math.round(g.neck.h * 0.65)}
        rx="2" fill={liquidHex} opacity="0.55"
      />
      <rect x={g.neck.x} y={g.neck.y} width={g.neck.w} height={g.neck.h} rx="4" fill="none" stroke="white" strokeWidth="1" opacity="0.07" />

      {/* Closure */}
      {isCork ? (
        <>
          <rect x={g.neck.x - 1} y={g.capsule.y} width={g.neck.w + 2} height={g.capsule.h + 6} rx="4" fill={closureHex} />
          <rect x={g.neck.x + 3} y={g.capsule.y + 2} width={3} height={g.capsule.h + 2} rx="1.5" fill="white" opacity="0.1" />
          <rect x={g.neck.x - 3} y={g.capsule.y} width={g.neck.w + 6} height={4} rx="2" fill="#7A6A52" />
        </>
      ) : (
        <>
          <rect x={g.capsule.x} y={g.capsule.y} width={g.capsule.w} height={g.capsule.h} rx="3" fill={closureHex} />
          <rect x={g.capsule.x + 2} y={g.capsule.y + 2} width={3} height={g.capsule.h - 4} rx="1.5" fill="white" opacity="0.18" />
          <line
            x1={g.capsule.x} y1={g.capsule.y + g.capsule.h}
            x2={g.capsule.x + g.capsule.w} y2={g.capsule.y + g.capsule.h}
            stroke="white" strokeWidth="0.5" opacity="0.2"
          />
        </>
      )}
    </svg>
  )
}

// ── Step indicator ─────────────────────────────────────────────────────────────

const STEP_NAMES = ['Shape', 'Colors', 'Closure', 'Label', 'Review']

function StepIndicator({ current, total, onGoTo }: { current: Step; total: number; onGoTo: (n: number) => void }) {
  return (
    <div className="flex items-start mb-10">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div key={n} className={`flex items-start ${n < total ? 'flex-1' : ''}`}>
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div
              onClick={() => n < current && onGoTo(n)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                n === current ? 'bg-primary text-primary-foreground'
                : n < current ? 'bg-green-600 text-white cursor-pointer hover:bg-green-500'
                : 'bg-muted text-muted-foreground'
              }`}
              style={n === current ? { boxShadow: '0 0 0 4px oklch(0.50 0.18 322 / 0.20)' } : {}}
            >
              {n < current ? '✓' : n}
            </div>
            <span
              onClick={() => n < current && onGoTo(n)}
              className={`hidden sm:block text-xs font-medium transition-colors ${
                n === current ? 'text-foreground'
                : n < current ? 'text-muted-foreground cursor-pointer hover:text-foreground'
                : 'text-muted-foreground'
              }`}
            >
              {STEP_NAMES[n - 1]}
            </span>
          </div>
          {n < total && (
            <div className={`h-px flex-1 mt-4 mx-1.5 sm:mx-2 ${n < current ? 'bg-green-600' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Color swatch selector ──────────────────────────────────────────────────────

function SwatchGrid<T extends { id: string; name: string; hex_preview: string | null }>({
  items, selected, onSelect,
}: { items: T[]; selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {items.map((item) => {
        const active = selected === item.id
        return (
          <button key={item.id} onClick={() => onSelect(item.id)} className="flex flex-col items-center gap-2 transition-all">
            <div
              className="w-11 h-11 rounded-full border-2 transition-all"
              style={{
                backgroundColor: item.hex_preview ?? '#888',
                borderColor: active ? 'oklch(0.50 0.18 322)' : 'transparent',
                boxShadow: active
                  ? '0 0 0 3px oklch(0.50 0.18 322 / 0.25)'
                  : '0 0 0 1px oklch(1 0 0 / 0.12)',
                transform: active ? 'scale(1.12)' : 'scale(1)',
                opacity: active ? 1 : 0.7,
              }}
            />
            <span className={`text-xs text-center max-w-[56px] leading-tight transition-colors ${
              active ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}>{item.name}</span>
          </button>
        )
      })}
    </div>
  )
}

// ── Generic selection grid ─────────────────────────────────────────────────────

function SelectionGrid<T extends { id: string; name: string }>({
  items, selected, onSelect, renderItem,
}: {
  items: T[]; selected: string; onSelect: (id: string) => void
  renderItem?: (item: T) => React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            selected === item.id
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/30 bg-muted/20'
          }`}
        >
          {renderItem?.(item)}
          <div className={`text-xs font-medium mt-2 leading-tight line-clamp-2 ${selected === item.id ? 'text-foreground' : 'text-muted-foreground'}`}>
            {item.name}
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Range slider with label ────────────────────────────────────────────────────

function Slider({ label, min, max, step = 1, value, format, onChange }: {
  label: string; min: number; max: number; step?: number
  value: number; format?: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>{label}</span>
        <span className="tabular-nums">{format ? format(value) : value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function ConfigurePage() {
  const [step, setStep] = useState<Step>(1)
  const [bottleShapes, setBottleShapes] = useState<BottleShape[]>([])
  const [glassColors, setGlassColors] = useState<GlassColor[]>([])
  const [liquidShades, setLiquidShades] = useState<LiquidShade[]>([])
  const [closureFinishes, setClosureFinishes] = useState<ClosureFinish[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [labelUrl, setLabelUrl] = useState<string | null>(null)

  const [config, setConfig] = useState<Config>({
    bottleShapeId: '',
    glassColorId: '',
    liquidShadeId: '',
    closureFinishId: '',
    labelFile: null,
    labelPositionX: 0,
    labelPositionY: 0,
    labelScale: 1,
    email: '',
  })

  // Load catalog data
  useEffect(() => {
    async function load() {
      const [shapesRes, colorsRes, shadesRes, closuresRes] = await Promise.all([
        supabase.from('bottle_shapes').select('*').order('category'),
        supabase.from('glass_colors').select('*'),
        supabase.from('liquid_shades').select('*'),
        supabase.from('closure_finishes').select('*').order('category'),
      ])
      const shapes   = (shapesRes.data   ?? []) as BottleShape[]
      const colors   = (colorsRes.data   ?? []) as GlassColor[]
      const shades   = (shadesRes.data   ?? []) as LiquidShade[]
      const closures = (closuresRes.data ?? []) as ClosureFinish[]
      setBottleShapes(shapes)
      setGlassColors(colors)
      setLiquidShades(shades)
      setClosureFinishes(closures)
      setConfig(c => ({
        ...c,
        bottleShapeId:   shapes[0]?.id   ?? '',
        glassColorId:    colors[0]?.id   ?? '',
        liquidShadeId:   shades[0]?.id   ?? '',
        closureFinishId: closures[0]?.id ?? '',
      }))
      setLoading(false)
    }
    load()
  }, [])

  // Object URL for label file
  useEffect(() => {
    if (!config.labelFile) { setLabelUrl(null); return }
    const url = URL.createObjectURL(config.labelFile)
    setLabelUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [config.labelFile])

  const handleLabelUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setConfig(c => ({ ...c, labelFile: file }))
  }, [])

  async function handleSubmit() {
    if (!config.email) return
    setSubmitting(true)
    try {
      const { data, error } = await supabase.from('orders').insert({
        email: config.email,
        bottle_shape_id:   config.bottleShapeId,
        glass_color_id:    config.glassColorId,
        liquid_shade_id:   config.liquidShadeId,
        closure_finish_id: config.closureFinishId,
        label_position_x:  config.labelPositionX,
        label_position_y:  config.labelPositionY,
        label_scale:       config.labelScale,
        amount_cents:      2900,
      }).select().single()
      if (error) throw error
      setOrderId(data.id)
      setSubmitError(null)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">Loading configurator…</div>
      </div>
    )
  }

  // Derived preview values
  const selectedGlass   = glassColors.find(c => c.id === config.glassColorId)
  const selectedLiquid  = liquidShades.find(s => s.id === config.liquidShadeId)
  const selectedClosure = closureFinishes.find(c => c.id === config.closureFinishId)
  const selectedShape   = bottleShapes.find(s => s.id === config.bottleShapeId)
  const glassHex   = selectedGlass?.hex_preview   ?? '#4A6741'
  const liquidHex  = selectedLiquid?.hex_preview  ?? '#8B1A2E'
  const closureHex = selectedClosure?.hex_preview ?? 'oklch(0.50 0.18 322)'
  const isCork     = selectedClosure?.category === 'Cork'

  const canProceed: Record<number, boolean> = {
    1: !!config.bottleShapeId,
    2: !!config.glassColorId && !!config.liquidShadeId,
    3: !!config.closureFinishId,
    4: true,
    5: !!config.email,
  }

  const shapesByCategory   = bottleShapes.reduce<Record<string, BottleShape[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s]; return acc
  }, {})
  const closuresByCategory = closureFinishes.reduce<Record<string, ClosureFinish[]>>((acc, c) => {
    acc[c.category] = [...(acc[c.category] ?? []), c]; return acc
  }, {})

  const previewProps = {
    shapeId: config.bottleShapeId,
    glassHex, liquidHex, closureHex, isCork,
    labelUrl,
    posX: config.labelPositionX,
    posY: config.labelPositionY,
    scale: config.labelScale,
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Configure your bottle</h1>
          <p className="text-muted-foreground text-sm">Customize every detail, then upload your label and submit.</p>
        </div>

        <Progress value={(step / 5) * 100} className="mb-10 h-1.5" />
        <StepIndicator current={step} total={5} onGoTo={(n) => setStep(n as Step)} />

        <div className="grid md:grid-cols-3 gap-8">

          {/* ── Config panel ── */}
          <div className="md:col-span-2">
            <Card className="bg-card border-border">
              <CardContent className="p-6">

                {/* Step 1 — Shape */}
                {step === 1 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Step 1 of 5</p>
                    <h2 className="text-xl font-bold mb-6">Select bottle shape</h2>
                    {Object.entries(shapesByCategory).map(([cat, shapes]) => (
                      <div key={cat} className="mb-7">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat}</div>
                        <SelectionGrid
                          items={shapes}
                          selected={config.bottleShapeId}
                          onSelect={(id) => setConfig(c => ({ ...c, bottleShapeId: id }))}
                          renderItem={(shape) => (
                            <div className="flex justify-center py-1">
                              <MiniBottle shapeId={shape.id} glassHex={glassHex} liquidHex={liquidHex} />
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2 — Glass + Liquid */}
                {step === 2 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Step 2 of 5</p>
                    <h2 className="text-xl font-bold mb-7">Glass color</h2>
                    <SwatchGrid
                      items={glassColors}
                      selected={config.glassColorId}
                      onSelect={(id) => setConfig(c => ({ ...c, glassColorId: id }))}
                    />
                    <div className="border-t border-border my-8" />
                    <h2 className="text-lg font-semibold mb-6">Wine liquid shade</h2>
                    <SwatchGrid
                      items={liquidShades}
                      selected={config.liquidShadeId}
                      onSelect={(id) => setConfig(c => ({ ...c, liquidShadeId: id }))}
                    />
                  </div>
                )}

                {/* Step 3 — Closure */}
                {step === 3 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Step 3 of 5</p>
                    <h2 className="text-xl font-bold mb-6">Closure finish</h2>
                    {Object.entries(closuresByCategory).map(([cat, closures]) => (
                      <div key={cat} className="mb-7">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat}</div>
                        <SelectionGrid
                          items={closures}
                          selected={config.closureFinishId}
                          onSelect={(id) => setConfig(c => ({ ...c, closureFinishId: id }))}
                          renderItem={(closure) => (
                            <div
                              className="w-6 h-6 rounded-full border border-border/40"
                              style={{ backgroundColor: closure.hex_preview ?? '#888' }}
                            />
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4 — Label */}
                {step === 4 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Step 4 of 5</p>
                    <h2 className="text-xl font-bold mb-6">Upload your label</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Controls */}
                      <div>
                        <div
                          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mb-5"
                          onClick={() => document.getElementById('label-upload')?.click()}
                        >
                          {config.labelFile ? (
                            <div>
                              <div className="text-green-400 text-sm font-semibold mb-1">✓ {config.labelFile.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {(config.labelFile.size / 1024 / 1024).toFixed(2)} MB · Click to change
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-4xl mb-2 text-muted-foreground/60">↑</div>
                              <div className="text-sm font-medium mb-1">Click to upload label</div>
                              <div className="text-xs text-muted-foreground">PNG with transparent background · max 20MB</div>
                            </div>
                          )}
                        </div>
                        <input
                          id="label-upload" type="file" accept="image/png"
                          className="hidden" onChange={handleLabelUpload}
                        />

                        {config.labelFile && (
                          <div className="space-y-5">
                            <Slider
                              label="Horizontal position" min={-50} max={50}
                              value={config.labelPositionX}
                              format={(v) => (v > 0 ? `+${v}` : `${v}`)}
                              onChange={(v) => setConfig(c => ({ ...c, labelPositionX: v }))}
                            />
                            <Slider
                              label="Vertical position" min={-50} max={50}
                              value={config.labelPositionY}
                              format={(v) => (v > 0 ? `+${v}` : `${v}`)}
                              onChange={(v) => setConfig(c => ({ ...c, labelPositionY: v }))}
                            />
                            <Slider
                              label="Scale" min={0.5} max={2} step={0.05}
                              value={config.labelScale}
                              format={(v) => `${v.toFixed(2)}×`}
                              onChange={(v) => setConfig(c => ({ ...c, labelScale: v }))}
                            />
                          </div>
                        )}

                        {!config.labelFile && (
                          <p className="text-xs text-muted-foreground mt-2">
                            No label yet?{' '}
                            <Link href="/label-prep" className="underline hover:text-foreground transition-colors">
                              Request free label prep
                            </Link>{' '}
                            or skip and add it later.
                          </p>
                        )}
                      </div>

                      {/* Live bottle with label */}
                      <div className="flex items-center justify-center py-4">
                        <BottlePreview {...previewProps} width={120} height={276} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5 — Review + submit */}
                {step === 5 && (
                  <div>
                    {orderId ? (
                      <div className="text-center py-10">
                        <div className="text-5xl mb-5">✓</div>
                        <h2 className="text-xl font-bold mb-2">Order submitted!</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                          Your render will be delivered within 60 minutes. Check your email for updates.
                        </p>
                        <Badge variant="secondary" className="mb-6 font-mono">
                          Order {orderId.slice(0, 8).toUpperCase()}
                        </Badge>
                        <div className="mt-2">
                          <Link href={`/order/${orderId}`}>
                            <Button variant="outline">Track your order</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Step 5 of 5</p>
                        <h2 className="text-xl font-bold mb-6">Review and pay</h2>

                        <div className="bg-muted/40 rounded-xl p-5 mb-6 space-y-3 text-sm border border-border">
                          {[
                            ['Bottle shape',  selectedShape?.name],
                            ['Glass color',   selectedGlass?.name],
                            ['Liquid shade',  selectedLiquid?.name],
                            ['Closure',       selectedClosure?.name],
                            ['Label',         config.labelFile ? config.labelFile.name : 'Not uploaded — can add after'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4">
                              <span className="text-muted-foreground">{k}</span>
                              <span className="text-right font-medium">{v ?? '—'}</span>
                            </div>
                          ))}
                          <div className="border-t border-border pt-3 mt-1 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>$29.00</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label htmlFor="email" className="text-sm">Email address</Label>
                          <Input
                            id="email" type="email" placeholder="you@example.com"
                            value={config.email}
                            onChange={(e) => setConfig(c => ({ ...c, email: e.target.value }))}
                          />
                          <p className="text-xs text-muted-foreground">
                            We&apos;ll send your render to this address within 60 minutes.
                          </p>
                        </div>

                        <Button
                          className="w-full" size="lg"
                          disabled={!canProceed[5] || submitting}
                          onClick={handleSubmit}
                        >
                          {submitting ? 'Submitting…' : 'Pay $29.00 and submit'}
                        </Button>
                        {submitError && (
                          <p className="text-sm text-red-400 text-center mt-3">{submitError}</p>
                        )}
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          Payment processing coming soon — order will be created and we&apos;ll contact you.
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>

            {/* Navigation */}
            {!orderId && (
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(s => Math.max(1, s - 1) as Step)}
                  disabled={step === 1}
                >
                  Back
                </Button>
                {step < 5 && (
                  <Button
                    onClick={() => setStep(s => Math.min(5, s + 1) as Step)}
                    disabled={!canProceed[step]}
                  >
                    Continue
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* ── Live preview sidebar ── */}
          <div className="hidden md:block">
            <div className="sticky top-6">
              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Live preview
                  </div>
                  <div className="flex justify-center">
                    <BottlePreview {...previewProps} width={130} height={300} />
                  </div>
                  <div className="mt-5 space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span>Shape</span>
                      <span className="text-foreground font-medium truncate max-w-[120px] text-right">
                        {selectedShape?.name ?? '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Glass</span>
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <span className="w-3 h-3 rounded-full inline-block border border-border/40"
                          style={{ backgroundColor: glassHex }} />
                        {selectedGlass?.name ?? '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquid</span>
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <span className="w-3 h-3 rounded-full inline-block border border-border/40"
                          style={{ backgroundColor: liquidHex }} />
                        {selectedLiquid?.name ?? '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Closure</span>
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <span className="w-3 h-3 rounded-full inline-block border border-border/40"
                          style={{ backgroundColor: closureHex }} />
                        {selectedClosure?.name ?? '—'}
                      </span>
                    </div>
                    {config.labelFile && (
                      <div className="flex justify-between">
                        <span>Label</span>
                        <span className="text-green-400 font-medium">✓ Uploaded</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/60 text-center mt-4 leading-snug">
                    Illustrative preview — final render is photorealistic
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
