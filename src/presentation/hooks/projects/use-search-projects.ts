import useSWR, { Key } from "swr";
import { createFetcher } from "../../utils/shared/fetcher";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";

interface UseSearchProjectsOptions {
	fallbackData?: ProjectViewModel[];
}

export const useSearchProjects = (
	query: string,
	userId: string,
	options?: UseSearchProjectsOptions
) => {
	const projectFetcher = createFetcher<ProjectViewModel>();

	const { data, error, isLoading } = useSWR<ProjectViewModel[], Error, Key>(
		`/api/projects${query ? `?search=${query}&userId=${userId}` : ""}`,
		(url: string) => projectFetcher(url, { entityKey: "projects" }),
		{
			fallbackData: options?.fallbackData,
			revalidateOnFocus: false, // Optional: disable revalidation on window focus
			keepPreviousData: true, // Keep showing previous data while fetching new data
		}
	);

	return {
		projects: data || [],
		isLoading,
		error: error?.message || null,
		isInitialized: true, // With SWR and fallbackData, we're always initialized
	};
};
