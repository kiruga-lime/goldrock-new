"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, Users, X, Plus, Loader2, Edit, Trash2, Upload } from "lucide-react"
import { createItinerary, deleteItinerary } from "@/app/actions/itinerary-actions"
import type { ItineraryDay } from "@/types/itinerary"

export interface AdminDashboardContentProps {
  section: string
  itineraries?: any[]
  bookings?: any[]
  isLoading?: boolean
  onRefresh?: () => void
}

export function AdminDashboardContent({
  section,
  itineraries = [],
  bookings = [],
  isLoading = false,
  onRefresh = () => {},
}: AdminDashboardContentProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const renderAddItinerary = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Safari Itinerary</h1>
        <p className="text-muted-foreground mt-2">Create a new safari adventure for travelers to discover</p>
      </div>
      <AddItineraryForm onSuccess={onRefresh} />
    </div>
  )

  const renderEditItineraries = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Itineraries</h1>
        <p className="text-muted-foreground mt-2">Manage your existing safari packages</p>
      </div>
      {isLoading ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </CardContent>
        </Card>
      ) : itineraries.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {itineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{itinerary.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {itinerary.country} • {itinerary.duration}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingId(itinerary.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        const result = await deleteItinerary(itinerary.id)
                        if (result.success) {
                          onRefresh()
                        } else {
                          console.error("Failed to delete itinerary:", result.error)
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground line-clamp-2">{itinerary.summary}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>{itinerary.days?.length || 0} days</Badge>
                    <Badge variant="outline">{itinerary.country}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">No itineraries created yet</CardContent>
        </Card>
      )}
    </div>
  )

  const renderBookings = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Guest Bookings</h1>
        <p className="text-muted-foreground mt-2">Manage all guest reservations and bookings</p>
      </div>
      {isLoading ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </CardContent>
        </Card>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking: any) => (
            <Card key={booking.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.guest_name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Itinerary: {booking.itinerary?.title}</p>
                  </div>
                  <Badge>{booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "pending"}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{booking.guest_email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{booking.guest_phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{booking.number_of_people} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(booking.travel_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">No bookings yet</CardContent>
        </Card>
      )}
    </div>
  )

  const renderAnalytics = () => {
    const bookingsByStatus = {
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    }

    const bookingsByCountry: Record<string, number> = {}
    itineraries.forEach((it: any) => {
      const count = bookings.filter((b) => b.itinerary_id === it.id).length
      if (count > 0) bookingsByCountry[it.country] = (bookingsByCountry[it.country] || 0) + count
    })

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Site Analytics</h1>
          <p className="text-muted-foreground mt-2">Overview of bookings and itinerary performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{bookings.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Travelers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {bookings.reduce((sum: number, b: any) => sum + (b.number_of_people || 0), 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Itineraries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{itineraries.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Group Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {bookings.length
                  ? Math.round(
                      (bookings.reduce((sum: number, b: any) => sum + (b.number_of_people || 0), 0) / bookings.length) *
                        10,
                    ) / 10
                  : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(bookingsByStatus).map(([status, count]) => (
                  <div key={status}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{status}</span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${bookings.length ? (count / bookings.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(bookingsByCountry).length > 0 ? (
                  Object.entries(bookingsByCountry).map(([country, count]) => (
                    <div key={country}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{country}</span>
                        <span className="text-sm font-bold">{count} bookings</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent rounded-full h-2"
                          style={{
                            width: `${Object.values(bookingsByCountry).reduce((a, b) => a + b, 0) ? (count / Object.values(bookingsByCountry).reduce((a, b) => a + b, 0)) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No bookings yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (section === "add") return renderAddItinerary()
  if (section === "edit") return renderEditItineraries()
  if (section === "bookings") return renderBookings()
  if (section === "analytics") return renderAnalytics()
  return null
}

function AddItineraryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState<string>("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      day_number: 1,
      title: "",
      description: "",
      accommodation: "",
      extra: "",
    },
  ])

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) throw new Error("Upload failed")
    const data = await response.json()
    return data.url
  }

  const addDay = () => {
    setDays([
      ...days,
      {
        day_number: days.length + 1,
        title: "",
        description: "",
        accommodation: "",
        extra: "",
      },
    ])
  }

  const removeDay = (index: number) => {
    if (days.length > 1) {
      const newDays = days.filter((_, i) => i !== index)
      const renumberedDays = newDays.map((day, i) => ({
        ...day,
        day_number: i + 1,
      }))
      setDays(renumberedDays)
    }
  }

  const updateDay = (index: number, field: keyof ItineraryDay, value: string) => {
    const newDays = [...days]
    newDays[index] = { ...newDays[index], [field]: value }
    setDays(newDays)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const invalidDay = days.find((day) => !day.title.trim() || !day.description.trim() || !day.accommodation.trim())
      if (invalidDay) {
        setError("Please fill in all required fields for each day")
        setIsLoading(false)
        return
      }

      const formData = new FormData(e.currentTarget as HTMLFormElement)
      let featuredImageUrl = formData.get("image_url") as string

      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage)
      }

      const additionalImageUrls: string[] = []
      for (const img of additionalImages) {
        const url = await uploadImage(img)
        additionalImageUrls.push(url)
      }

      formData.set("image_url", featuredImageUrl)
      formData.append("additional_images", JSON.stringify(additionalImageUrls))
      formData.append("days", JSON.stringify(days))
      formData.append("country", country)

      const result = await createItinerary(formData)

      if (result.success) {
        alert("Itinerary created successfully!")
        setCountry("")
        setFeaturedImage(null)
        setAdditionalImages([])
        setDays([{ day_number: 1, title: "", description: "", accommodation: "", extra: "" }])
        onSuccess?.()
      } else {
        setError(result.error || "Failed to create itinerary")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Itinerary Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Bwindi Gorilla Trekking & Queen Elizabeth Safari"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Uganda">Uganda</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="Tanzania">Tanzania</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Input id="duration" name="duration" placeholder="e.g., 5 days / 4 nights" required />
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  id="featured_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("featured_image")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {featuredImage ? featuredImage.name : "Upload Featured Image"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional_images">Additional Images - Up to 5 (Optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  id="additional_images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setAdditionalImages(Array.from(e.target.files || []).slice(0, 5))}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("additional_images")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {additionalImages.length > 0
                    ? `${additionalImages.length} images selected`
                    : "Upload Additional Images"}
                </Button>
              </div>
              {additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {additionalImages.map((img, idx) => (
                    <Badge key={idx} variant="secondary">
                      {img.name}
                      <button
                        type="button"
                        onClick={() => setAdditionalImages(additionalImages.filter((_, i) => i !== idx))}
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Itinerary Summary *</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Brief overview of the safari experience..."
              required
              rows={3}
            />
          </div>

          <div className="space-y-4 border-t pt-6">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Daily Itinerary *</Label>
              <Button type="button" onClick={addDay} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Day
              </Button>
            </div>

            <div className="space-y-6">
              {days.map((day, index) => (
                <Card key={index} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Day {day.day_number}</CardTitle>
                      {days.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeDay(index)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-title`}>Day Title *</Label>
                      <Input
                        id={`day-${index}-title`}
                        value={day.title}
                        onChange={(e) => updateDay(index, "title", e.target.value)}
                        placeholder="e.g., Arrival in Kampala & Transfer to Bwindi"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-description`}>Description *</Label>
                      <Textarea
                        id={`day-${index}-description`}
                        value={day.description}
                        onChange={(e) => updateDay(index, "description", e.target.value)}
                        placeholder="Detailed description of activities..."
                        required
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-accommodation`}>Accommodation *</Label>
                      <Input
                        id={`day-${index}-accommodation`}
                        value={day.accommodation}
                        onChange={(e) => updateDay(index, "accommodation", e.target.value)}
                        placeholder="e.g., Buhoma Lodge - Full board"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-extra`}>Extra Notes</Label>
                      <Input
                        id={`day-${index}-extra`}
                        value={day.extra}
                        onChange={(e) => updateDay(index, "extra", e.target.value)}
                        placeholder="Optional: Travel time, tips, etc."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" disabled={isLoading || !country} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Safari Itinerary"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
