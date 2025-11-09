-- Updated to use JSONB for better image storage flexibility
ALTER TABLE public.itineraries ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE public.itineraries ADD COLUMN IF NOT EXISTS additional_images JSONB DEFAULT '[]'::jsonb;

-- Migrate existing image_url to featured_image
UPDATE public.itineraries SET featured_image = image_url WHERE featured_image IS NULL;
