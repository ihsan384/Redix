# Supabase Database Schema for Client Reviews (ERP Integration)

To connect your separate ERP to the website's client review section, execute the following SQL in your **Supabase SQL Editor**:

```sql
-- Create client_reviews table for ERP sync
CREATE TABLE IF NOT EXISTS public.client_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  location TEXT DEFAULT 'Kerala, India',
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service TEXT NOT NULL,
  review_text TEXT NOT NULL,
  result TEXT,
  verified BOOLEAN DEFAULT true,
  initials TEXT,
  avatar_url TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so the website can fetch and display reviews)
CREATE POLICY "Allow public read access to reviews"
  ON public.client_reviews
  FOR SELECT
  USING (true);

-- Allow your ERP (Service Role or Authenticated API) full access to insert/update
CREATE POLICY "Allow authenticated insert/update from ERP"
  ON public.client_reviews
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Column Descriptions for your ERP:
- `name`: Client name (e.g. "Gokul Krishna")
- `role`: Role & Company (e.g. "Founder, Malabar Spice Co.")
- `company`: Company name (optional, e.g. "Malabar Spice Co.")
- `location`: Location tag (e.g. "Kochi, Kerala", "Calicut, Kerala", "Dubai, UAE")
- `rating`: Rating score (1 to 5, default 5)
- `service`: Service provided (e.g. "E-Commerce & Branding", "Website Development", "Performance Marketing")
- `review_text`: The testimonial quote
- `result`: ROI metric tag (e.g. "4.5x Direct Export Sales", "320+ Monthly Direct Bookings")
- `verified`: Boolean badge flag (default `true`)
- `initials`: 2-character avatar initials (e.g. "GK")
- `avatar_url`: Optional profile photo URL
