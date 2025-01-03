export interface ApiResponse<T> {
	data?: T;
	[key: string]: any;
}

type EntityType = "projects" | "users" | "categories" | string;

interface FetcherOptions<T> {
	entityKey?: EntityType | keyof ApiResponse<T>; // Key to extract from response
	signal?: AbortSignal;
	headers?: HeadersInit;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: any;
}

export const createFetcher = <T>() => {
	return async (
		url: string,
		options: FetcherOptions<T> = {}
	): Promise<T[]> => {
		const {
			entityKey,
			headers,
			method = "GET",
			body,
			signal = new AbortController().signal,
		} = options;

		try {
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
				body: body ? JSON.stringify(body) : undefined,
				signal,
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch ${entityKey || "data"}`);
			}

			const data: ApiResponse<T> = await response.json();

			// If entityKey is provided, try to extract that specific data
			if (entityKey && entityKey in data) {
				return (data[entityKey] as T[]) || [];
			}

			// If data property exists, return it
			if ("data" in data) {
				return (data.data as T[]) || [];
			}

			// If response is already an array
			if (Array.isArray(data)) {
				return data;
			}

			return [];
		} catch (error: unknown) {
			if (error instanceof Error && error.name === "AbortError") {
				return [];
			}
			throw error;
		}
	};
};
