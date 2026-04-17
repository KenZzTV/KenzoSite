import { createBrowserClient } from '@supabase/ssr'

// 1. La fonction (utile pour le Dashboard)
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// 2. L'instance directe (indispensable pour la page Settings que je t'ai donnée)
export const supabase = createClient()