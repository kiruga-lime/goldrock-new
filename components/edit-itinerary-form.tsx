"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Loader2, GripVertical } from "lucide-react"
import { updateItinerary } from "@/app/actions/itinerary-actions"
import { DeleteItineraryButton } from "@/components/delete-itinerary-button"
import type { Itinerary, ItineraryDay } from "@/types/itinerary"

interface EditItineraryFormProps {
  itinerary: Itinerary
}

export function EditItineraryForm({ itinerary }: EditItineraryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState<string>(itinerary.country)
  const [days, setDays] = useState<ItineraryDay[]>(itinerary.days || [])

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

  const updateDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const newDays = [...days]
    newDays[index] = { ...newDays[index], [field]: value }
    setDays(newDays)
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const invalidDay = days.find((day) => !day.title.trim() || !day.description.trim() || !day.accommodation.trim())
      if (invalidDay) {
        setError("Please fill in all required fields for each day")
        setIsLoading(false)
        return
      }

      formData.append("days", JSON.stringify(days))
      formData.append("country", country)

      const result = await updateItinerary(itinerary.id, formData)

      if (result.success) {
        router.push(`/itineraries/${itinerary.id}`)
        router.refresh()
      } else {
        setError(result.error || "Failed to update itinerary")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error updating itinerary:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">Edit Safari Itinerary</CardTitle>
          <DeleteItineraryButton itineraryId={itinerary.id} itineraryTitle={itinerary.title} />
        </div>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Itinerary Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={itinerary.title}
              placeholder="e.g., Bwindi Gorilla Trekking & Queen Elizabeth Safari"
              required
              className="text-base"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select value={country} onValueChange={setCountry} required>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uganda">Uganda</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
                <SelectItem value="Tanzania">Tanzania</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Input
              id="duration"
              name="duration"
              defaultValue={itinerary.duration}
              placeholder="e.g., 5 days / 4 nights"
              required
              className="text-base"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              defaultValue={itinerary.image_url}
              placeholder="https://example.com/safari-image.jpg"
              className="text-base"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Itinerary Summary *</Label>
            <Textarea
              id="summary"
              name="summary"
              defaultValue={itinerary.summary}
              placeholder="Brief overview of the safari experience..."
              required
              rows={3}
              className="text-base resize-none"
            />
          </div>

          {/* Days Section */}
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
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">Day {day.day_number}</CardTitle>
                      </div>
                      {days.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeDay(index)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
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
                        placeholder="e.g., Arrival in Kampala"
                        required
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-description`}>Description *</Label>
                      <Textarea
                        id={`day-${index}-description`}
                        value={day.description}
                        onChange={(e) => updateDay(index, "description", e.target.value)}
                        placeholder="Detailed description..."
                        required
                        rows={4}
                        className="text-base resize-none"
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
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${index}-extra`}>Extra Notes</Label>
                      <Input
                        id={`day-${index}-extra`}
                        value={day.extra}
                        onChange={(e) => updateDay(index, "extra", e.target.value)}
                        placeholder="Optional notes..."
                        className="text-base"
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading || !country || days.length === 0} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Safari Itinerary"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
