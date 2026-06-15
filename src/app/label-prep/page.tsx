import { Nav } from '@/components/nav'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const STEPS = [
  {
    n: '01',
    title: 'Send us your file',
    desc: 'Upload your label artwork in any format — PDF, AI, EPS, JPG, or PNG. If you have multiple label faces, send them all.',
  },
  {
    n: '02',
    title: 'We prepare it',
    desc: 'We extract the artwork, remove the external background, crop to the label shape, and preserve your paper or material color.',
  },
  {
    n: '03',
    title: 'Receive your PNG',
    desc: 'Within 2 business days you\'ll get a clean PNG with a transparent background, ready to upload directly to your WineRender order.',
  },
]

const ACCEPTED = [
  'PDF (preferred)',
  'Adobe Illustrator (.ai)',
  'EPS files',
  'High-res JPG or PNG',
  'InDesign exports',
  'Canva PDF exports',
]

const NOT_ACCEPTED = [
  'Low-resolution or blurry artwork',
  'Phone photos of physical labels',
  'Illustrator files with missing linked images',
  'Screenshots or screen recordings',
]

const DOS = [
  { title: 'Paper labels', desc: 'Keep the paper color (white, cream, kraft). Only the area outside the label shape is removed. The label backing itself stays.' },
  { title: 'Silkscreen / ACL labels', desc: 'The entire background behind the printed ink is made transparent — only the ink itself stays.' },
  { title: 'Die-cut labels', desc: 'We follow the cut line exactly. Custom shapes, arched tops, and irregular contours are all supported.' },
  { title: 'Multi-panel labels', desc: 'Front, back, and neck labels can all be sent in one request. We\'ll return each as a separate prepared PNG.' },
]

export default function LabelPrepPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <div className="border-b border-border" style={{ background: 'oklch(0.15 0.006 285)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Free service</p>
          <h1 className="text-4xl font-extrabold mb-4">Request free label prep</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-lg">
            Send us whatever you have. We&apos;ll convert it into a clean PNG that works perfectly in WineRender — at no charge, within 2 business days.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <a
              href="mailto:labels@winerender.com?subject=Label prep request"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm transition-colors text-white"
              style={{ background: 'oklch(0.50 0.18 322)' }}
            >
              Send your label file →
            </a>
            <Link href="/configure" className={buttonVariants({ variant: 'outline' })}>
              Skip — I already have a PNG
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <Card key={s.n} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="text-4xl font-extrabold mb-4" style={{ color: 'oklch(0.50 0.18 322 / 0.3)' }}>{s.n}</div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Accepted formats */}
        <section>
          <h2 className="text-2xl font-bold mb-8">What to send</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Accepted</div>
              <ul className="space-y-3">
                {ACCEPTED.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="font-bold" style={{ color: 'oklch(0.50 0.18 322)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Not accepted</div>
              <ul className="space-y-3">
                {NOT_ACCEPTED.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-red-400 font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section>
          <h2 className="text-2xl font-bold mb-8">What we do (and don&apos;t do)</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {DOS.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">We don&apos;t</strong> redesign, color-correct, retouch, or add effects to your artwork. We prepare the file technically — the creative is yours.
            </p>
          </div>
        </section>

      </div>

      {/* CTA */}
      <section className="bg-plum">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to get started?</h2>
          <p className="text-white/65 mb-8 text-sm">Email us your label file and we&apos;ll have it prepared within 2 business days — free.</p>
          <a
            href="mailto:labels@winerender.com?subject=Label prep request"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white font-semibold text-sm hover:bg-white/90 transition-colors"
            style={{ color: 'oklch(0.27 0.12 322)' }}
          >
            Send your label file →
          </a>
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
