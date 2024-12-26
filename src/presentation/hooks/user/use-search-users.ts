import useSWR, { Key } from "swr";
import { createFetcher } from "../../utils/shared/fetcher";
import { UserViewModel } from "@/src/application/view-models/user.view-model";

export const useSearchUsers = (query: string) => {
	const userFetcher = createFetcher<UserViewModel>();

	const { data, error, isLoading } = useSWR<UserViewModel[], Error, Key>(
		`/api/users${query ? `?search=${query}` : ""}`,
		(url: string) => userFetcher(url, { entityKey: "users" }),
		{
			revalidateOnFocus: false,
			dedupingInterval: 500,
			keepPreviousData: true,
			fallbackData: [],
		}
	);

	return {
		users: data ?? [],
		isLoading,
		error,
	};
};
