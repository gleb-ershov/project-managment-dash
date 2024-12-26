"use client";
import { memo } from "react";
import { useSearch } from "@/src/presentation/hooks/shared/use-search";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { SlidersHorizontal } from "lucide-react";
import { ProjectStatus } from "@/src/domain/value-objects/project-status.value-object";

const FILTER_OPTIONS = [
	{
		value: ProjectStatus.IN_PROGRESS,
		label: "In progress",
	},
	{
		value: ProjectStatus.COMPLETED,
		label: "Completed",
	},
	{
		value: ProjectStatus.ON_HOLD,
		label: "On hold",
	},
	{
		value: ProjectStatus.CANCELLED,
		label: "Cancelled",
	},
] as const;

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

interface FilterOptionProps {
	label: string;
}

const FilterOption = memo(({ label }: FilterOptionProps) => (
	<span className="flex items-center gap-2">
		<span>{label}</span>
	</span>
));
FilterOption.displayName = "FilterOption";

// Separate trigger component
const FilterTrigger = memo(() => (
	<span className="flex items-center gap-2 text-sm">
		<SlidersHorizontal size={16} className="shrink-0" />
		<span>Filter</span>
	</span>
));
FilterTrigger.displayName = "FilterTrigger";

interface FilterProjectsSelectProps {
	defaultValue?: FilterValue;
	disabled?: boolean;
}

export const ProjectsFilterSelect = memo(
	({ disabled }: FilterProjectsSelectProps) => {
		const { handleSearchChange } = useSearch({
			queryName: "filterBy",
			delay: 0,
		});

		return (
			<Select
				onValueChange={(e) => handleSearchChange(e)}
				disabled={disabled}
			>
				<SelectTrigger
					className="w-[150px]"
					aria-label="Filter projects"
				>
					<SelectValue placeholder={<FilterTrigger />} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					{FILTER_OPTIONS.map(({ value, label }) => (
						<SelectItem key={value} value={value}>
							<FilterOption label={label} />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	}
);

ProjectsFilterSelect.displayName = "FilterProjectsSelect";
