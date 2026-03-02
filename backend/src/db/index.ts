import { Pool } from "pg";
import { ENV } from "../config/env";

import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

if (!ENV.DATABASE_URL) {
  throw new Error("DB_URL is not set in environment variables");
}

// Initialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", (error) => {
  console.error("Database connection error: ", error);
});

export const db = drizzle({ client: pool, schema });
