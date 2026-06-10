export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Skill {
    uid: string;
    name: string;
    category_uid?: string;
    category?: { uid: string; name: string } | string;
    icon?: string;
    created_at?: string;
    updated_at?: string;
}

export interface SkillGroup {
    [category: string]: Skill[];
}

export interface Project {
    uid: string;
    title: string;
    subtitle?: string;
    overview: string;
    architecture?: string;
    demo_url?: string;
    source_url?: string;
    image_url?: string;
    is_public?: boolean;
    skills?: Skill[];
    created_at?: string;
    updated_at?: string;
}

export interface Profile {
    uid: string;
    name: string;
    email: string;
    title?: string;
    location?: string;
    bio?: string;
    image_url?: string;
    github_url?: string;
    focus?: string[];
}

export interface AuthResponse {
    token: string;
    profile: {
        uid: string;
        name: string;
        email: string;
    };
}
