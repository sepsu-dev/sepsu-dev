## Local development

Requires Node.js 20.9+ and Bun. Bun is used by the Docker build.

```sh
bun install --frozen-lockfile
bun run dev
```

## Admin configuration

Copy `.env.example` to `.env`. Login stays disabled until all admin variables are set.
Generate a password hash without putting the password in shell history:

```sh
bun -e 'const {randomBytes,scryptSync}=require("node:crypto"); const password=prompt("Admin password (visible input):"); if(!password || password.length<16) throw new Error("Use at least 16 characters"); const salt=randomBytes(16).toString("hex"); console.log("ADMIN_PASSWORD_HASH="+salt+":"+scryptSync(password,salt,64).toString("hex")); console.log("ADMIN_SESSION_SECRET="+randomBytes(32).toString("hex"));'
```

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET` in `.env`.
Never commit secrets. Production requires HTTPS because session cookies are secure.
Sessions expire after 24 hours; rotate the session secret to invalidate all sessions.
Logout clears the browser cookie; individual stolen sessions cannot be revoked before expiry.
Login and contact limits are process-wide (10 and 20 requests per minute). Use trusted
ingress rate limiting for distributed deployment and per-client limits.

## Validation

```sh
bun run typecheck
bun run build
bun run check
```

`check` starts the production server on port 3197 with temporary test credentials.

## Static portfolio content

Edit `data/projects.json`, `data/profile.json`, and `data/settings.json`, then rebuild
and redeploy. Public APIs, server-rendered pages, and client defaults use these same
JSON files. Project pagination and slug lookup remain available. Portfolio APIs are
read-only; the admin page no longer contains content editors.

Contact messages remain in process memory and disappear on restart; replicas do not
share them. Do not rely on the contact form for real deliveries yet.
Container secrets must be supplied at runtime, not copied into the image.

## Code layout

- `app/`: routes, page-specific components, and API handlers/queries.
- `components/`: shared UI; both canvases share zoom controls, but keep drag state local.
- `data/`: static JSON for projects, profile, and settings; safe to import on the client.
- `types/`: shared TypeScript contracts; no runtime data.
- `stores/`: client state and API calls; no imports from server query modules.
- `lib/`: server authentication, rate limiting, and response helpers.
- `scripts/check.ts`: assert-based static JSON, authentication, and API checks.

Type checking also rejects unused imports, locals, and parameters.

<!-- Title -->
<h3 align="center">
        <samp>&gt; Hey There!, I am
                <b><a target="_blank" href="https://sepsu.dev">Sepsu Dev</a></b>
        </samp>
</h3>
<br>

<p align="center">
        <!-- Intro -->
        <samp>
                「 I'm a software developer from <b>Jakarta, <img src="https://flagcdn.com/16x12/id.png" width="16" height="12" alt="Indonesia" /></b> 」
                <br>
                「 Focused on creating impactful web applications that improve lives 」
                <br>
                <br>
        </samp>
        <!-- Technologies -->
        <!-- JavaScript -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="JavaScript"
                        src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white">
        </a>
        <!-- TypeScript -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="TypeScript"
                        src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=TypeScript&logoColor=white">
        </a>
        <!-- React -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="React"
                        src="https://img.shields.io/badge/-React-02cdf1?style=flat-square&logo=React&logoColor=white">
        </a>
        <!-- NextJS -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="NextJS"
                        src="https://img.shields.io/badge/-NextJS-white?style=flat-square&logo=Next.js&logoColor=black">
        </a>
        <!-- TailwindCSS -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="TailwindCSS"
                        src="https://img.shields.io/badge/-TailwindCSS-10172a?style=flat-square&logo=Tailwindcss&logoColor=37bcf8">
        </a>
        <!-- Node.js -->
        <a href="https://github.com/sepsu-dev?tab=repositories" target="_blank"><img alt="Node.js"
                        src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white">
        </a>
</p>

<br>
