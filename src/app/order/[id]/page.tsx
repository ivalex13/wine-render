import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Nav } from '@/components/nav'

const STATUS_LABELS: Record<string, { label: string; description: string; color: string }> = {
  pending_payment: {
    label: 'Pending payment',
    description: 'Waiting for payment confirmation.',
    color: 'bg-amber-900/30 text-amber-300',
  },
  paid: {
    label: 'Paid',
    description: 'Payment confirmed. Your order is queued for rendering.',
    color: 'bg-blue-900/30 text-blue-300',
  },
  rendering: {
    label: 'Rendering',
    description: 'Your bottle is being rendered. This usually takes 30–60 minutes.',
    color: 'bg-purple-900/30 text-purple-300',
  },
  complete: {
    label: 'Complete',
    description: 'Your render is ready to download.',
    color: 'bg-green-900/30 text-green-400',
  },
  failed: {
    label: 'Failed',
    description: 'Something went wrong. Please contact support.',
    color: 'bg-red-900/30 text-red-400',
  },
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: order, error } = await supabase.from('orders').select('*').eq('id', id).single()

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">¯\_(ツ)_/¯</div>
          <h1 className="text-xl font-semibold mb-2">Order not found</h1>
          <p className="text-muted-foreground text-sm mb-6">This order doesn&apos;t exist or has been removed.</p>
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>Back to home</Link>
        </div>
      </div>
    )
  }

  const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.pending_payment

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-1">Order #{order.id.slice(0, 8).toUpperCase()}</div>
          <h1 className="text-2xl font-bold">Order status</h1>
        </div>

        {/* Status card */}
        <Card className="mb-6 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                {status.label}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-3">{status.description}</p>

            {order.status === 'complete' && order.rendered_image_url && (
              <div className="mt-4">
                <a href={order.rendered_image_url} download className={buttonVariants()}>Download render</a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration summary */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Configuration</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bottle shape</span>
                <span>{order.bottle_shape_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Glass color</span>
                <span>{order.glass_color_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Liquid shade</span>
                <span>{order.liquid_shade_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Closure</span>
                <span>{order.closure_finish_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Label uploaded</span>
                <span>{order.label_file_url ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 mt-3 font-medium">
                <span>Amount</span>
                <span>${(order.amount_cents / 100).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/configure" className={buttonVariants({ variant: 'outline' })}>Create another render</Link>
        </div>
      </div>
    </div>
  )
}
