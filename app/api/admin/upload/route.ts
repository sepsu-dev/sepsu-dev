import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth-check";
import { r2Client } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const ALLOWED_FOLDERS = new Set(["uploads", "projects", "tech"]);
const BLOCKED_TYPES = [
  "text/html",
  "application/xhtml+xml",
  "application/xml",
  "application/javascript",
  "text/javascript",
  "image/svg+xml",
  "font/woff",
  "font/woff2",
  "font/ttf",
  "font/otf",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = String(formData.get("folder") || "uploads").trim();

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "Folder tidak diizinkan" }, { status: 400 });
    }

    if (BLOCKED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak diizinkan" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Ukuran file melebihi 10 MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let uploadBuffer = buffer;
    let fileExtension = file.name.split(".").pop() || "";
    let contentType = file.type;

    // Kompresi jika file adalah gambar (kecuali SVG / GIF)
    if (file.type.startsWith("image/") && !file.type.includes("svg") && !file.type.includes("gif")) {
      try {
        const sharp = (await import("sharp")).default;
        uploadBuffer = await sharp(buffer)
          .resize({ width: 1600, withoutEnlargement: true }) // Batasi lebar maksimum 1600px
          .webp({ quality: 80 }) // Kompresi ke format WebP kualitas 80%
          .toBuffer();
        fileExtension = "webp";
        contentType = "image/webp";
      } catch (err) {
        console.error("Gagal kompresi gambar dengan sharp, menggunakan file asli:", err);
      }
    }

    // Buat nama file unik dengan prefix folder (folder sudah di-whitelist, aman)
    const uniqueFilename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

    const bucketName = process.env.R2_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("R2_BUCKET_NAME environment variable belum dikonfigurasi");
    }

    // Upload ke Cloudflare R2
    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFilename,
        Body: uploadBuffer,
        ContentType: contentType,
      })
    );

    // Dapatkan URL publik dari R2 (Gunakan public custom domain atau R2 public dev domain)
    const publicDomain = process.env.R2_PUBLIC_DOMAIN || `https://${bucketName}.r2.dev`;
    const imageUrl = `${publicDomain.replace(/\/$/, "")}/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error: any) {
    console.error("R2 Upload Error:", error);
    return NextResponse.json({ error: error.message || "Gagal mengunggah file ke R2" }, { status: 500 });
  }
}