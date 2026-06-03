import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Gracefully handle missing Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request })
  }

  // For Server Action requests, we need to be careful about modifying the response.
  // Server Actions send POST requests with the Next-Action header.
  // We still process auth (for session refresh) but handle the response carefully.
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
          // For Server Action requests, avoid creating a new response object
          // as it can interfere with the action resolution.
          // Just set cookies on the existing response instead.
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

  // Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin sub-routes only (not /admin itself, which shows the login page)
  // /admin/projects, /admin/blog, etc. require authentication
  // /admin alone serves the login page when unauthenticated
  if (request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin/') {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  // If user is authenticated and visits /admin, let them through to dashboard
  // If user is not authenticated and visits /admin, let them through to login page

  return supabaseResponse
}
