import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, Award } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/african-safari-landscape-with-elephants-at-sunset.jpg"
          alt="Safari landscape with elephants at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
              Discover the Wild Beauty of{" "}
              <span className="text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Uganda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Experience unforgettable safari adventures with professional guides, luxury accommodations, and encounters
              with Africa's most magnificent wildlife.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-200">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Link href="/itineraries">
                Explore Itineraries <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
            >
              <Link href="/contact">Plan Your Safari</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="flex flex-col items-center text-white group">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guides</h3>
              <p className="text-white/80 text-sm text-center leading-relaxed">
                Professional local guides with deep knowledge of wildlife and culture
              </p>
            </div>
            <div className="flex flex-col items-center text-white group">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Prime Locations</h3>
              <p className="text-white/80 text-sm text-center leading-relaxed">
                Access to Uganda's most spectacular national parks and reserves
              </p>
            </div>
            <div className="flex flex-col items-center text-white group">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Luxury Comfort</h3>
              <p className="text-white/80 text-sm text-center leading-relaxed">
                Premium lodges and camps for the ultimate safari experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
