/**
 * Rate Limiting and Input Sanitization Utilities for REDIX.MEDIA API Routes
 */

// Simple in-memory sliding window rate-limiter
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

/**
 * Checks if a given IP address exceeds rate limit.
 * Default limit: 10 requests per 5 minutes.
 */
export function checkRateLimit(
  ip: string = "anonymous",
  limit: number = 10,
  windowMs: number = 5 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

/**
 * Helper to extract IP from Next Request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Input sanitization to prevent script injection / HTML injection
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
