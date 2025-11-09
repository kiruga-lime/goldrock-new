import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, Users } from "lucide-react"

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, itinerary:itineraries(*)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Guest Bookings</h1>
        <p className="text-muted-foreground mt-2">Manage all guest reservations and bookings</p>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking: any) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.guest_name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Itinerary: {booking.itinerary?.title}</p>
                  </div>
                  <Badge className={statusColors[booking.status] || "bg-gray-100 text-gray-800"}>
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{booking.guest_email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{booking.guest_phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Travelers</p>
                      <p className="font-medium">{booking.number_of_people} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Travel Date</p>
                      <p className="font-medium">{new Date(booking.travel_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                {booking.special_requests && (
                  <div className="mt-4 p-3 bg-muted rounded">
                    <p className="text-sm font-medium text-foreground">Special Requests</p>
                    <p className="text-sm text-muted-foreground mt-1">{booking.special_requests}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No Bookings Yet</h3>
              <p className="text-muted-foreground mt-2">Guest bookings will appear here</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
