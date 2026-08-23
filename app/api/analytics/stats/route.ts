import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getAdminSupabase();

    const now = new Date();
    const date7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const date30DaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const date60DaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString();

    // Query 60 days of data (covers 7d, 30d, 60d)
    const { data: visitors, error } = await supabase
      .from("site_visitors")
      .select("id, visitor_id, session_id, created_at, country, city, device_type, os, browser, page_path")
      .gte("created_at", date60DaysAgo)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const allVisits = visitors || [];

    // Filter counts
    const visits7d = allVisits.filter((v) => v.created_at >= date7DaysAgo);
    const visits30d = allVisits.filter((v) => v.created_at >= date30DaysAgo);
    const visits60d = allVisits;

    const getUniqueVisitors = (list: any[]) => new Set(list.map((v) => v.visitor_id)).size;

    // Aggregations for Location (Country & City)
    const locationCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const topPages: Record<string, number> = {};

    visits60d.forEach((v) => {
      // Countries
      const country = v.country || "Unknown";
      locationCounts[country] = (locationCounts[country] || 0) + 1;

      // Cities
      if (v.city && v.city !== "Unknown") {
        const cityKey = `${v.city}, ${v.country || ""}`.trim();
        cityCounts[cityKey] = (cityCounts[cityKey] || 0) + 1;
      }

      // Device Type
      const device = v.device_type || "desktop";
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;

      // OS
      const os = v.os || "Other";
      osCounts[os] = (osCounts[os] || 0) + 1;

      // Browser
      const browser = v.browser || "Other";
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;

      // Pages
      const page = v.page_path || "/";
      topPages[page] = (topPages[page] || 0) + 1;
    });

    const formatTopEntries = (record: Record<string, number>) =>
      Object.entries(record)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      generated_at: now.toISOString(),
      overview: {
        last_7_days: {
          total_pageviews: visits7d.length,
          unique_visitors: getUniqueVisitors(visits7d),
        },
        last_30_days_1_month: {
          total_pageviews: visits30d.length,
          unique_visitors: getUniqueVisitors(visits30d),
        },
        last_60_days_2_months: {
          total_pageviews: visits60d.length,
          unique_visitors: getUniqueVisitors(visits60d),
        },
      },
      breakdowns: {
        top_countries: formatTopEntries(locationCounts),
        top_cities: formatTopEntries(cityCounts).slice(0, 15),
        device_types: formatTopEntries(deviceCounts),
        operating_systems: formatTopEntries(osCounts),
        browsers: formatTopEntries(browserCounts),
        top_pages: formatTopEntries(topPages).slice(0, 10),
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
