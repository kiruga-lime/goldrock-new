export interface ItineraryDay {
  day_number: number
  title: string
  description: string
  accommodation: string
  extra: string
}

export interface Itinerary {
  id: string
  title: string
  country: string
  duration: string
  image_url: string
  summary: string
  days: ItineraryDay[]
  created_at: string
  updated_at: string
}
