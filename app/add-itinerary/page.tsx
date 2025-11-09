import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AddItineraryForm } from "@/components/add-itinerary-form"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default async function AddItineraryPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex-1">Add New Safari Itinerary</h1>
                <div className="flex-1 flex justify-end">
                  <form action="/api/auth/logout" method="post">
                    <Button variant="outline" size="sm" type="submit">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </form>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Create a new safari adventure for travelers to discover. Fill in all the details to showcase your unique
                itinerary.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <AddItineraryForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
