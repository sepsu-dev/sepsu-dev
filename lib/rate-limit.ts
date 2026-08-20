// In-memory rate limiter. Single-instance only; swap to Redis (upstash) when multi-instance.
const hits = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000; // 10 menit
const MAX_ATTEMPTS = 10;

export function isRateLimited(
  ip: string,
  windowMs: number = WINDOW_MS,
  maxAttempts: number = MAX_ATTEMPTS
): boolean {
  const now = Date.now();
  const prev = hits.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < windowMs);
  if (recent.length >= maxAttempts) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Sliding cleanup: hapus entry lama (percobaan gratis, batas 10rb IP)
  if (hits.size > 10_000) {
    const cutoff = now - windowMs;
    for (const [key, times] of hits) {
      const alive = times.filter((t) => now - t < cutoff);
      if (alive.length === 0) hits.delete(key);
      else hits.set(key, alive);
    }
  }
  return false;
}