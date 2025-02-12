import type { FastifyReply, FastifyRequest } from "fastify";
import type {
	User,
	UserLoginRequest,
	UserRegisterRequest,
} from "../types/UserTypes";

import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../utils/jwtService";
import {
	createUser,
	findUserByEmail,
	findUserByRefreshToken,
	saveRefreshToken,
	validatePassword,
} from "../utils/userService";

export async function registerUser(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userRegister = request.body as UserRegisterRequest;

	if (await findUserByEmail(userRegister.email)) {
		return reply.status(400).send({ message: "Email already exists" });
	}

	try {
		await createUser(userRegister.email, userRegister.password);
		reply.send({ message: "User registered successfully" });
	} catch (error) {
		reply.status(500).send({ message: "Server error, please try again" });
	}
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
	const userLogin = request.body as UserLoginRequest;

	const user = await findUserByEmail(userLogin.email);
	if (!user) {
		return reply.status(400).send({ message: "User not found" });
	}

	if (!(await validatePassword(userLogin.password, user.password))) {
		return reply.status(401).send({ message: "Invalid credentials" });
	}

	const accessToken = generateAccessToken(userLogin.email);
	const refreshToken = generateRefreshToken(userLogin.email);
	await saveRefreshToken(userLogin.email, refreshToken);

	reply.send({ message: "Login successful", accessToken, refreshToken });
}

export async function refreshTokenHandler(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const refreshToken = request.body as { refreshToken: string };

	try {
		const decoded = verifyRefreshToken(refreshToken.refreshToken) as {
			email: string;
		};
		const user = await findUserByRefreshToken(refreshToken.refreshToken);

		if (!user) {
			return reply.status(403).send({ message: "Invalid refresh token" });
		}

		const newAccessToken = generateAccessToken(decoded.email);
		const newRefreshToken = generateRefreshToken(decoded.email);
		await saveRefreshToken(decoded.email, newRefreshToken);

		reply.send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch {
		return reply.status(403).send({ message: "Invalid refresh token" });
	}
}

export async function getUserProfile(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const user = request.user as User;

	if (!user || !user.email) {
		return reply.status(401).send({ message: "Unauthorized" });
	}

	const userData = await findUserByEmail(user.email);
	if (!userData) {
		return reply.status(404).send({ message: "User not found" });
	}

	reply.send({
		message: "Profile retrieved successfully",
		user: {
			id: userData.id,
			email: userData.email,
		},
	});
}
