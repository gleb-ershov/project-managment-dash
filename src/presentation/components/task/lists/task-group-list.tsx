import { GroupedTasksCard } from "../cards/grouped-tasks-task-card";
import { TaskViewModelGroupWithLabel } from "@/src/application/services/task.service";

export const TaskGroupList = ({
	groups,
}: {
	groups: TaskViewModelGroupWithLabel[];
}) => {
	if (!groups.length) {
		return (
			<div className="flex items-center justify-center h-[400px]">
				<div className="text-center">
					<h3 className="text-lg font-medium text-gray-900">
						No tasks found
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Get started by creating a new task
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{groups.map((group) => (
				<section key={group.label} className="space-y-4">
					<div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-2">
						<h2 className="text-lg font-semibold text-gray-900">
							{group.label}
						</h2>
					</div>

					<div className="grid gap-4">
						{group.tasks.map((task) => (
							<GroupedTasksCard task={task} key={task.id} />
						))}
					</div>
				</section>
			))}
		</div>
	);
};
