-- Complete restructure for day-by-day itineraries with country support
-- Drop existing table if it exists
DROP TABLE IF EXISTS public.itineraries CASCADE;

-- Create itineraries table with new structure
CREATE TABLE IF NOT EXISTS public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  country TEXT NOT NULL, -- Kenya, Uganda, or Tanzania
  duration TEXT NOT NULL, -- e.g., "5 days / 4 nights"
  image_url TEXT NOT NULL,
  summary TEXT NOT NULL, -- Brief overview of the itinerary
  days JSONB NOT NULL, -- Array of day objects with day_number, title, description, accommodation, extra
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for viewing)
CREATE POLICY "Allow public read access to itineraries" 
  ON public.itineraries FOR SELECT 
  USING (true);

-- Create policies for insert/update/delete (can be used later for admin functionality)
CREATE POLICY "Allow authenticated users to insert itineraries" 
  ON public.itineraries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update itineraries" 
  ON public.itineraries FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated users to delete itineraries" 
  ON public.itineraries FOR DELETE 
  USING (true);
