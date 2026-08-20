import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pool, execute } from "@/lib/db";
import { hashPassword } from "@/lib/password";

// Seed projects dari data landing page existing
const PROJECTS = [
  { uid: "cek-bmi-yu", title: "cekbmi.yu", description: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically.", image_url: "/projects/cek-bmi-yu.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "naha-admin", title: "naha.admin", description: "Enterprise Bootstrap 5 Dashboard Template skeleton for internal panels.", image_url: "/projects/naha-admin.jpg", demo_url: "", github_url: "", tags: ["Next.js", "Bootstrap", "Tailwind CSS"] },
  { uid: "numpux", title: "numpux", description: "Agile Workspace & Kanban Productivity Suite with collaborative mapping.", image_url: "/projects/numpux.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "kritqr", title: "krit.qr", description: "High-Performance Instant QR Code Generator client utility.", image_url: "/projects/kritqr.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"] },
  { uid: "sepsu-dev", title: "sepsu.dev", description: "Professional Engineering Portfolio & Console dashboard.", image_url: "/projects/sepsu-dev.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"] },
  { uid: "otw-sah", title: "otw.sah", description: "Interactive Digital Invitation & Guest RSVP Platform.", image_url: "/projects/otw-sah.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "titik-tanah", title: "titik.tanah", description: "Geospatial Land Plot & Geolocation Manager mapping application.", image_url: "/projects/titik-tanah.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { uid: "bootstrap-only", title: "bootstrap.only", description: "Curated Responsive UI Design Template Directory for prototype layouts.", image_url: "/projects/bootstrap-only.jpg", demo_url: "", github_url: "", tags: ["Bootstrap", "JavaScript", "HTML5", "CSS3"] },
  { uid: "lupa-servis", title: "lupa.servis", description: "Automated Vehicle Maintenance Scheduler and tracker.", image_url: "/projects/lupa-servis.jpg", demo_url: "", github_url: "", tags: ["Next.js", "Node.js", "PostgreSQL"] },
  { uid: "warung-page", title: "warung.page", description: "No-Code Landing Page Builder for MSME storefronts.", image_url: "/projects/warung-page.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { uid: "krit-cv", title: "krit.cv", description: "Automated ATS-Friendly Resume Builder layout generator.", image_url: "/projects/krit-cv.jpg", demo_url: "", github_url: "", tags: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"] },
  { uid: "skul-page", title: "skul.page", description: "Institutional Web Portal & CMS Management System.", image_url: "/projects/skul-page.jpg", demo_url: "", github_url: "", tags: ["Next.js", "Tailwind CSS"] },
  { uid: "kirim-otp-email", title: "kirimotp.email", description: "High-Availability Email OTP Microservice engine.", image_url: "/projects/kirim-otp-email.jpg", demo_url: "", github_url: "", tags: ["Node.js", "Express.js", "TypeScript", "Docker"] },
  { uid: "kirim-otp-wa", title: "kirimotp.wa", description: "WhatsApp Transactional OTP Microservice API gateway.", image_url: "/projects/kirim-otp-wa.jpg", demo_url: "", github_url: "", tags: ["Node.js", "Express.js", "TypeScript", "Docker"] },
  { uid: "hemat-yu", title: "hemat.yu", description: "Personal Ledger & Financial Health Tracker accounting web app.", image_url: "/projects/hemat-yu.jpg", demo_url: "", github_url: "", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
];

async function main() {
  console.log("Migrating schema...");
  const sql = readFileSync(join(process.cwd(), "lib", "schema.sql"), "utf8");
  await pool.query(sql);

  console.log("Seeding projects...");
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    await execute(
      `INSERT INTO projects (uid, title, description, image_url, demo_url, github_url, tags, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (uid) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         image_url = EXCLUDED.image_url,
         demo_url = EXCLUDED.demo_url,
         github_url = EXCLUDED.github_url,
         tags = EXCLUDED.tags,
         sort_order = EXCLUDED.sort_order`,
      [p.uid, p.title, p.description, p.image_url, p.demo_url, p.github_url, p.tags, i]
    );
  }

  const { rows } = await pool.query("SELECT count(*)::int AS count FROM projects");
  console.log(`Seeded ${rows[0].count} projects`);

  console.log("Seeding admin...");
  await execute(
    `INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    ["admin@sepsu.dev", hashPassword("admin123"), "Sepsu Admin"]
  );
  console.log("Admin seeded.");

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});