type User<Type> = {
	[Property in keyof Type]: Type[Property];
};

type ApiKey<Type> = {
	[Property in keyof Type]: Type[Property];
};

declare namespace Express {
	interface Request {
		rawBody: Buffer;
		user: User;
		apiKey: ApiKey;
		isProTemplate: Boolean;
	}
}
