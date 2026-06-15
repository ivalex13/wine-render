'use client'

import { useState } from 'react'
import type { GlassColor, LiquidShade } from '@/types/database'

function BottlePreview({ glassHex, liquidHex, liquidName }: { glassHex: string; liquidHex: string; liquidName: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
      <div
        className="bg-card border border-border rounded-xl p-3 group-hover:border-primary/40 transition-colors"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}
      >
        <svg width="52" height="120" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M36 82 Q30 93 28 113 L25 252 Q25 264 60 264 Q95 264 95 252 L92 113 Q90 93 84 82 Z"
            fill={glassHex} opacity="0.87"
          />
          <path
            d="M36 82 Q30 93 28 113 L28 202 Q31 213 60 213 Q89 213 92 202 L92 113 Q90 93 84 82 Z"
            fill={liquidHex} opacity="0.70"
          />
          <rect x="34" y="136" width="52" height="58" rx="2" fill="white" opacity="0.90" />
          <rect x="41" y="148" width="38" height="2" rx="1" fill="#bbb" opacity="0.45" />
          <rect x="41" y="156" width="26" height="2" rx="1" fill="#bbb" opacity="0.45" />
          <rect x="41" y="164" width="32" height="2" rx="1" fill="#bbb" opacity="0.45" />
          <rect x="49" y="30" width="22" height="54" rx="4" fill={glassHex} opacity="0.87" />
          <rect x="51" y="13" width="18" height="20" rx="3" fill="oklch(0.50 0.18 322)" />
        </svg>
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight max-w-[68px]">{liquidName}</span>
    </div>
  )
}

export function ColorsExplorer({ glassColors, liquidShades }: { glassColors: GlassColor[]; liquidShades: LiquidShade[] }) {
  const [selectedGlass, setSelectedGlass] = useState<GlassColor>(glassColors[0])

  return (
    <div>
      {/* Glass selector */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Select glass color</h2>
        <div className="flex flex-wrap gap-3 md:gap-5">
          {glassColors.map((glass) => (
            <button
              key={glass.id}
              onClick={() => setSelectedGlass(glass)}
              className="flex flex-col items-center gap-2 transition-all"
            >
              <div
                className="w-11 h-11 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: glass.hex_preview ?? '#888',
                  borderColor: selectedGlass.id === glass.id ? 'oklch(0.50 0.18 322)' : 'transparent',
                  boxShadow: selectedGlass.id === glass.id
                    ? '0 0 0 3px oklch(0.50 0.18 322 / 0.25)'
                    : '0 0 0 1px oklch(1 0 0 / 0.10)',
                  opacity: selectedGlass.id === glass.id ? 1 : 0.65,
                  transform: selectedGlass.id === glass.id ? 'scale(1.12)' : 'scale(1)',
                }}
              />
              <span className={`text-xs text-center max-w-[52px] leading-tight transition-colors ${
                selectedGlass.id === glass.id ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {glass.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider + label */}
      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border">
        <div
          className="w-8 h-8 rounded-full border border-border flex-shrink-0"
          style={{ backgroundColor: selectedGlass.hex_preview ?? '#888' }}
        />
        <div>
          <div className="font-semibold">{selectedGlass.name}</div>
          <div className="text-sm text-muted-foreground">{liquidShades.length} liquid shades</div>
        </div>
      </div>

      {/* Liquid shade grid */}
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        All liquid shades through {selectedGlass.name} glass
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
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
  )
}
