import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("[v0] Supabase environment variables are not configured")
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes that require authentication
  if (request.nextUrl.pathname.startsWith("/add-itinerary") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith("/admin/dashboard") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
