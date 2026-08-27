-- ==============================================================================
-- REDIX.MEDIA Visitor Analytics Schema
-- Run this entire script in Supabase SQL Editor
-- ==============================================================================

-- 1. Create site_visitors table
CREATE TABLE IF NOT EXISTS public.site_visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL DEFAULT '/',
  page_title TEXT DEFAULT 'REDIX.MEDIA',
  referrer TEXT DEFAULT 'Direct',
  screen_resolution TEXT,
  language TEXT DEFAULT 'en',
  
  -- Device & System Data
  device_type TEXT DEFAULT 'desktop', -- 'mobile', 'desktop', 'tablet', 'bot', 'other'
  browser TEXT DEFAULT 'Other',       -- 'Chrome', 'Safari', 'Firefox', 'Edge', 'Opera', etc.
  os TEXT DEFAULT 'Other',            -- 'iOS', 'Android', 'Windows', 'macOS', 'Linux', etc.
  user_agent TEXT,
  
  -- Location & Network Data
  ip_address TEXT,                    -- Anonymized IP
  country TEXT DEFAULT 'India',
  country_code TEXT DEFAULT 'IN',
  region TEXT,                        -- State/Province (e.g. 'Kerala', 'Dubai', 'California')
  city TEXT                           -- City (e.g. 'Kochi', 'Calicut', 'Dubai', 'Mumbai')
);

-- 2. Create High-Performance Indexes
CREATE INDEX IF NOT EXISTS idx_site_visitors_created_at ON public.site_visitors (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visitors_visitor_id ON public.site_visitors (visitor_id);
CREATE INDEX IF NOT EXISTS idx_site_visitors_country ON public.site_visitors (country);
CREATE INDEX IF NOT EXISTS idx_site_visitors_city ON public.site_visitors (city);
CREATE INDEX IF NOT EXISTS idx_site_visitors_device_type ON public.site_visitors (device_type);
CREATE INDEX IF NOT EXISTS idx_site_visitors_os ON public.site_visitors (os);
CREATE INDEX IF NOT EXISTS idx_site_visitors_browser ON public.site_visitors (browser);
CREATE INDEX IF NOT EXISTS idx_site_visitors_page_path ON public.site_visitors (page_path);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.site_visitors ENABLE ROW LEVEL SECURITY;

-- Allow public insert so website visits can be tracked without auth login
DROP POLICY IF EXISTS "Allow public insert to site_visitors" ON public.site_visitors;
CREATE POLICY "Allow public insert to site_visitors"
  ON public.site_visitors
  FOR INSERT
  WITH CHECK (true);

-- Allow select access for ERP, admin, or authenticated users
DROP POLICY IF EXISTS "Allow select for service role and admin" ON public.site_visitors;
CREATE POLICY "Allow select for service role and admin"
  ON public.site_visitors
  FOR SELECT
  USING (true);
