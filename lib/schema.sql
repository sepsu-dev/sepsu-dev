-- Schema CMS Sepsu Dev
-- Run: psql -h localhost -U postgres -d db_test -f lib/schema.sql

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS projects (
  uid TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  demo_url TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tech_categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tech_items (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES tech_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT ''
);

-- Migrasi: tambah kolom link bila tabel sudah ada
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url TEXT NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT NOT NULL DEFAULT '';

-- Seed settings (khusus yang bisa diedit via admin)
INSERT INTO settings (key, value) VALUES
  ('site_name', 'Sepsu Dev'),
  ('role', 'Full-stack Engineer'),
  ('bio', 'Full-stack engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.'),
  ('email', 'sepsu.dev@gmail.com'),
  ('github_url', 'https://github.com/sepsu-dev'),
  ('location', 'Jakarta, Indonesia'),
  ('hero_badge', 'portfolio.sh'),
  ('focus_1', 'Architecting robust backend services using Laravel, CodeIgniter, Express.js, and Nest.js'),
  ('focus_2', 'Crafting highly interactive user interfaces with React.js, Vue.js, and React Native'),
  ('focus_3', 'Orchestrating containerized environments with Docker, Ubuntu, GitLab, and GitHub CI/CD'),
  ('focus_4', 'Managing scalable databases using PostgreSQL, MySQL, SQL Server, Redis, and MongoDB')
ON CONFLICT (key) DO NOTHING;

-- Seed tech categories
INSERT INTO tech_categories (name, sort_order) VALUES
  ('frontend', 1),
  ('backend', 2),
  ('database', 3),
  ('devops', 4)
ON CONFLICT (name) DO NOTHING;

-- Seed tech items
INSERT INTO tech_items (category_id, name) VALUES
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'TypeScript'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'JavaScript'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'jQuery'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'React.js'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'Next.js'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'Vue.js'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'Nuxt.js'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'React Native'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'Bootstrap'),
  ((SELECT id FROM tech_categories WHERE name='frontend'), 'Tailwind CSS'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Go'),
  ((SELECT id FROM tech_categories WHERE name='backend'), '.NET Core'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Spring Boot'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'PHP'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Laravel'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'CodeIgniter'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Express.js'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Nest.js'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Node.js'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Prisma'),
  ((SELECT id FROM tech_categories WHERE name='backend'), 'Sequelize'),
  ((SELECT id FROM tech_categories WHERE name='database'), 'PostgreSQL'),
  ((SELECT id FROM tech_categories WHERE name='database'), 'MySQL'),
  ((SELECT id FROM tech_categories WHERE name='database'), 'Microsoft SQL Server'),
  ((SELECT id FROM tech_categories WHERE name='database'), 'Redis'),
  ((SELECT id FROM tech_categories WHERE name='database'), 'MongoDB'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'CI/CD'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'GitLab'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'GitHub'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'Ubuntu'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'Microsoft IIS'),
  ((SELECT id FROM tech_categories WHERE name='devops'), 'Docker')
ON CONFLICT DO NOTHING;

-- Admin default dibuat via lib/seed.ts (pakai scrypt runtime, bukan hash statis).
-- Jalankan: bun run lib/seed.ts
