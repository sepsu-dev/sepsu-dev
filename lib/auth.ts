import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24;

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function authConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && sessionSecret());
}

export function verifyPassword(password: string) {
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH || "").split(":");
  if (!salt || !/^[a-f0-9]{128}$/i.test(hash || "")) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, "hex"));
}

export function createSession(now = Date.now()) {
  const secret = sessionSecret();
  if (!secret) throw new Error("Admin session secret is not configured");
  const payload = `${now + SESSION_MAX_AGE * 1000}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("hex")}`;
}

export function verifySession(token: string | undefined, now = Date.now()) {
  const secret = sessionSecret();
  if (!authConfigured() || !secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  if (!/^\d+$/.test(expires) || !/^[a-f0-9]{32}$/.test(nonce) || !/^[a-f0-9]{64}$/.test(signature)) return false;
  const expiry = Number(expires);
  if (!Number.isSafeInteger(expiry) || expiry <= now || expiry > now + SESSION_MAX_AGE * 1000) return false;
  const expected = createHmac("sha256", secret).update(`${expires}.${nonce}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

export function isSameOrigin(request: Request) {
  // Non-browser clients may omit Origin; browser mutations must match request origin.
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
