'use client'

import { useState } from 'react'
import type { GlassColor, LiquidShade } from '@/types/database'

function BottlePreview({ glassHex, liquidHex, liquidName }: { glassHex: string; liquidHex: string; liquidName: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="bg-card border border-border rounded-lg p-3 group-hover:border-border/60 transition-colors">
        <svg width="48" height="112" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M35 80 Q30 90 28 110 L25 250 Q25 260 60 260 Q95 260 95 250 L92 110 Q90 90 85 80 Z"
            fill={glassHex} opacity="0.82"
          />
          <path
            d="M35 80 Q30 90 28 110 L27 200 Q30 210 60 210 Q90 210 93 200 L92 110 Q90 90 85 80 Z"
            fill={liquidHex} opacity="0.65"
          />
          <rect x="32" y="128" width="56" height="66" rx="2" fill="white" opacity="0.12" />
          <rect x="48" y="30" width="24" height="52" rx="4" fill={glassHex} opacity="0.82" />
          <rect x="50" y="15" width="20" height="18" rx="3" fill="#7a6245" />
        </svg>
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight max-w-[60px]">{liquidName}</span>
    </div>
  )
}

export function ColorsExplorer({ glassColors, liquidShades }: { glassColors: GlassColor[]; liquidShades: LiquidShade[] }) {
  const [selectedGlass, setSelectedGlass] = useState<GlassColor>(glassColors[0])

  return (
    <div>
      {/* Glass selector */}
      <div className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Select glass color</h2>
        <div className="flex flex-wrap gap-4">
          {glassColors.map((glass) => (
            <button
              key={glass.id}
              onClick={() => setSelectedGlass(glass)}
              className={`flex flex-col items-center gap-2 group transition-all`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedGlass.id === glass.id
                    ? 'scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: glass.hex_preview ?? '#888',
                  borderColor: selectedGlass.id === glass.id ? 'oklch(0.50 0.18 322)' : 'transparent',
                  boxShadow: selectedGlass.id === glass.id ? '0 0 0 3px oklch(0.50 0.18 322 / 0.25)' : 'none',
                }}
              />
              <span className="text-xs text-muted-foreground text-center max-w-[52px] leading-tight">
                {glass.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected glass info */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border border-border"
            style={{ backgroundColor: selectedGlass.hex_preview ?? '#888' }}
          />
          <h3 className="font-semibold">{selectedGlass.name}</h3>
          <span className="text-sm text-muted-foreground">— {liquidShades.length} liquid shades shown</span>
        </div>
      </div>

      {/* Liquid shade grid */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          All liquid shades through {selectedGlass.name} glass
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {liquidShades.map((shade) => (
            <BottlePreview
              key={shade.id}
              glassHex={selectedGlass.hex_preview ?? '#4a6741'}
              liquidHex={shade.hex_preview ?? '#8b1a2e'}
              liquidName={shade.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
