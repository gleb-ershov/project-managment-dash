import { useCallback, useEffect, useState } from "react";
import { useUrlParams } from "./use-url-params";
import debounce from "lodash.debounce";

interface UseSearchProps {
	queryName?: string;
	delay?: number;
}

export const useSearch = ({
	queryName = "search",
	delay = 300,
}: UseSearchProps = {}) => {
	const { searchParams, pathname, replace } = useUrlParams();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get(queryName) || ""
	);

	const debouncedUpdateURL = useCallback(
		debounce((term: string) => {
			const params = new URLSearchParams(searchParams);

			if (term) {
				params.set(queryName, term);
			} else {
				params.delete(queryName);
			}
			replace(`${pathname}?${params.toString()}`, { scroll: false });
		}, delay),
		[pathname, queryName, replace, searchParams]
	);

	const handleSearchChange = useCallback(
		(term: string) => {
			setSearchTerm(term);
			debouncedUpdateURL(term);
		},
		[debouncedUpdateURL]
	);

	useEffect(() => {
		return () => {
			debouncedUpdateURL.cancel();
		};
	}, [debouncedUpdateURL]);

	useEffect(() => {
		const urlSearchTerm = searchParams.get(queryName) || "";
		if (urlSearchTerm !== searchTerm) {
			setSearchTerm(urlSearchTerm);
		}
	}, [searchParams, queryName, searchTerm]);

	return {
		searchTerm,
		handleSearchChange,
		isSearching: searchTerm.length > 0,
	};
};
