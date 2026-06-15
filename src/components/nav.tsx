'use client'

import { useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">WineRender</Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Library</Link>
          <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Colors</Link>
          <Link href="/label-prep" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Label prep</Link>
          <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/configure" className={buttonVariants({ size: 'sm' })}>Start now</Link>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border mt-4 pt-4 pb-2 flex flex-col gap-1">
          <Link href="/library" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2.5 rounded transition-colors">Library</Link>
          <Link href="/colors" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2.5 rounded transition-colors">Colors</Link>
          <Link href="/label-prep" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2.5 rounded transition-colors">Label prep</Link>
          <Link href="/#pricing" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2.5 rounded transition-colors">Pricing</Link>
          <div className="mt-3">
            <Link href="/configure" onClick={() => setOpen(false)} className={buttonVariants({ size: 'sm' }) + ' w-full justify-center'}>Start now</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
