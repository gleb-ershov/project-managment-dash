export interface QueryResponse<T> {
	error: null | SerializedError;
	data: T | null;
	success: boolean;
}

export interface SerializedError {
	name: string;
	message: string;
	formFieldErrors?: FormFieldError;
	data?: any;
}

export interface FormFieldError {
	[key: string]: string;
}
