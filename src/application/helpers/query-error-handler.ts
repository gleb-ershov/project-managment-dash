import { BaseError } from "@/src/domain/errors/base.error";

export const queryErrorHandler = (error: unknown, consoleMsg = "Error:") => {
	console.error(consoleMsg, error);
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
		error: new Error("An unexpected error occured"),
	};
};
