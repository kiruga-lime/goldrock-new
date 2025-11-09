"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
  try {
    const supabase = await createClient()

    const [{ data: itinerariesData, error: itinerariesError }, { data: bookingsData, error: bookingsError }] =
      await Promise.all([supabase.from("itineraries").select("*"), supabase.from("bookings").select("*")])

    if (itinerariesError) throw itinerariesError
    if (bookingsError) throw bookingsError

    const totalBookings = bookingsData?.length || 0
    const totalItineraries = itinerariesData?.length || 0
    const totalGuests = bookingsData?.reduce((sum, b) => sum + (b.number_of_people || 0), 0) || 0
    const pendingBookings = bookingsData?.filter((b) => b.status === "pending").length || 0

    return {
      totalItineraries,
      totalBookings,
      totalGuests,
      pendingBookings,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      totalItineraries: 0,
      totalBookings: 0,
      totalGuests: 0,
      pendingBookings: 0,
    }
  }
}
