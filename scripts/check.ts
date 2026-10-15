import assert from "node:assert/strict";
import { randomBytes, scryptSync } from "node:crypto";
import { spawn } from "node:child_process";
import { authConfigured, createSession, verifySession, verifyPassword, SESSION_MAX_AGE } from "../lib/auth";
import { rateLimited } from "../lib/rate-limit";
import { existsSync } from "node:fs";
import PROJECTS from "../data/projects.json";
import PROFILE from "../data/profile.json";
import SETTINGS from "../data/settings.json";

assert.equal(new Set(PROJECTS.map(project => project.slug)).size, PROJECTS.length);
for (const project of PROJECTS) {
  for (const image of [project.mainImage, ...project.secondaryImages]) {
    assert(existsSync(`public${image}`), `Missing project image: ${image}`);
  }
}
const password = randomBytes(24).toString("hex");
const salt = randomBytes(16).toString("hex");
process.env.ADMIN_EMAIL = "check@example.com";
process.env.ADMIN_PASSWORD_HASH = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
process.env.ADMIN_SESSION_SECRET = randomBytes(32).toString("hex");
assert(authConfigured());
assert(verifyPassword(password));
assert(!verifyPassword("wrong"));
const now = Date.now();
const token = createSession(now);
assert(verifySession(token, now));
assert(!verifySession(token, now + SESSION_MAX_AGE * 1000));
assert(!verifySession(`${token}0`, now));
assert(!verifySession("authenticated_sepsu_token", now));
const secret = process.env.ADMIN_SESSION_SECRET;
process.env.ADMIN_SESSION_SECRET = "";
assert(!verifySession(token, now));
process.env.ADMIN_SESSION_SECRET = secret;
assert(!rateLimited("check", 1, 1000, now));
assert(rateLimited("check", 1, 1000, now));
assert(!rateLimited("check", 1, 1000, now + 1000));

const port = "3197";
const base = `http://127.0.0.1:${port}`;
const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", port], {
  env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
server.stdout.on("data", chunk => { output += chunk; });
server.stderr.on("data", chunk => { output += chunk; });
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(output);
    try {
      await fetch(`${base}/api`);
      ready = true;
      break;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  assert(ready, `Server did not start: ${output}`);
  const json = { "Content-Type": "application/json" };
  assert.deepEqual((await (await fetch(`${base}/api/profile`)).json()).data, PROFILE);
  assert.deepEqual((await (await fetch(`${base}/api/settings`)).json()).data, SETTINGS);
  const projects = await (await fetch(`${base}/api/projects?page=1&limit=100`)).json();
  assert.deepEqual(projects.data, PROJECTS);
  assert.equal(projects.pagination.total, PROJECTS.length);
  for (const project of PROJECTS) {
    assert.deepEqual((await (await fetch(`${base}/api/projects/${encodeURIComponent(project.slug)}`)).json()).data, project);
  }
  assert.equal((await fetch(`${base}/api/projects/missing-project`)).status, 404);
  const anonymousAdmin = await fetch(`${base}/admin`, { redirect: "manual" });
  if (anonymousAdmin.status === 307) {
    assert.equal(anonymousAdmin.headers.get("location"), "/login");
  } else {
    // App Router can stream a redirect after its loading boundary returns HTTP 200.
    assert.equal(anonymousAdmin.status, 200);
    assert.match(await anonymousAdmin.text(), /http-equiv="refresh"[^>]*content="[01];url=\/login"/);
  }
  assert.equal((await fetch(`${base}/api/contact`)).status, 401);
  assert.equal((await fetch(`${base}/api/settings`, { method: "PUT", headers: json, body: "{}" })).status, 405);
  for (const query of ["limit=0", "page=-1", "page=nope", "limit=101"]) {
    assert.equal((await fetch(`${base}/api/projects?${query}`)).status, 400);
  }
  const firstPage = await (await fetch(`${base}/api/projects?page=1&limit=2`)).json();
  assert.deepEqual(firstPage.data, PROJECTS.slice(0, 2));
  assert.equal(firstPage.pagination.totalPages, Math.ceil(PROJECTS.length / 2));
  for (const path of ["/", "/about", "/projects", ...PROJECTS.map(project => `/project/${project.slug}`)]) {
    assert.equal((await fetch(`${base}${path}`)).status, 200);
  }
  assert.equal((await fetch(`${base}/api/contact`, {
    method: "POST", headers: json, body: JSON.stringify({ email: {}, message: "hello" }),
  })).status, 400);
  assert.equal((await fetch(`${base}/api/contact`, {
    method: "POST", headers: json, body: JSON.stringify({ email: "sender@example.com", message: "Test message" }),
  })).status, 200);
  assert.equal((await fetch(`${base}/api/auth`, {
    method: "POST", headers: json, body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: "wrong" }),
  })).status, 401);
  const login = await fetch(`${base}/api/auth`, {
    method: "POST", headers: json, body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  assert(cookie);
  const headers = { ...json, Cookie: cookie };
  assert.equal((await fetch(`${base}/admin`, { headers, redirect: "manual" })).status, 200);
  assert.equal((await fetch(`${base}/api/contact`, { headers })).status, 200);
  assert.equal((await (await fetch(`${base}/api/contact`, { headers })).json()).data[0].message, "Test message");
  assert.equal((await fetch(`${base}/api/settings`, { method: "PUT", headers, body: "{}" })).status, 405);
  assert.equal((await fetch(`${base}/api/contact`, { headers: { Cookie: `${cookie}0` } })).status, 401);
  assert.equal((await fetch(`${base}/api/contact`, {
    method: "POST", headers: { ...json, Origin: "https://untrusted.example" }, body: "{}",
  })).status, 403);
  const logout = await fetch(`${base}/api/auth`, { method: "DELETE", headers });
  assert.equal(logout.status, 200);
  assert.match(logout.headers.get("set-cookie") || "", /admin_session=;/);
  console.log("Static JSON, session, rate limit, authorization, and API validation checks passed.");
} finally {
  server.kill();
}
