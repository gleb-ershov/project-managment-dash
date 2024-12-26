import { BaseError } from "./base.error";

export class DomainError extends BaseError {
	constructor(message: string, errorCode: string, data?: any) {
		super(message, 422, errorCode, data);
	}
}
