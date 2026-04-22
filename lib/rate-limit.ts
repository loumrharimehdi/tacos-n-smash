// Lightweight in-memory sliding-window rate limiter.
// Works per function instance; Fluid Compute reuse makes this effective
// enough for a small restaurant site. For stronger guarantees, swap in
// Upstash Ratelimit later.

const hits = new Map<string, number[]>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60_000,
): RateLimitResult {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    hits.set(key, arr);
    const oldest = arr[0];
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((windowMs - (now - oldest)) / 1000),
    };
  }
  arr.push(now);
  hits.set(key, arr);
  return { ok: true, remaining: limit - arr.length, retryAfterSec: 0 };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
