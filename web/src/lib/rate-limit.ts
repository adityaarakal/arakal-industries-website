/**
 * Rate limiting utilities
 * Simple in-memory rate limiting for API endpoints
 * For production, consider using a more robust solution like Redis
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

/**
 * Rate limit configuration
 */
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests per window
}

/**
 * Default rate limit configuration
 */
const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10, // 10 requests per 15 minutes
};

/**
 * Get client identifier from request
 */
function getClientId(request: Request): string {
  // Try to get IP address from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  // In production, you might want to use a more sophisticated method
  // to identify clients (e.g., API key, user ID, etc.)
  return ip;
}

/**
 * Check if request is within rate limit
 * Returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const clientId = getClientId(request);
  const now = Date.now();

  // Get or create client record
  let clientRecord = store[clientId];

  // If no record or window has expired, create new record
  if (!clientRecord || now > clientRecord.resetAt) {
    clientRecord = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    store[clientId] = clientRecord;
  }

  // Increment request count
  clientRecord.count += 1;

  // Check if limit exceeded
  const allowed = clientRecord.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - clientRecord.count);

  // Clean up old records (optional, to prevent memory leak)
  if (Object.keys(store).length > 10000) {
    cleanupStore(now);
  }

  return {
    allowed,
    remaining,
    resetAt: clientRecord.resetAt,
  };
}

/**
 * Clean up expired records from store
 */
function cleanupStore(now: number) {
  for (const [key, record] of Object.entries(store)) {
    if (now > record.resetAt) {
      delete store[key];
    }
  }
}

/**
 * Rate limit middleware for API routes
 */
export function rateLimit(config: RateLimitConfig = defaultConfig) {
  return (request: Request) => {
    const result = checkRateLimit(request, config);

    if (!result.allowed) {
      return {
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please try again later.",
        remaining: result.remaining,
        resetAt: new Date(result.resetAt).toISOString(),
      };
    }

    return null;
  };
}
