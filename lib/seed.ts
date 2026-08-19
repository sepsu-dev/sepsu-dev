import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pool, execute } from "@/lib/db";

// Seed projects dari data landing page existing
const PROJECTS = [
  { uid: "cek-bmi-yu", title: "cekbmi.yu", description: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically.", image_url: "/projects/cek-bmi-yu.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "naha-admin", title: "naha.admin", description: "Enterprise Bootstrap 5 Dashboard Template skeleton for internal panels.", image_url: "/projects/naha-admin.jpg", tags: ["Next.js", "Bootstrap", "Tailwind CSS"] },
  { uid: "numpux", title: "numpux", description: "Agile Workspace & Kanban Productivity Suite with collaborative mapping.", image_url: "/projects/numpux.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "kritqr", title: "krit.qr", description: "High-Performance Instant QR Code Generator client utility.", image_url: "/projects/kritqr.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"] },
  { uid: "sepsu-dev", title: "sepsu.dev", description: "Professional Engineering Portfolio & Console dashboard.", image_url: "/projects/sepsu-dev.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"] },
  { uid: "otw-sah", title: "otw.sah", description: "Interactive Digital Invitation & Guest RSVP Platform.", image_url: "/projects/otw-sah.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "titik-tanah", title: "titik.tanah", description: "Geospatial Land Plot & Geolocation Manager mapping application.", image_url: "/projects/titik-tanah.jpg", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { uid: "bootstrap-only", title: "bootstrap.only", description: "Curated Responsive UI Design Template Directory for prototype layouts.", image_url: "/projects/bootstrap-only.jpg", tags: ["Bootstrap", "JavaScript", "HTML5", "CSS3"] },
  { uid: "lupa-servis", title: "lupa.servis", description: "Automated Vehicle Maintenance Scheduler and tracker.", image_url: "/projects/lupa-servis.jpg", tags: ["Next.js", "Node.js", "PostgreSQL"] },
  { uid: "warung-page", title: "warung.page", description: "No-Code Landing Page Builder for MSME storefronts.", image_url: "/projects/warung-page.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "krit-cv", title: "krit.cv", description: "Automated ATS-Friendly Resume Builder layout generator.", image_url: "/projects/krit-cv.jpg", tags: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"] },
  { uid: "skul-page", title: "skul.page", description: "Institutional Web Portal & CMS Management System.", image_url: "/projects/skul-page.jpg", tags: ["Next.js", "Tailwind CSS"] },
  { uid: "kirim-otp-email", title: "kirimotp.email", description: "High-Availability Email OTP Microservice engine.", image_url: "/projects/kirim-otp-email.jpg", tags: ["Node.js", "Express.js", "TypeScript", "Docker"] },
  { uid: "kirim-otp-wa", title: "kirimotp.wa", description: "WhatsApp Transactional OTP Microservice API gateway.", image_url: "/projects/kirim-otp-wa.jpg", tags: ["Node.js", "Express.js", "TypeScript", "Docker"] },
  { uid: "hemat-yu", title: "hemat.yu", description: "Personal Ledger & Financial Health Tracker accounting web app.", image_url: "/projects/hemat-yu.jpg", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
];

async function main() {
  console.log("Migrating schema...");
  const sql = readFileSync(join(process.cwd(), "lib", "schema.sql"), "utf8");
  await pool.query(sql);

  console.log("Seeding projects...");
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    await execute(
      `INSERT INTO projects (uid, title, description, image_url, tags, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (uid) DO NOTHING`,
      [p.uid, p.title, p.description, p.image_url, p.tags, i]
    );
  }

  console.log("Done. Admin login: admin@sepsu.dev / admin123");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});