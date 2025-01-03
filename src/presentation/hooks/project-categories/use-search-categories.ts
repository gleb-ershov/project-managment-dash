import useSWR, { Key } from "swr";
import { createFetcher } from "../../utils/fetcher";
import { ProjectCategory } from "@prisma/client";

interface UseSearchProjectsOptions {
	fallbackData?: ProjectCategory[];
}

export const useSearchCategories = (
	query: string,
	options?: UseSearchProjectsOptions
) => {
	const categoriesFetcher = createFetcher<ProjectCategory>();

	const { data, error, isLoading } = useSWR<ProjectCategory[], Error, Key>(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/project-categories${
			query ? `?search=${query}` : ""
		}`,
		(url: string) => categoriesFetcher(url, { entityKey: "categories" }),
		{
			revalidateOnFocus: false,
			dedupingInterval: 500,
			keepPreviousData: true,
			fallbackData: options?.fallbackData,
		}
	);
	if (error) {
		console.error("SWR Error:", error);
	}
	return {
		categories: data ?? [],
		isLoading,
		error,
		isInitialized: true, // With SWR and fallbackData, we're always initialized
	};
};
