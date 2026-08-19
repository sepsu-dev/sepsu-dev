import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-check";
import { r2Client } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const ok = await requireAdmin();
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

    // Buat nama file unik dengan prefix folder
    const sanitizedFolder = folder.replace(/\/+$/, ""); // Bersihkan trailing slash
    const uniqueFilename = `${sanitizedFolder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

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
