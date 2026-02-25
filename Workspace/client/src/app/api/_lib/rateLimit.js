const buckets = new Map();

function normalizeIp(ip) {
  if (!ip) return "unknown";
  return String(ip).split(",")[0].trim() || "unknown";
}

export function getClientIp(request) {
  return normalizeIp(
    request.headers.get("x-forwarded-for")
      || request.headers.get("x-real-ip")
      || "unknown"
  );
}

export function checkRateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}