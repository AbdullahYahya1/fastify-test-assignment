import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { users } from "../models/userModel";
import type { User } from "../types/UserTypes";

export async function findUserByEmail(email: string): Promise<User | null> {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);
	return user.length ? user[0] : null;
}

export async function createUser(
	email: string,
	password: string,
): Promise<void> {
	const hashedPassword = await bcrypt.hash(password, 10);
	await db.insert(users).values({ email, password: hashedPassword });
}

export async function validatePassword(
	enteredPassword: string,
	storedPassword: string,
): Promise<boolean> {
	return bcrypt.compare(enteredPassword, storedPassword);
}

export async function saveRefreshToken(email: string, refreshToken: string) {
	await db.update(users).set({ refreshToken }).where(eq(users.email, email));
}

export async function findUserByRefreshToken(
	refreshToken: string,
): Promise<User | null> {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.refreshToken, refreshToken))
		.limit(1);
	return user.length ? user[0] : null;
}
