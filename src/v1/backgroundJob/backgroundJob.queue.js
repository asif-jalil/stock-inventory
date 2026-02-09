import amqp from "amqplib";

let connection;
let publisherChannel;
let consumerChannel;

const queue = "background-jobs";

const getConnection = async () => {
	if (!connection) {
		// @ts-ignore
		connection = await amqp.connect(process.env.RABBITMQ_URL);
	}
	return connection;
};

const getPublisherChannel = async () => {
	if (!publisherChannel) {
		const connection = await getConnection();
		publisherChannel = await connection.createChannel();
	}
	return publisherChannel;
};

const getConsumerChannel = async () => {
	if (!consumerChannel) {
		const connection = await getConnection();
		consumerChannel = await connection.createChannel();
	}
	return consumerChannel;
};

export { queue, getPublisherChannel, getConsumerChannel };
