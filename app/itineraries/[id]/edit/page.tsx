import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EditItineraryForm } from "@/components/edit-itinerary-form"
import { notFound } from "next/navigation"

interface EditItineraryPageProps {
  params: Promise<{ id: string }>
}

export default async function EditItineraryPage({ params }: EditItineraryPageProps) {
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
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Edit Safari Itinerary</h1>
              <p className="text-lg text-muted-foreground">
                Update the details of your safari adventure to keep the information current and accurate.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <EditItineraryForm itinerary={itinerary} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
