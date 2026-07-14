import { Skill, SkillGroup } from "@/types/api";

// ── Dummy data ──────────────────────────────────────────────
let skills: Skill[] = [
    // frontend (cat-001)
    { uid: "sk-001", name: "React", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "⚛️", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-002", name: "Next.js", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "▲", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-003", name: "TypeScript", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "💎", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-004", name: "Tailwind CSS", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "🎨", created_at: "2025-02-01T10:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-006", name: "React Native", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "📱", created_at: "2025-01-20T09:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-008", name: "Flutter", category_uid: "cat-001", category: { uid: "cat-001", name: "frontend" }, icon: "🦋", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    // backend (cat-002)
    { uid: "sk-005", name: "Node.js", category_uid: "cat-002", category: { uid: "cat-002", name: "backend" }, icon: "🟢", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "sk-007", name: "Go", category_uid: "cat-002", category: { uid: "cat-002", name: "backend" }, icon: "🐹", created_at: "2025-02-10T11:00:00Z", updated_at: "2025-04-01T09:00:00Z" },
    // devops (cat-003) — only Docker & CI/CD
    { uid: "sk-009", name: "Docker", category_uid: "cat-003", category: { uid: "cat-003", name: "devops" }, icon: "🐳", created_at: "2025-02-15T12:00:00Z", updated_at: "2025-04-01T09:00:00Z" },
    { uid: "sk-011", name: "CI/CD", category_uid: "cat-003", category: { uid: "cat-003", name: "devops" }, icon: "🔄", created_at: "2025-03-01T10:00:00Z", updated_at: "2025-04-10T08:00:00Z" },
    // database (cat-004)
    { uid: "sk-012", name: "PostgreSQL", category_uid: "cat-004", category: { uid: "cat-004", name: "database" }, icon: "🐘", created_at: "2025-02-20T14:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
    { uid: "sk-013", name: "MongoDB", category_uid: "cat-004", category: { uid: "cat-004", name: "database" }, icon: "🍃", created_at: "2025-02-20T14:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
    { uid: "sk-014", name: "Redis", category_uid: "cat-004", category: { uid: "cat-004", name: "database" }, icon: "🔴", created_at: "2025-03-05T13:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
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