import { Skill, SkillGroup } from "@/types/api";

// ── Dummy data ──────────────────────────────────────────────
let skills: Skill[] = [
    // frontend
    { uid: "js", name: "JavaScript", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "javascript", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "react", name: "React.js", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "react", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "vuejs", name: "Vue.js", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "vuedotjs", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "reactnative", name: "React Native", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "react", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "bootstrap", name: "Bootstrap", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "bootstrap", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "tailwind", name: "Tailwind CSS", category_uid: "frontend", category: { uid: "frontend", name: "frontend" }, icon: "tailwindcss", created_at: "2025-02-01T10:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    // backend
    { uid: "php", name: "PHP", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "php", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "laravel", name: "Laravel", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "laravel", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "codeigniter", name: "CodeIgniter", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "codeigniter", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "expressjs", name: "Express.js", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "express", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "nestjs", name: "Nest.js", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "nestjs", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "nodejs", name: "Node.js", category_uid: "backend", category: { uid: "backend", name: "backend" }, icon: "nodedotjs", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    // devops
    { uid: "cicd", name: "CI/CD", category_uid: "devops", category: { uid: "devops", name: "devops" }, icon: "githubactions", created_at: "2025-03-01T10:00:00Z", updated_at: "2025-04-10T08:00:00Z" },
    { uid: "gitlab", name: "GitLab", category_uid: "devops", category: { uid: "devops", name: "devops" }, icon: "gitlab", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "github", name: "GitHub", category_uid: "devops", category: { uid: "devops", name: "devops" }, icon: "github", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "ubuntu", name: "Ubuntu", category_uid: "devops", category: { uid: "devops", name: "devops" }, icon: "ubuntu", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "docker", name: "Docker", category_uid: "devops", category: { uid: "devops", name: "devops" }, icon: "docker", created_at: "2025-02-15T12:00:00Z", updated_at: "2025-04-01T09:00:00Z" },
    // database
    { uid: "postgresql", name: "PostgreSQL", category_uid: "database", category: { uid: "database", name: "database" }, icon: "postgresql", created_at: "2025-02-20T14:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
    { uid: "mysql", name: "MySQL", category_uid: "database", category: { uid: "database", name: "database" }, icon: "mysql", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sqlserver", name: "SQL Server", category_uid: "database", category: { uid: "database", name: "database" }, icon: "microsoftsqlserver", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "redis", name: "Redis", category_uid: "database", category: { uid: "database", name: "database" }, icon: "redis", created_at: "2025-03-05T13:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
    { uid: "mongodb", name: "MongoDB", category_uid: "database", category: { uid: "database", name: "database" }, icon: "mongodb", created_at: "2025-02-20T14:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
];

let nextUid = (): string => `sk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function buildSkillGroup(): SkillGroup {
    const groups: SkillGroup = {};
    for (const skill of skills) {
        const catName = typeof skill.category === "object" && skill.category ? skill.category.name : "uncategorized";
        if (!groups[catName]) groups[catName] = [];
        groups[catName].push({ ...skill });
    }
    return groups;
}

export const skillsService = {
    getAll: async (): Promise<SkillGroup> => {
        return buildSkillGroup();
    },
    getById: async (uid: string): Promise<Skill> => {
        const found = skills.find(s => s.uid === uid);
        if (!found) throw new Error("Skill not found");
        return { ...found };
    },
    create: async (data: Partial<Skill>): Promise<Skill> => {
        const skill: Skill = {
            uid: nextUid(),
            name: data.name || "",
            category_uid: data.category_uid || "",
            category: data.category_uid
                ? { uid: data.category_uid, name: categories.find(c => c.uid === data.category_uid)?.name || "" }
                : undefined,
            icon: data.icon || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        skills.push(skill);
        return { ...skill };
    },
    update: async (uid: string, data: Partial<Skill>): Promise<Skill> => {
        const idx = skills.findIndex(s => s.uid === uid);
        if (idx === -1) throw new Error("Skill not found");
        const old = skills[idx];
        // If category_uid changing, update the nested category object
        let category = old.category;
        if (data.category_uid && data.category_uid !== old.category_uid) {
            category = { uid: data.category_uid, name: categories.find(c => c.uid === data.category_uid)?.name || "" };
        }
        skills[idx] = { ...old, ...data, uid, category, updated_at: new Date().toISOString() };
        return { ...skills[idx] };
    },
    delete: async (uid: string): Promise<void> => {
        skills = skills.filter(s => s.uid !== uid);
    },
};

// Need access to categories for create/update. Import locally to avoid circular import issues.
// We access categories from the skill-categories service at runtime.
import { skillCategoriesService } from "./skill-categories.service";
let categories: { uid: string; name: string }[] = [];
skillCategoriesService.getAll().then(cats => { categories = cats; });