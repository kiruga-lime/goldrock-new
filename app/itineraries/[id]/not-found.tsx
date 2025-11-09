import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Safari Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The safari itinerary you're looking for doesn't exist or may have been removed.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/itineraries">View All Safaris</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
