import { Pool } from "pg";

// Connection: localhost, postgres, password123, db_test
const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:password123@localhost:5432/db_test";

export const pool = new Pool({ connectionString });

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export async function execute(
  text: string,
  params?: any[]
): Promise<{ rowCount: number | null }> {
  const result = await pool.query(text, params);
  return { rowCount: result.rowCount };
}