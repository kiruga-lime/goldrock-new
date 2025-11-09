import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Admin Dashboard - Goldrock Safaris",
  description: "Manage your safari itineraries and bookings",
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar email={user.email} />
      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
