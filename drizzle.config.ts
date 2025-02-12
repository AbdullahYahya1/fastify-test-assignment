import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined in environment variables");
}

export default defineConfig({
	out: "./drizzle",
	schema: "./src/models/*",
	dialect: "mysql",
	dbCredentials: {
		url: databaseUrl,
	},
});
