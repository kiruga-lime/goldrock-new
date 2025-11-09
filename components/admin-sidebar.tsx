"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, Plus, Calendar, User, LogOut, Menu, X, Edit2 } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface AdminSidebarProps {
  email?: string
}

export function AdminSidebar({ email }: AdminSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
    { id: "add", label: "Add Itinerary", icon: Plus, href: "/admin/dashboard/add-itinerary" },
    { id: "edit", label: "Edit Itineraries", icon: Edit2, href: "/admin/dashboard/edit-itineraries" },
    { id: "bookings", label: "View Bookings", icon: Calendar, href: "/admin/dashboard/bookings" },
    { id: "analytics", label: "Site Analytics", icon: BarChart3, href: "/admin/dashboard/analytics" },
    { id: "profile", label: "My Profile", icon: User, href: "/admin/dashboard/profile" },
  ]

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-foreground text-background border-r border-border transition-all duration-300 z-40",
          "md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 border-b border-background/20">
          <h2 className="text-xl font-bold text-primary">GOLDROCK SAFARIS</h2>
          {email && <p className="text-sm text-background/70 mt-2 truncate">{email}</p>}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left block",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-background/80 hover:bg-background/10 hover:text-background",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-background/30 text-background hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
