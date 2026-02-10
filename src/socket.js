import { Server } from "socket.io";
import * as channel from "./redis/channel";
import subscriber from "./redis/subscriber";
import * as events from "./socket/event";
import * as room from "./socket/room";

let io;

const init = server => {
	io = new Server(server, {
		transports: ["websocket"]
	});

	io.on("connection", socket => {
		socket.on(events.SIGN_IN, room.user.join(socket));
	});

	subscriber.on("message", (chan, payload) => {
		if (chan === channel.GLOBAL) {
			const { event, message } = JSON.parse(payload);
			io.emit(event, message);
		}

		if (chan === channel.USER) {
			const { userId, ...message } = JSON.parse(payload);
			io.to(room.user.name(message.userId)).emit(events.NOTIFICATION, message);
		}
	});
};

export default {
	init
};
