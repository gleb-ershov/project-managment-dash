export enum HttpStatus {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
	SERVICE_UNAVAILABLE = 503,
}

export enum ErrorCode {
	// Validation Errors (400)
	VALIDATION_ERROR = "VALIDATION_ERROR",
	INVALID_INPUT = "INVALID_INPUT",

	// Authentication Errors (401)
	UNAUTHORIZED = "UNAUTHORIZED",
	INVALID_CREDENTIALS = "INVALID_CREDENTIALS",

	// Authorization Errors (403)
	FORBIDDEN = "FORBIDDEN",
	INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

	// Not Found Errors (404)
	NOT_FOUND = "NOT_FOUND",
	RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",

	// Conflict Errors (409)
	DUPLICATE_ENTRY = "DUPLICATE_ENTRY",

	// Server Errors (500)
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
	DATABASE_ERROR = "DATABASE_ERROR",

	// Service Errors (503)
	SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}