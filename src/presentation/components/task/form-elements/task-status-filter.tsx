"use client";

import { useSearch } from "@/src/presentation/hooks/shared/use-search";
import { TaskStatusSelect } from "./task-status-select";

export const TaskStatusFilter = () => {
	const { handleSearchChange } = useSearch({ queryName: "status" });

	return <TaskStatusSelect onChange={handleSearchChange} />;
};
