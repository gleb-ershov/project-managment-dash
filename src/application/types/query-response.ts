export interface QueryResponse<T> {
	error: null | Error;
	data: T | null;
	success: boolean;
}
