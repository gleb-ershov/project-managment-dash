export class BaseError extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
		public readonly errorCode: string,
		public readonly data?: any
	) {
		super(message);
		this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
	}
}
