import { pool, execute } from "../lib/db.ts";

const CATEGORIES = [
  { name: "frontend", icon: "Layout", sort_order: 1 },
  { name: "backend", icon: "Server", sort_order: 2 },
  { name: "database", icon: "Database", sort_order: 3 },
  { name: "devops", icon: "GitBranch", sort_order: 4 }
];

const ITEMS = [
  // Frontend
  { category: "frontend", name: "TypeScript", icon: "typescript" },
  { category: "frontend", name: "JavaScript", icon: "javascript" },
  { category: "frontend", name: "jQuery", icon: "jquery" },
  { category: "frontend", name: "React.js", icon: "react" },
  { category: "frontend", name: "Next.js", icon: "nextjs" },
  { category: "frontend", name: "Vue.js", icon: "vue" },
  { category: "frontend", name: "Nuxt.js", icon: "nuxt" },
  { category: "frontend", name: "React Native", icon: "react" },
  { category: "frontend", name: "Bootstrap", icon: "bootstrap" },
  { category: "frontend", name: "Tailwind CSS", icon: "tailwindcss" },

  // Backend
  { category: "backend", name: "Go", icon: "go" },
  { category: "backend", name: ".NET Core", icon: "dotnet" },
  { category: "backend", name: "Spring Boot", icon: "springboot" },
  { category: "backend", name: "PHP", icon: "php" },
  { category: "backend", name: "Laravel", icon: "laravel" },
  { category: "backend", name: "CodeIgniter", icon: "codeigniter" },
  { category: "backend", name: "Express.js", icon: "express" },
  { category: "backend", name: "Nest.js", icon: "nestjs" },
  { category: "backend", name: "Node.js", icon: "nodejs" },
  { category: "backend", name: "Prisma", icon: "prisma" },
  { category: "backend", name: "Sequelize", icon: "sequelize" },

  // Database
  { category: "database", name: "PostgreSQL", icon: "postgresql" },
  { category: "database", name: "MySQL", icon: "mysql" },
  { category: "database", name: "Microsoft SQL Server", icon: "sql-server" },
  { category: "database", name: "Redis", icon: "redis" },
  { category: "database", name: "MongoDB", icon: "mongodb" },

  // DevOps
  { category: "devops", name: "CI/CD", icon: "git" },
  { category: "devops", name: "GitLab", icon: "gitlab" },
  { category: "devops", name: "GitHub", icon: "github" },
  { category: "devops", name: "Ubuntu", icon: "ubuntu" },
  { category: "devops", name: "Microsoft IIS", icon: "server" },
  { category: "devops", name: "Docker", icon: "docker" }
];

async function seedTech() {
  console.log("Cleaning old categories & items...");
  await execute("DELETE FROM tech_items");
  await execute("DELETE FROM tech_categories");

  console.log("Seeding tech categories...");
  const catMap = new Map();
  for (const cat of CATEGORIES) {
    const res = await pool.query(
      "INSERT INTO tech_categories (name, icon, sort_order) VALUES ($1, $2, $3) RETURNING id",
      [cat.name, cat.icon, cat.sort_order]
    );
    catMap.set(cat.name, res.rows[0].id);
  }

  console.log("Seeding tech items...");
  for (const item of ITEMS) {
    const category_id = catMap.get(item.category);
    if (category_id) {
      await execute(
        "INSERT INTO tech_items (category_id, name, icon) VALUES ($1, $2, $3)",
        [category_id, item.name, item.icon]
      );
    }
  }

  console.log("Tech stack seeding completed successfully!");
}

seedTech()
  .catch(console.error)
  .finally(() => pool.end());
