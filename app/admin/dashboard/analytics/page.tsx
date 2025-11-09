import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const [{ data: bookings }, { data: itineraries }] = await Promise.all([
    supabase.from("bookings").select("*"),
    supabase.from("itineraries").select("*"),
  ])

  // Calculate analytics
  const bookingsByStatus = {
    pending: bookings?.filter((b) => b.status === "pending").length || 0,
    confirmed: bookings?.filter((b) => b.status === "confirmed").length || 0,
    completed: bookings?.filter((b) => b.status === "completed").length || 0,
    cancelled: bookings?.filter((b) => b.status === "cancelled").length || 0,
  }

  const bookingsByCountry: Record<string, number> = {}
  itineraries?.forEach((it: any) => {
    const count = bookings?.filter((b) => b.itinerary_id === it.id).length || 0
    bookingsByCountry[it.country] = (bookingsByCountry[it.country] || 0) + count
  })

  const totalRevenue = bookings?.length || 0
  const avgBookingSize = bookings?.length
    ? Math.round(
        (bookings?.reduce((sum: number, b: any) => sum + (b.number_of_people || 0), 0) / bookings.length) * 10,
      ) / 10
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Site Analytics</h1>
        <p className="text-muted-foreground mt-2">Overview of bookings and itinerary performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{bookings?.length || 0}</p>
            <p className="text-xs text-muted-foreground mt-2">All reservations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Group Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgBookingSize}</p>
            <p className="text-xs text-muted-foreground mt-2">Travelers per booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Travelers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {bookings?.reduce((sum: number, b: any) => sum + (b.number_of_people || 0), 0) || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-2">People booked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Itineraries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{itineraries?.length || 0}</p>
            <p className="text-xs text-muted-foreground mt-2">Safari packages</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Booking Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(bookingsByStatus).map(([status, count]) => (
                <div key={status}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium capitalize">{status}</span>
                    <span className="text-sm font-bold">{count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${bookings?.length ? (count / bookings.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Bookings by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(bookingsByCountry).length > 0 ? (
                Object.entries(bookingsByCountry).map(([country, count]) => (
                  <div key={country}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{country}</span>
                      <span className="text-sm font-bold">{count} bookings</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{
                          width: `${Object.values(bookingsByCountry).reduce((a, b) => a + b, 0) ? (count / Object.values(bookingsByCountry).reduce((a, b) => a + b, 0)) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No bookings yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
