import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, block admin sub-routes and API routes
  // Allow /admin through so the login page can render
  if (!supabaseUrl || !supabaseAnonKey) {
    if (request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin/') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
    if (
      request.nextUrl.pathname.startsWith('/api/storage') ||
      request.nextUrl.pathname.startsWith('/api/migrate') ||
      request.nextUrl.pathname.startsWith('/api/debug')
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next({ request })
  }

  const isServerAction = request.headers.get('Next-Action') !== null

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          if (!isServerAction) {
            supabaseResponse = NextResponse.next({
              request,
            })
          }
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin sub-routes (not /admin itself — the layout handles the login page)
  if (request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin/') {
    if (!user) {
      // For server actions, return a JSON error instead of redirecting
      // (redirects on server actions cause "Failed to find Server Action" errors)
      if (isServerAction) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  // Protect admin API routes
  if (
    request.nextUrl.pathname.startsWith('/api/storage') ||
    request.nextUrl.pathname.startsWith('/api/migrate') ||
    request.nextUrl.pathname.startsWith('/api/debug')
  ) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return supabaseResponse
}
