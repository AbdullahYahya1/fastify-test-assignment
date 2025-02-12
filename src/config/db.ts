import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined in environment variables");
}
const pool = mysql.createPool({ uri: databaseUrl });
export const db = drizzle(pool);
