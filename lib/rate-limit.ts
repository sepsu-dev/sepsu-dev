const attempts = new Map<string, { count: number; reset: number }>();

// ponytail: per-process limit only; use shared ingress limits for multiple replicas.
export function rateLimited(key: string, limit: number, windowMs: number, now = Date.now()) {
  for (const [entry, value] of attempts) {
    if (value.reset <= now) attempts.delete(entry);
  }
  const current = attempts.get(key);
  if (current) return ++current.count > limit;
  if (attempts.size >= 10_000) return true;
  attempts.set(key, { count: 1, reset: now + windowMs });
  return false;
}
