'use client'

import { useEffect, useState, useCallback } from 'react'
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

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div key={n} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              n === current
                ? 'bg-primary text-primary-foreground'
                : n < current
                ? 'bg-green-600 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {n < current ? '✓' : n}
          </div>
          {n < total && <div className={`h-px w-8 ${n < current ? 'bg-green-600' : 'bg-border'}`} />}
        </div>
      ))}
    </div>
  )
}

function SelectionGrid<T extends { id: string; name: string }>({
  items,
  selected,
  onSelect,
  renderItem,
}: {
  items: T[]
  selected: string
  onSelect: (id: string) => void
  renderItem?: (item: T) => React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            selected === item.id
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-border/60 bg-muted/30'
          }`}
        >
          {renderItem ? renderItem(item) : null}
          <div className="text-sm font-medium mt-2">{item.name}</div>
        </button>
      ))}
    </div>
  )
}

function BottlePreview({ config, glassColors, liquidShades }: {
  config: Config
  glassColors: GlassColor[]
  liquidShades: LiquidShade[]
}) {
  const glass = glassColors.find(c => c.id === config.glassColorId)
  const liquid = liquidShades.find(s => s.id === config.liquidShadeId)
  const glassHex = glass?.hex_preview ?? '#4A6741'
  const liquidHex = liquid?.hex_preview ?? '#8B1A2E'

  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <svg width="120" height="280" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M35 80 Q30 90 28 110 L25 250 Q25 260 60 260 Q95 260 95 250 L92 110 Q90 90 85 80 Z"
            fill={glassHex}
            opacity="0.85"
            stroke={glassHex}
            strokeWidth="1"
          />
          <path
            d="M35 80 Q30 90 28 110 L27 200 Q30 210 60 210 Q90 210 93 200 L92 110 Q90 90 85 80 Z"
            fill={liquidHex}
            opacity="0.6"
          />
          <rect x="32" y="130" width="56" height="70" rx="3" fill="white" opacity="0.9" />
          {config.labelFile && (
            <text x="60" y="168" textAnchor="middle" fontSize="8" fill="#666">Label</text>
          )}
          <rect x="48" y="30" width="24" height="52" rx="4" fill={glassHex} opacity="0.85" />
          <rect x="50" y="15" width="20" height="18" rx="3" fill="#8B7355" />
        </svg>
      </div>
    </div>
  )
}

export default function ConfigurePage() {
  const [step, setStep] = useState<Step>(1)
  const [bottleShapes, setBottleShapes] = useState<BottleShape[]>([])
  const [glassColors, setGlassColors] = useState<GlassColor[]>([])
  const [liquidShades, setLiquidShades] = useState<LiquidShade[]>([])
  const [closureFinishes, setClosureFinishes] = useState<ClosureFinish[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

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

  useEffect(() => {
    async function loadData() {
      const shapesRes = await supabase.from('bottle_shapes').select('*').order('category')
      const colorsRes = await supabase.from('glass_colors').select('*')
      const shadesRes = await supabase.from('liquid_shades').select('*')
      const closuresRes = await supabase.from('closure_finishes').select('*').order('category')

      const shapes = (shapesRes.data ?? []) as BottleShape[]
      const colors = (colorsRes.data ?? []) as GlassColor[]
      const shades = (shadesRes.data ?? []) as LiquidShade[]
      const closures = (closuresRes.data ?? []) as ClosureFinish[]

      setBottleShapes(shapes)
      setGlassColors(colors)
      setLiquidShades(shades)
      setClosureFinishes(closures)
      setConfig(c => ({
        ...c,
        bottleShapeId: shapes[0]?.id ?? '',
        glassColorId: colors[0]?.id ?? '',
        liquidShadeId: shades[0]?.id ?? '',
        closureFinishId: closures[0]?.id ?? '',
      }))
      setLoading(false)
    }
    loadData()
  }, [])

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
        bottle_shape_id: config.bottleShapeId,
        glass_color_id: config.glassColorId,
        liquid_shade_id: config.liquidShadeId,
        closure_finish_id: config.closureFinishId,
        label_position_x: config.labelPositionX,
        label_position_y: config.labelPositionY,
        label_scale: config.labelScale,
        amount_cents: 2900,
      }).select().single()

      if (error) throw error
      setOrderId(data.id)
      setStep(5)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading configurator...</div>
      </div>
    )
  }

  const canProceed = {
    1: !!config.bottleShapeId,
    2: !!config.glassColorId && !!config.liquidShadeId,
    3: !!config.closureFinishId,
    4: true,
    5: !!config.email,
  }

  const shapesByCategory = bottleShapes.reduce<Record<string, BottleShape[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s]
    return acc
  }, {})

  const closuresByCategory = closureFinishes.reduce<Record<string, ClosureFinish[]>>((acc, c) => {
    acc[c.category] = [...(acc[c.category] ?? []), c]
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Configure your bottle</h1>
          <p className="text-muted-foreground text-sm">Customize every detail, then upload your label and submit.</p>
        </div>

        <Progress value={(step / 5) * 100} className="mb-8 h-1" />
        <StepIndicator current={step} total={5} />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Config panel */}
          <div className="md:col-span-2">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                {/* Step 1: Bottle shape */}
                {step === 1 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Select bottle shape</h2>
                    {Object.entries(shapesByCategory).map(([cat, shapes]) => (
                      <div key={cat} className="mb-6">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat}</div>
                        <SelectionGrid
                          items={shapes}
                          selected={config.bottleShapeId}
                          onSelect={(id) => setConfig(c => ({ ...c, bottleShapeId: id }))}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Glass + liquid */}
                {step === 2 && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Glass color</h2>
                      <SelectionGrid
                        items={glassColors}
                        selected={config.glassColorId}
                        onSelect={(id) => setConfig(c => ({ ...c, glassColorId: id }))}
                        renderItem={(item) => (
                          <div
                            className="w-8 h-8 rounded-full border border-border"
                            style={{ backgroundColor: item.hex_preview ?? '#888' }}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Wine liquid shade</h2>
                      <SelectionGrid
                        items={liquidShades}
                        selected={config.liquidShadeId}
                        onSelect={(id) => setConfig(c => ({ ...c, liquidShadeId: id }))}
                        renderItem={(item) => (
                          <div
                            className="w-8 h-8 rounded-full border border-border"
                            style={{ backgroundColor: item.hex_preview ?? '#888' }}
                          />
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Closure */}
                {step === 3 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Closure finish</h2>
                    {Object.entries(closuresByCategory).map(([cat, closures]) => (
                      <div key={cat} className="mb-6">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat}</div>
                        <SelectionGrid
                          items={closures}
                          selected={config.closureFinishId}
                          onSelect={(id) => setConfig(c => ({ ...c, closureFinishId: id }))}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4: Label */}
                {step === 4 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Upload your label</h2>
                    <p className="text-sm text-muted-foreground mb-6">PNG with transparent background recommended. Max 20MB.</p>

                    <div
                      className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => document.getElementById('label-upload')?.click()}
                    >
                      {config.labelFile ? (
                        <div>
                          <div className="text-green-400 font-medium mb-1">✓ {config.labelFile.name}</div>
                          <div className="text-xs text-muted-foreground">{(config.labelFile.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-muted-foreground mb-2 text-4xl">↑</div>
                          <div className="text-sm font-medium">Click to upload label file</div>
                          <div className="text-xs text-muted-foreground mt-1">PNG, max 20MB</div>
                        </div>
                      )}
                    </div>
                    <input
                      id="label-upload"
                      type="file"
                      accept="image/png"
                      className="hidden"
                      onChange={handleLabelUpload}
                    />

                    {config.labelFile && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Label position X</Label>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={config.labelPositionX}
                            onChange={(e) => setConfig(c => ({ ...c, labelPositionX: Number(e.target.value) }))}
                            className="w-full accent-primary"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Label position Y</Label>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={config.labelPositionY}
                            onChange={(e) => setConfig(c => ({ ...c, labelPositionY: Number(e.target.value) }))}
                            className="w-full accent-primary"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Label scale</Label>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={config.labelScale}
                            onChange={(e) => setConfig(c => ({ ...c, labelScale: Number(e.target.value) }))}
                            className="w-full accent-primary"
                          />
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-4">
                      No label yet? Skip this step — you can provide it after ordering, or we can use a blank label.
                    </p>
                  </div>
                )}

                {/* Step 5: Review + pay */}
                {step === 5 && (
                  <div>
                    {orderId ? (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-bold mb-2">Order submitted!</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                          Your render will be delivered within 60 minutes. Check your email for updates.
                        </p>
                        <Badge variant="secondary" className="mb-4">Order ID: {orderId.slice(0, 8)}...</Badge>
                        <div className="mt-6">
                          <Link href={`/order/${orderId}`}>
                            <Button variant="outline">Track your order</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-lg font-semibold mb-6">Review and pay</h2>

                        <div className="bg-muted rounded-lg p-4 mb-6 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bottle</span>
                            <span>{bottleShapes.find(s => s.id === config.bottleShapeId)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Glass color</span>
                            <span>{glassColors.find(c => c.id === config.glassColorId)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Liquid shade</span>
                            <span>{liquidShades.find(s => s.id === config.liquidShadeId)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Closure</span>
                            <span>{closureFinishes.find(c => c.id === config.closureFinishId)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Label</span>
                            <span>{config.labelFile ? config.labelFile.name : 'Not uploaded'}</span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4 mb-6">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>$29.00</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={config.email}
                            onChange={(e) => setConfig(c => ({ ...c, email: e.target.value }))}
                          />
                          <p className="text-xs text-muted-foreground">We&apos;ll send your render to this address.</p>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          disabled={!canProceed[5] || submitting}
                          onClick={handleSubmit}
                        >
                          {submitting ? 'Submitting...' : 'Pay $29.00 and submit'}
                        </Button>
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

          {/* Live preview */}
          <div className="hidden md:block">
            <Card className="sticky top-6 bg-card border-border">
              <CardContent className="p-4">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Live preview</div>
                <BottlePreview
                  config={config}
                  glassColors={glassColors}
                  liquidShades={liquidShades}
                />
                <div className="text-xs text-muted-foreground text-center mt-2">
                  Illustrative preview — final render will be photorealistic
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
