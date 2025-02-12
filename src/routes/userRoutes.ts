import { Type } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import {
	getUserProfile,
	loginUser,
	refreshTokenHandler,
	registerUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const UserSchema = {
	register: Type.Object({
		email: Type.String({ format: "email" }),
		password: Type.String({ minLength: 6 }),
	}),
	login: Type.Object({
		email: Type.String({ format: "email" }),
		password: Type.String(),
	}),
	refreshToken: Type.Object({
		refreshToken: Type.String(),
	}),
};

export default async function userRoutes(server: FastifyInstance) {
	server.post(
		"/register",
		{ schema: { body: UserSchema.register } },
		registerUser,
	);
	server.post("/login", { schema: { body: UserSchema.login } }, loginUser);
	server.post(
		"/refresh",
		{ schema: { body: UserSchema.refreshToken } },
		refreshTokenHandler,
	);
	server.get("/profile", { preHandler: authMiddleware }, getUserProfile);
}
