import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Nav() {
  return (
    <nav className="border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">WineRender</Link>
        <div className="flex items-center gap-5">
          <Link href="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Library</Link>
          <Link href="/colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Colors</Link>
          <Link href="/label-prep" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Label prep</Link>
          <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/configure" className={buttonVariants({ size: 'sm' })}>Start now</Link>
        </div>
      </div>
    </nav>
  )
}
