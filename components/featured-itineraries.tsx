import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"
import type { Itinerary } from "@/types/itinerary"

export async function FeaturedItineraries() {
  const supabase = await createClient()

  // Fetch 3 featured itineraries
  const { data: itineraries, error } = await supabase.from("itineraries").select("*").limit(3)

  console.log("[v0] Featured Itineraries - Error:", error)
  console.log("[v0] Featured Itineraries - Data:", itineraries)

  if (error) {
    console.error("Error fetching itineraries:", error)
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Safari Adventures</h2>
            <p className="text-muted-foreground">
              Unable to load itineraries. Please make sure the database is set up correctly.
            </p>
            <p className="text-sm text-destructive mt-2">Error: {error.message}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!itineraries || itineraries.length === 0) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Safari Adventures</h2>
            <p className="text-muted-foreground mb-6">
              No itineraries available yet. Please run the database seed scripts.
            </p>
            <Button asChild>
              <Link href="/add-itinerary">Add Your First Itinerary</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Safari Adventures</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular safari experiences, carefully crafted to showcase the best of East Africa's
            wildlife and natural beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itineraries.map((itinerary: Itinerary) => (
            <Card key={itinerary.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={itinerary.image_url || "/placeholder.svg"}
                  alt={itinerary.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {itinerary.duration}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {itinerary.country}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {itinerary.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{itinerary.summary}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{itinerary.days?.length || 0} days</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/itineraries/${itinerary.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/itineraries">View All Itineraries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
