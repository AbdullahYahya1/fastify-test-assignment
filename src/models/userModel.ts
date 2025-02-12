import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 500 }).unique(),
});
