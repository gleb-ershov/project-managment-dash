import { ErrorCode, HttpStatus } from "../constants/http.constants";
import { BaseError } from "./base.error";

export class ValidationError extends BaseError {
	constructor(message: string, data?: any) {
		super(
			message,
			HttpStatus.BAD_REQUEST,
			ErrorCode.VALIDATION_ERROR,
			data
		);
	}
}

export class NotFoundError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, data);
	}
}

export class DatabaseError extends BaseError {
	constructor(message: string, data?: any) {
		super(
			message,
			HttpStatus.INTERNAL_SERVER_ERROR,
			ErrorCode.DATABASE_ERROR,
			data
		);
	}
}

export class UnauthorizedError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, data);
	}
}

export class ForbiddenError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, data);
	}
}
