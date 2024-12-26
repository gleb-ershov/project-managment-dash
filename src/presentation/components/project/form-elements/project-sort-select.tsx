"use client";
import { memo } from "react";
import { ArrowDownUp } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { useSearch } from "@/src/presentation/hooks/shared/use-search";

const SORT_OPTIONS = [
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const SortSelectTrigger = memo(() => (
	<span className="flex items-center gap-2 text-sm">
		<ArrowDownUp size={16} />
		<span>Sort by</span>
	</span>
));
SortSelectTrigger.displayName = "SortSelectTrigger";

const SortSelectItem = memo(
	({ value, label }: { value: string; label: string }) => (
		<SelectItem value={value} className="cursor-pointer">
			<span className="flex items-center gap-2">{label}</span>
		</SelectItem>
	)
);
SortSelectItem.displayName = "SortSelectItem";

export const ProjectsSortSelect = memo(() => {
	const { handleSearchChange } = useSearch({
		queryName: "sortBy",
		delay: 0,
	});

	const onValueChange = (value: SortValue) => {
		handleSearchChange(value);
	};

	return (
		<Select onValueChange={onValueChange}>
			<SelectTrigger className="w-[150px]">
				<SelectValue placeholder={<SortSelectTrigger />} />
			</SelectTrigger>
			<SelectContent>
				{SORT_OPTIONS.map(({ value, label }) => (
					<SortSelectItem key={value} value={value} label={label} />
				))}
			</SelectContent>
		</Select>
	);
});

ProjectsSortSelect.displayName = "ProjectsSortSelect";
