"use client";

import { useSearch } from "@/src/presentation/hooks/shared/use-search";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "@/src/presentation/utils/cn";

interface SearchInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	iconClassName?: string;
	containerclassname?: string;
	loading?: boolean;
}

export const ProjectFilterSearch = (props: SearchInputProps) => {
	const { handleSearchChange } = useSearch({ queryName: "projectName" });

	const {
		value,
		placeholder = "Search projects...",
		className,
		iconClassName,
		containerclassname,
		loading,
	} = props;

	return (
		<div className={cn("relative flex items-center", containerclassname)}>
			<Search
				className={cn(
					"absolute left-3 h-4 w-4 text-muted-foreground",
					loading && "animate-pulse",
					iconClassName
				)}
				aria-hidden="true"
			/>
			<Input
				{...props}
				type="search"
				value={value}
				onChange={(event) =>
					handleSearchChange(event?.currentTarget.value)
				}
				placeholder={placeholder}
				className={cn(
					"pl-9 transition-colors",
					"placeholder:text-muted-foreground/60",
					loading && "text-muted-foreground",
					className
				)}
			/>
		</div>
	);
};
