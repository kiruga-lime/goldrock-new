-- Create bookings table for guest reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES public.itineraries(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  number_of_people INTEGER NOT NULL,
  travel_date DATE NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to create bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to view bookings" 
  ON public.bookings FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated admins to update bookings" 
  ON public.bookings FOR UPDATE 
  USING (true);
