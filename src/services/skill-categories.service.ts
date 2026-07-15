export interface SkillCategory {
    uid: string;
    name: string;
    icon: string;
    created_at?: string;
    updated_at?: string;
}

// ── Dummy data ──────────────────────────────────────────────
let categories: SkillCategory[] = [
    { uid: "frontend", name: "frontend", icon: "🎨", created_at: "2025-01-10T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "backend", name: "backend", icon: "⚙️", created_at: "2025-01-10T08:00:00Z", updated_at: "2025-03-01T10:00:00Z" },
    { uid: "devops", name: "devops", icon: "🚀", created_at: "2025-02-15T12:00:00Z", updated_at: "2025-04-01T09:00:00Z" },
    { uid: "database", name: "database", icon: "🗄️", created_at: "2025-02-20T14:00:00Z", updated_at: "2025-04-05T11:00:00Z" },
];

let nextUid = (): string => `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const skillCategoriesService = {
    getAll: async (): Promise<SkillCategory[]> => {
        return [...categories];
    },
    create: async (data: Partial<SkillCategory>): Promise<SkillCategory> => {
        const cat: SkillCategory = {
            uid: nextUid(),
            name: data.name || "",
            icon: data.icon || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        categories.push(cat);
        return { ...cat };
    },
    update: async (uid: string, data: Partial<SkillCategory>): Promise<SkillCategory> => {
        const idx = categories.findIndex(c => c.uid === uid);
        if (idx === -1) throw new Error("Category not found");
        categories[idx] = { ...categories[idx], ...data, uid, updated_at: new Date().toISOString() };
        return { ...categories[idx] };
    },
    delete: async (uid: string): Promise<void> => {
        categories = categories.filter(c => c.uid !== uid);
    },
};