const userRoom = userId => `user:${userId}`;

const user = {
	name: userRoom,
	join: socket => userId => socket.join(userRoom(userId))
};

export { user };
