"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createItinerary(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const country = formData.get("country") as string
  const duration = formData.get("duration") as string
  const image_url = (formData.get("image_url") as string) || "/placeholder.svg?height=400&width=600"
  const summary = formData.get("summary") as string
  const daysJson = formData.get("days") as string

  // Validate required fields
  if (!title || !country || !duration || !summary || !daysJson) {
    return { success: false, error: "All required fields must be filled" }
  }

  let days
  try {
    days = JSON.parse(daysJson)
    if (!Array.isArray(days) || days.length === 0) {
      return { success: false, error: "At least one day is required" }
    }
  } catch {
    return { success: false, error: "Invalid days data" }
  }

  try {
    const { error } = await supabase.from("itineraries").insert({
      title,
      country,
      duration,
      image_url,
      summary,
      days,
    })

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to create itinerary" }
    }

    revalidatePath("/itineraries")
    return { success: true }
  } catch (error) {
    console.error("Server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateItinerary(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const country = formData.get("country") as string
  const duration = formData.get("duration") as string
  const image_url = (formData.get("image_url") as string) || "/placeholder.svg?height=400&width=600"
  const summary = formData.get("summary") as string
  const daysJson = formData.get("days") as string

  // Validate required fields
  if (!title || !country || !duration || !summary || !daysJson) {
    return { success: false, error: "All required fields must be filled" }
  }

  let days
  try {
    days = JSON.parse(daysJson)
    if (!Array.isArray(days) || days.length === 0) {
      return { success: false, error: "At least one day is required" }
    }
  } catch {
    return { success: false, error: "Invalid days data" }
  }

  try {
    const { error } = await supabase
      .from("itineraries")
      .update({
        title,
        country,
        duration,
        image_url,
        summary,
        days,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to update itinerary" }
    }

    revalidatePath("/itineraries")
    revalidatePath(`/itineraries/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteItinerary(id: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("itineraries").delete().eq("id", id)

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to delete itinerary" }
    }

    revalidatePath("/itineraries")
    return { success: true }
  } catch (error) {
    console.error("Server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
