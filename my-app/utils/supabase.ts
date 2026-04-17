import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Ce log va apparaître dans ton terminal (ou console navigateur)
  console.log("Ma clé URL est :", process.env.NEXT_PUBLIC_SUPABASE_URL);

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}