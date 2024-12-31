import { useSearch } from "@/src/presentation/hooks/shared/use-search";
import { TaskPrioritySelect } from "./task-priority-select";

export const TaskPriorityFilter = () => {
	const { handleSearchChange } = useSearch({ queryName: "priority" });
	return <TaskPrioritySelect onChange={handleSearchChange} />;
};
