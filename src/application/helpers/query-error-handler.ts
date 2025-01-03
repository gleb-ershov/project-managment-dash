import { BaseError } from "@/src/domain/errors/base.error";
import { SerializedError } from "../types/query-response";
import { ValidationError } from "@/src/domain/errors/application.error";

interface QueryErrorHandlerResponse {
	data: null;
	success: false;
	error: SerializedError;
}

export const queryErrorHandler = (
	error: unknown,
	consoleMsg = "Error:"
): QueryErrorHandlerResponse => {
	if (error instanceof ValidationError && error.data?.fieldErrors) {
		return {
			data: null,
			success: false,
			error: {
				name: "Validation Error",
				message: error.message,
				formFieldErrors: error.data?.fieldErrors,
			},
		};
	}
	if (error instanceof BaseError) {
		return {
			data: null,
			success: false,
			error,
		};
	}

	return {
		data: null,
		success: false,
		error:
			error instanceof Error
				? {
						name: error.name,
						message: error.message,
				  }
				: {
						name: "Unexpected Error",
						message: "An unexpected error occurred",
				  },
	};
};
