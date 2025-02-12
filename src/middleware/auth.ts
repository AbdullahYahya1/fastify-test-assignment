import type { FastifyReply, FastifyRequest } from "fastify";
import type { User } from "../types/UserTypes";

export const authMiddleware = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const decoded = await request.jwtVerify();
		request.user = decoded as User;
	} catch (err) {
		reply.status(401).send({ message: "Unauthorized" });
	}
};
