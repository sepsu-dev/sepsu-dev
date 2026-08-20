import { hashPassword, verifyPassword, isScryptHash } from "../lib/password";
import { createHash } from "node:crypto";

// 1. Round-trip: hash + verify benar
const stored = hashPassword("admin123");
console.assert(isScryptHash(stored), "harus prefix scrypt$");
console.assert(verifyPassword("admin123", stored), "password benar harus lolos");

// 2. Password salah harus gagal
console.assert(!verifyPassword("wrong", stored), "password salah harus gagal");

// 3. Legacy SHA-256 tetap bisa diverifikasi
const legacy = createHash("sha256").update("admin123").digest("hex");
console.assert(!isScryptHash(legacy), "legacy bukan scrypt");
console.assert(verifyPassword("admin123", legacy), "legacy benar harus lolos");
console.assert(!verifyPassword("wrong", legacy), "legacy salah harus gagal");

console.log("All password tests passed.");