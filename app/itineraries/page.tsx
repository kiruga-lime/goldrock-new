import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"
import type { Itinerary } from "@/types/itinerary"

export default async function ItinerariesPage() {
  const supabase = await createClient()

  // Fetch all itineraries
  const { data: itineraries, error } = await supabase
    .from("itineraries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching itineraries:", error)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Safari Itineraries</h1>
              <p className="text-lg text-muted-foreground">
                Explore our carefully curated collection of safari adventures across East Africa's most spectacular
                national parks and wildlife reserves. Each itinerary is designed to provide you with unforgettable
                encounters with Africa's magnificent wildlife.
              </p>
            </div>
          </div>
        </section>

        {/* Itineraries Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {itineraries && itineraries.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground">
                    All Safari Adventures ({itineraries.length})
                  </h2>
                  <Button asChild variant="outline">
                    <Link href="/add-itinerary">Add New Itinerary</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {itineraries.map((itinerary: Itinerary) => (
                    <Card
                      key={itinerary.id}
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={itinerary.image_url || "/placeholder.svg"}
                          alt={itinerary.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-foreground font-medium">
                            {itinerary.duration}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground font-medium">
                            {itinerary.country}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-1 text-white bg-black/50 px-2 py-1 rounded-md text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>{itinerary.days?.length || 0} days</span>
                          </div>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {itinerary.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="pb-4">
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                          {itinerary.summary}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{itinerary.duration}</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <Button asChild className="w-full">
                          <Link href={`/itineraries/${itinerary.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Itineraries Found</h3>
                  <p className="text-muted-foreground mb-6">
                    There are currently no safari itineraries available. Check back soon for exciting adventures!
                  </p>
                  <Button asChild>
                    <Link href="/add-itinerary">Add First Itinerary</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
