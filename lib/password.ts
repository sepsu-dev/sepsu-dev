import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";

const SCRYPT_PREFIX = "scrypt$";

// Format: scrypt$<salt hex>$<hash hex>
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${SCRYPT_PREFIX}${salt}$${hash}`;
}

export function isScryptHash(stored: string): boolean {
  return stored.startsWith(SCRYPT_PREFIX);
}

export function verifyPassword(password: string, stored: string): boolean {
  if (isScryptHash(stored)) {
    const [, salt, hash] = stored.split("$");
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  }
  // Legacy SHA-256 (pre-refactor). Replaced in place on next successful login.
  const hash = createHash("sha256").update(password).digest("hex");
  return timingSafeEqual(Buffer.from(hash), Buffer.from(stored));
}