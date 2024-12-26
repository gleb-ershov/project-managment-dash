import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { GroupedTasksCard } from "../../task/cards/grouped-tasks-task-card";
import { AddEntityButton } from "../../shared/add-entity-button";

interface ProjectTasksProps {
	project: ProjectViewModel;
}

export const ProjectTasks = ({ project }: ProjectTasksProps) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Select defaultValue="all">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Tasks</SelectItem>
							<SelectItem value="todo">To Do</SelectItem>
							<SelectItem value="in_progress">
								In Progress
							</SelectItem>
							<SelectItem value="done">Done</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="dueDate">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="dueDate">Due Date</SelectItem>
							<SelectItem value="priority">Priority</SelectItem>
							<SelectItem value="status">Status</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<AddEntityButton label="Add task" path="/tasks/create" />
			</div>

			<div className="space-y-4">
				{project.tasks?.map((task) => (
					<GroupedTasksCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};
