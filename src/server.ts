import jwt from "@fastify/jwt";
import Fastify from "fastify";
import userRoutes from "./routes/userRoutes";
import "dotenv/config";

const server = Fastify({ logger: true });
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
if (!accessTokenSecret) {
	throw new Error(
		"ACCESS_TOKEN_SECRET is not defined in environment variables",
	);
}

server.register(jwt, { secret: accessTokenSecret });
server.register(userRoutes);

const start = async () => {
	try {
		await server.listen({ port: Number(process.env.PORT) || 3000 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
