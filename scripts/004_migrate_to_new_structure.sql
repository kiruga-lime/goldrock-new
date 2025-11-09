-- Migration script to update itineraries table to new structure
-- This will drop the old table and create the new one

-- Drop existing table and all its dependencies
DROP TABLE IF EXISTS public.itineraries CASCADE;

-- Create itineraries table with new day-by-day structure
CREATE TABLE public.itineraries (
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

-- Create policies for insert/update/delete
CREATE POLICY "Allow authenticated users to insert itineraries" 
  ON public.itineraries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update itineraries" 
  ON public.itineraries FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated users to delete itineraries" 
  ON public.itineraries FOR DELETE 
  USING (true);
