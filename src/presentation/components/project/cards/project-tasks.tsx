"use client";

import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { GroupedTasksCard } from "../../task/cards/grouped-tasks-task-card";
import { AddEntityButton } from "../../shared/add-entity-button";
import { TaskStatusSelect } from "../../task/form-elements/task-status-select";
import { TaskPrioritySelect } from "../../task/form-elements/task-priority-select";
import { useMemo, useState } from "react";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";

interface ProjectTasksProps {
	project: ProjectViewModel;
}

export const ProjectTasks = ({ project }: ProjectTasksProps) => {
	const [statusValue, statusFilterHandler] = useState<string>("all");
	const [priorityValue, priorityFilterHandler] = useState<string>("all");

	const filterCallback = useMemo(
		() => (task: TaskViewModel) => {
			if (statusValue === "all" && priorityValue === "all") return true;
			const statusResult =
				statusValue === "all" ? true : task.status === statusValue;
			const priorityResult =
				priorityValue === "all"
					? true
					: task.priority === priorityValue;

			return statusResult && priorityResult;
		},
		[statusValue, priorityValue]
	);

	const FILTERED_TASKS = project.tasks?.filter((task) =>
		filterCallback(task)
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4 flex-1">
					<TaskStatusSelect
						noValueAllowed
						className="w-1/5"
						onChange={(val) => statusFilterHandler(val)}
					/>
					<TaskPrioritySelect
						noValueAllowed
						className="w-1/5"
						onChange={(val) => priorityFilterHandler(val)}
					/>
				</div>
				<AddEntityButton label="Add task" path="/tasks/create" />
			</div>

			<div className="space-y-4">
				{FILTERED_TASKS?.map((task) => (
					<GroupedTasksCard key={task.id} task={task} />
				))}
				{FILTERED_TASKS?.length === 0 && (
					<span className="text-muted-foreground mt-4">
						No tasks in this project yet.
					</span>
				)}
			</div>
		</div>
	);
};
