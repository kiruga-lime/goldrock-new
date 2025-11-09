import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedItineraries } from "@/components/featured-itineraries"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export default function HomePage() {
  console.log("[v0] HomePage rendering")

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroCarousel />
        <Suspense fallback={<div className="py-16 text-center">Loading itineraries...</div>}>
          <FeaturedItineraries />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
