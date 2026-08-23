export interface LocationInfo {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  ip: string;
}

export function extractLocationFromHeaders(request: Request, clientIp: string): LocationInfo {
  const headers = request.headers;

  // Cloudflare headers
  const cfCountry = headers.get("cf-ipcountry");
  const cfRegion = headers.get("cf-region");
  const cfCity = headers.get("cf-ipcity");

  // Vercel headers
  const vercelCountry = headers.get("x-vercel-ip-country");
  const vercelRegion = headers.get("x-vercel-ip-country-region");
  const vercelCity = headers.get("x-vercel-ip-city");

  const countryCode = cfCountry || vercelCountry || "IN"; // default or detected
  const region = cfRegion || vercelRegion || "";
  const city = cfCity ? decodeURIComponent(cfCity) : (vercelCity ? decodeURIComponent(vercelCity) : "");

  // Map common country codes to country names
  const countryNameMap: Record<string, string> = {
    IN: "India",
    US: "United States",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    DE: "Germany",
    FR: "France",
    SG: "Singapore",
    SA: "Saudi Arabia",
    QA: "Qatar",
    OM: "Oman",
    KW: "Kuwait",
    BH: "Bahrain",
    MY: "Malaysia",
    JP: "Japan",
  };

  const country = countryNameMap[countryCode.toUpperCase()] || countryCode;

  return {
    country: country || "India",
    countryCode: countryCode.toUpperCase(),
    region: region || "Kerala",
    city: city || "Kochi",
    ip: clientIp,
  };
}
