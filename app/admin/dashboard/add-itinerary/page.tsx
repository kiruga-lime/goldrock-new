import { AddItineraryForm } from "@/components/add-itinerary-form"

export default function AddItineraryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Safari Itinerary</h1>
        <p className="text-muted-foreground mt-2">Create a new safari adventure for travelers to discover</p>
      </div>
      <AddItineraryForm />
    </div>
  )
}
