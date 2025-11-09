"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Loader2, GripVertical, Upload } from "lucide-react"
import { createItinerary } from "@/app/actions/itinerary-actions"
import type { ItineraryDay } from "@/types/itinerary"

export function AddItineraryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState<string>("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
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

    if (!response.ok) {
      throw new Error("Image upload failed")
    }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const invalidDay = days.find((day) => !day.title.trim() || !day.description.trim() || !day.accommodation.trim())
      if (invalidDay) {
        setError("Please fill in all required fields for each day (title, description, and accommodation)")
        setIsLoading(false)
        return
      }

      const formData = new FormData(e.currentTarget)

      let featuredImageUrl = ""
      if (featuredImage) {
        try {
          setUploadProgress(25)
          featuredImageUrl = await uploadImage(featuredImage)
          setUploadProgress(50)
        } catch (err) {
          setError("Failed to upload featured image")
          setIsLoading(false)
          return
        }
      }

      const additionalImageUrls: string[] = []
      for (let i = 0; i < additionalImages.length; i++) {
        try {
          const url = await uploadImage(additionalImages[i])
          additionalImageUrls.push(url)
          setUploadProgress(50 + ((i + 1) / additionalImages.length) * 25)
        } catch (err) {
          setError(`Failed to upload image ${i + 1}`)
          setIsLoading(false)
          return
        }
      }

      // Add data to form
      if (featuredImageUrl) {
        formData.set("image_url", featuredImageUrl)
      }
      formData.append("additional_images", JSON.stringify(additionalImageUrls))
      formData.append("days", JSON.stringify(days))
      formData.append("country", country)

      setUploadProgress(75)

      const result = await createItinerary(formData)

      if (result.success) {
        setUploadProgress(100)
        setTimeout(() => {
          router.push("/admin/dashboard/edit-itineraries")
          router.refresh()
        }, 500)
      } else {
        setError(result.error || "Failed to create itinerary")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error creating itinerary:", err)
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create New Safari Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Itinerary Title *</Label>
            <Input
              id="title"
              name="title"
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
            <Input id="duration" name="duration" placeholder="e.g., 5 days / 4 nights" required className="text-base" />
          </div>

          {/* Featured Image Upload */}
          <div className="space-y-2 border-t pt-6">
            <Label>Featured Image (Optional)</Label>
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
            {featuredImage && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {featuredImage.name}
                  <button type="button" onClick={() => setFeaturedImage(null)} className="ml-2">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>

          {/* Additional Images Upload */}
          <div className="space-y-2">
            <Label>Additional Images - Up to 5 (Optional)</Label>
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

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Itinerary Summary *</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Brief overview of the safari experience, highlights, and what makes it special..."
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
                        placeholder="e.g., Arrival in Kampala & Transfer to Bwindi"
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
                        placeholder="Detailed description of activities, sights, and experiences for this day..."
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
                        placeholder="Optional: Travel time, special requirements, tips, etc."
                        className="text-base"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-sm text-muted-foreground">Uploading images: {uploadProgress}%</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading || !country} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Itinerary...
                </>
              ) : (
                "Create Safari Itinerary"
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
