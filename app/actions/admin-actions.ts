"use server"

import { createClient } from "@/lib/supabase/server"

export async function createAdminAccount(email: string, password: string, authPin: string) {
  // Verify authorization PIN
  const correctPin = process.env.AUTP

  if (!correctPin) {
    return { success: false, error: "Authorization system not configured" }
  }

  if (authPin !== correctPin) {
    return { success: false, error: "Invalid authorization PIN" }
  }

  // Create Supabase client
  const supabase = await createClient()

  try {
    // Create the admin account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`,
      },
    })

    if (error) {
      console.error("[v0] Supabase signup error:", error)
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: "Failed to create user account" }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Admin account creation error:", error)
    return { success: false, error: "An unexpected error occurred during account creation" }
  }
}
