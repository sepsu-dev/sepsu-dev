import { pool } from "../lib/db.ts";

async function check() {
  try {
    const res = await pool.query(`
      SELECT rolname, rolsuper, rolcreatedb FROM pg_roles WHERE rolname = 'root';
    `);
    console.log("Role info:", res.rows[0]);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

check();
