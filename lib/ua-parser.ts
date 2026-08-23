export interface ParsedUserAgent {
  deviceType: "mobile" | "tablet" | "desktop" | "bot" | "other";
  browser: string;
  os: string;
}

export function parseUserAgent(ua: string | null | undefined): ParsedUserAgent {
  if (!ua) {
    return { deviceType: "other", browser: "Unknown", os: "Unknown" };
  }

  const uaLower = ua.toLowerCase();

  // 1. Check for Bot
  if (
    /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver/i.test(
      ua
    )
  ) {
    return { deviceType: "bot", browser: "Bot/Crawler", os: "Bot" };
  }

  // 2. Device Type
  let deviceType: "mobile" | "tablet" | "desktop" | "bot" | "other" = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = "tablet";
  } else if (/mobi|iphone|ipod|android.*mobile|blackberry|phone|opera mini/i.test(uaLower)) {
    deviceType = "mobile";
  }

  // 3. Operating System
  let os = "Other";
  if (/windows nt 10.0/i.test(ua)) os = "Windows 10/11";
  else if (/windows nt 6.3/i.test(ua)) os = "Windows 8.1";
  else if (/windows nt 6.2/i.test(ua)) os = "Windows 8";
  else if (/windows nt 6.1/i.test(ua)) os = "Windows 7";
  else if (/windows nt/i.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(ua)) {
    const match = ua.match(/OS (\d+[_.]\d+)/i);
    os = match ? `iOS ${match[1].replace("_", ".")}` : "iOS";
  } else if (/android/i.test(ua)) {
    const match = ua.match(/Android\s+([\d.]+)/i);
    os = match ? `Android ${match[1]}` : "Android";
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = "macOS";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  } else if (/cros/i.test(ua)) {
    os = "ChromeOS";
  }

  // 4. Browser
  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari";
  else if (/msie|trident/i.test(ua)) browser = "Internet Explorer";

  return { deviceType, browser, os };
}
