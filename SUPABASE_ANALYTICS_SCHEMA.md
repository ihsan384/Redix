# Supabase Database Schema & Analytics Queries for REDIX.MEDIA

Run the following SQL scripts in your **Supabase SQL Editor** (`https://supabase.com/dashboard/project/<your-project-id>/sql/new`) to enable real-time visitor tracking and reporting.

---

## 1. Create the `site_visitors` Table & Indexes

```sql
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

-- 2. Create High-Performance Indexes for Fast Reporting
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
CREATE POLICY "Allow public insert to site_visitors"
  ON public.site_visitors
  FOR INSERT
  WITH CHECK (true);

-- Allow select access for ERP, admin, or authenticated users
CREATE POLICY "Allow select for service role and admin"
  ON public.site_visitors
  FOR SELECT
  USING (true);
```

---

## 2. SQL Queries for Instant Analytics Reporting

You can execute any of the following queries directly inside your **Supabase SQL Editor**:

### 📊 Query 1: Total & Unique Visitors for 7 Days, 1 Month (30 Days), and 2 Months (60 Days)

```sql
SELECT
  -- Last 7 Days
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS pageviews_last_7_days,
  COUNT(DISTINCT visitor_id) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS unique_visitors_last_7_days,

  -- Last 30 Days (1 Month)
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS pageviews_last_1_month,
  COUNT(DISTINCT visitor_id) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS unique_visitors_last_1_month,

  -- Last 60 Days (2 Months)
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '60 days') AS pageviews_last_2_months,
  COUNT(DISTINCT visitor_id) FILTER (WHERE created_at >= NOW() - INTERVAL '60 days') AS unique_visitors_last_2_months
FROM public.site_visitors;
```

---

### 📅 Query 2: Daily Visitor Trend (Last 7 Days)

```sql
SELECT 
  DATE(created_at) AS visit_date,
  COUNT(*) AS total_pageviews,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY visit_date DESC;
```

---

### 📅 Query 3: Weekly Visitor Trend (Last 60 Days / 2 Months)

```sql
SELECT 
  DATE_TRUNC('week', created_at)::DATE AS week_start,
  COUNT(*) AS total_pageviews,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days'
GROUP BY week_start
ORDER BY week_start DESC;
```

---

### 🌍 Query 4: Location Breakdown (Top Countries & Top Cities)

```sql
-- Top Countries (Last 60 Days)
SELECT 
  country,
  country_code,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days'
GROUP BY country, country_code
ORDER BY total_visits DESC
LIMIT 10;

-- Top Cities (Last 60 Days)
SELECT 
  COALESCE(city, 'Unknown') AS city,
  country,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days' AND city IS NOT NULL
GROUP BY city, country
ORDER BY total_visits DESC
LIMIT 15;
```

---

### 📱 Query 5: Device Used Breakdown (Mobile vs Desktop vs Tablet)

```sql
SELECT 
  device_type,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days'
GROUP BY device_type
ORDER BY total_visits DESC;
```

---

### 💻 Query 6: Operating System & Browser Breakdown

```sql
-- Top Operating Systems
SELECT 
  os,
  COUNT(*) AS total_visits,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days'
GROUP BY os
ORDER BY total_visits DESC
LIMIT 10;

-- Top Browsers
SELECT 
  browser,
  COUNT(*) AS total_visits,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '60 days'
GROUP BY browser
ORDER BY total_visits DESC
LIMIT 10;
```

---

### 📄 Query 7: Most Visited Pages (Last 30 Days)

```sql
SELECT 
  page_path,
  page_title,
  COUNT(*) AS total_views,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM public.site_visitors
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY page_path, page_title
ORDER BY total_views DESC
LIMIT 10;
```

---

## 3. Real-Time API Endpoints Built in Next.js

1. **Tracking endpoint**: `POST /api/analytics/track` (Automatically invoked from all pages in background)
2. **Aggregated Stats endpoint**: `GET /api/analytics/stats` (Returns JSON overview for 7 days, 1 month, 2 months, location breakdown, and device breakdown).
