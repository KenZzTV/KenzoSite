import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log("--- MIDDLEWARE EN ACTION SUR :", request.nextUrl.pathname);
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        // ... dans ton createServerClient ...
      remove(name: string, options: CookieOptions) {
        // On passe une chaîne vide "" pour supprimer le cookie
        request.cookies.set({ name, value: "", ...options }) 
        response = NextResponse.next({
          request: { headers: request.headers },
        })
        response.cookies.set({ name, value: "", ...options })
      },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // PROTECTION : Si l'utilisateur n'est pas connecté et essaie d'aller sur /dashboard
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'], // Ce middleware ne s'applique qu'au dashboard
}