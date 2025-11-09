"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Edit, Trash2 } from "lucide-react"
import { deleteItinerary } from "@/app/actions/itinerary-actions"

export default function EditItinerariesPage() {
  const [itineraries, setItineraries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItineraries = async () => {
      const supabase = await createClient()
      const { data, error } = await supabase.from("itineraries").select("*")
      if (!error && data) {
        setItineraries(data)
      }
      setIsLoading(false)
    }
    fetchItineraries()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this itinerary?")) {
      const result = await deleteItinerary(id)
      if (result.success) {
        setItineraries(itineraries.filter((it) => it.id !== id))
      } else {
        alert("Failed to delete itinerary: " + result.error)
      }
    }
  }

  return (
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
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(itinerary.id)}>
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
}
