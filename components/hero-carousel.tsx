"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, Award, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "/african-safari-landscape-with-elephants-at-sunset.jpg",
    title: "Discover the Wild Beauty of East Africa",
    subtitle:
      "Experience unforgettable safari adventures with professional guides, luxury accommodations, and encounters with Africa's most magnificent wildlife.",
    highlight: "East Africa",
  },
  {
    image: "/hero-gorilla-trekking.jpg",
    title: "Trek with Mountain Gorillas",
    subtitle:
      "Get up close with endangered mountain gorillas in Bwindi Impenetrable Forest. A once-in-a-lifetime experience that will leave you breathless.",
    highlight: "Gorillas",
  },
  {
    image: "/hero-queen-elizabeth-lions.jpg",
    title: "Witness the Big Five",
    subtitle:
      "Explore Queen Elizabeth National Park and encounter lions, elephants, leopards, buffalo, and rhinos in their natural habitat.",
    highlight: "Big Five",
  },
  {
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/ab/2a/07/murchison-falls-view.jpg?w=1200&h=-1&s=1",
    title: "Marvel at Murchison Falls",
    subtitle:
      "Experience the power of the Nile as it thunders through a narrow gorge, creating one of the world's most spectacular waterfalls.",
    highlight: "Falls",
  },
  {
    image: "/hero-lake-mburo-zebras.jpg",
    title: "Explore Lake Mburo",
    subtitle:
      "Discover Uganda's smallest savanna park, home to zebras, impalas, and over 350 bird species in a stunning lakeside setting.",
    highlight: "Wildlife",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
              {heroSlides[currentSlide].title.split(heroSlides[currentSlide].highlight)[0]}
              <span className="text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {heroSlides[currentSlide].highlight}
              </span>
              {heroSlides[currentSlide].title.split(heroSlides[currentSlide].highlight)[1]}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
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
                Access to East Africa's most spectacular national parks and reserves
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
