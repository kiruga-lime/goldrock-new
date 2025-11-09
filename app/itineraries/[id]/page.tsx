import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Clock, ArrowLeft, Calendar, Users, Award, Edit } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ItineraryDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ItineraryDetailPage({ params }: ItineraryDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch specific itinerary
  const { data: itinerary, error } = await supabase.from("itineraries").select("*").eq("id", id).single()

  if (error || !itinerary) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={itinerary.image_url || "/placeholder.svg"}
            alt={itinerary.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-4xl">
                <div className="flex gap-3 mb-6">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Link href="/itineraries">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Itineraries
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Link href={`/itineraries/${id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {itinerary.duration}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {itinerary.country}
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                    {itinerary.days?.length || 0} Days
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{itinerary.title}</h1>

                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-lg">{itinerary.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Summary */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">About This Safari</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{itinerary.summary}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-6">
                    {itinerary.days?.map((day: any, index: number) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-primary-foreground font-bold">{day.day_number}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">{day.title}</h3>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">{day.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Accommodation</p>
                              <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                            </div>
                            {day.extra && (
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-1">Extra Notes</p>
                                <p className="text-sm text-muted-foreground">{day.extra}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* What's Included */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Professional Safari Guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Accommodation as Listed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Transportation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Park Entry Fees</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-foreground">Book This Safari</h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{itinerary.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Country:</span>
                        <span className="font-medium">{itinerary.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Days:</span>
                        <span className="font-medium">{itinerary.days?.length || 0} days</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <Link href="/contact">Request Quote</Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                      Get in touch for custom quotes and group bookings
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
