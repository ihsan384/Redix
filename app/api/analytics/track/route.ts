import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { getClientIp, sanitizeString } from "@/lib/security";
import { parseUserAgent } from "@/lib/ua-parser";
import { extractLocationFromHeaders } from "@/lib/geo";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "";
    
    // Parse user agent
    const { deviceType, browser, os } = parseUserAgent(userAgent);

    // Extract geo info from deployment headers (Vercel / Cloudflare / Proxy)
    const location = extractLocationFromHeaders(request, ip);

    // Parse body
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Beacon or empty payload fallback
    }

    const visitorId = sanitizeString(body.visitorId || body.visitor_id) || "anonymous";
    const sessionId = sanitizeString(body.sessionId || body.session_id) || "session_default";
    const pagePath = sanitizeString(body.pagePath || body.page_path || body.path || "/");
    const pageTitle = sanitizeString(body.pageTitle || body.page_title || body.title || "REDIX.MEDIA");
    const referrer = sanitizeString(body.referrer || "") || "Direct";
    const screenResolution = sanitizeString(body.screenResolution || body.screen || "");
    const language = sanitizeString(body.language || body.lang || "en");

    // Mask/Anonymize IP for privacy (e.g. 192.168.1.xxx or 2405:201:...)
    const maskedIp = ip.includes(":") 
      ? ip.split(":").slice(0, 3).join(":") + "::*" 
      : ip.split(".").slice(0, 3).join(".") + ".xxx";

    const supabase = getAdminSupabase();

    const { error } = await supabase.from("site_visitors").insert({
      visitor_id: visitorId,
      session_id: sessionId,
      page_path: pagePath,
      page_title: pageTitle,
      referrer: referrer,
      screen_resolution: screenResolution,
      language: language,
      device_type: deviceType,
      browser: browser,
      os: os,
      user_agent: userAgent.slice(0, 500),
      ip_address: maskedIp,
      country: location.country,
      country_code: location.countryCode,
      region: location.region,
      city: location.city,
    });

    if (error) {
      console.warn("Supabase site_visitors insert warning:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("Analytics track error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 200 }
    );
  }
}
