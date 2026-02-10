import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import socket from "./socket";

const server = createServer(app);

const { API_HOST, API_PORT } = process.env;

server.listen(API_PORT, () => {
	console.log(`Api server is running at ${API_HOST}:${API_PORT}`);
});

socket.init(server);
