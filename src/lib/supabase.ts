import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

let _client: SupabaseClient<Database> | undefined

function getClient(): SupabaseClient<Database> {
  if (!_client) {
    _client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return _client
}

// Lazy proxy — defers createClient() until the first property access.
// This prevents the build from crashing when env vars are absent during
// Next.js page-data collection (the module can be imported safely).
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop: string | symbol) {
    return (getClient() as any)[prop]
  },
})
