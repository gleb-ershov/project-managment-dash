import { TaskGroupList } from "@/src/presentation/components/task/lists/task-group-list";
import { getUserTasksGroupedByDate } from "@/src/application/queries/task/get-tasks-grouped-by-date";
import { toast } from "sonner";

export default async function TasksPage() {
	const TASKS_GROUPS = await getUserTasksGroupedByDate().then((result) => {
		if (!result.success && result.error) {
			toast.error(result.error?.message);
		}
		return result;
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-5xl mx-auto">
				<header className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
					<p className="mt-1 text-sm text-gray-500">
						Manage and track your tasks
					</p>
				</header>
				{TASKS_GROUPS.success && TASKS_GROUPS.data ? (
					<TaskGroupList groups={TASKS_GROUPS.data} />
				) : null}
			</div>
		</div>
	);
}
