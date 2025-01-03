import { Badge } from "@/src/presentation/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";
import Link from "next/link";

interface TaskListCardProps {
	task: TaskViewModel;
}

export const GroupedTasksCard = ({ task }: TaskListCardProps) => {
	return (
		<div className="group relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-2">
						<Link
							href={`/tasks/${task.id}`}
							className="text-sm font-medium text-gray-900 truncate"
						>
							{task.title}
						</Link>
						<TaskStatusBadge status={task.status} />
					</div>

					{task.description && (
						<p className="text-sm text-gray-500 line-clamp-2 mb-3">
							{task.description}
						</p>
					)}

					<div className="flex items-center gap-4 text-sm text-gray-500">
						{task.dueDate && (
							<div className="flex items-center gap-1">
								<CalendarIcon className="h-4 w-4" />
								<span>{task.dueDate}</span>
							</div>
						)}

						{/* Created date */}
						<div className="flex items-center gap-1">
							<ClockIcon className="h-4 w-4" />
							<span>{task.createdAt}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					{task.members
						? task.members.length > 0 && (
								<div className="flex -space-x-2">
									<LinkedUsersAvatarList
										members={task.members}
									/>
									{task.members.length > 3 && (
										<div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 border-2 border-white">
											<span className="text-xs text-gray-600">
												+{task.members.length - 3}
											</span>
										</div>
									)}
								</div>
						  )
						: null}

					{task.priority && (
						<Badge className="text-xs">{task.priority}</Badge>
					)}
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-lg overflow-hidden">
				<div
					className="h-full bg-blue-500 transition-all duration-300"
					style={{
						width: `${getTaskProgress(task)}%`,
						backgroundColor: getStatusColor(task.status),
					}}
				/>
			</div>
		</div>
	);
};

// Helper components
const TaskStatusBadge = ({ status }: { status: string }) => {
	return <Badge className="text-xs">{status}</Badge>;
};

// Helper functions
const getStatusVariant = (
	status: string
): "default" | "success" | "warning" | "destructive" => {
	const variants: Record<
		string,
		"default" | "success" | "warning" | "destructive"
	> = {
		TODO: "default",
		IN_PROGRESS: "warning",
		DONE: "success",
		CANCELLED: "destructive",
	};
	return variants[status] || "default";
};

const getPriorityVariant = (
	priority: string
): "default" | "warning" | "destructive" => {
	const variants: Record<string, "default" | "warning" | "destructive"> = {
		LOW: "default",
		MEDIUM: "warning",
		HIGH: "destructive",
	};
	return variants[priority] || "default";
};

const getStatusColor = (status: string): string => {
	const colors: Record<string, string> = {
		TODO: "#6B7280",
		IN_PROGRESS: "#F59E0B",
		DONE: "#10B981",
		CANCELLED: "#EF4444",
	};
	return colors[status] || "#6B7280";
};

const getTaskProgress = (task: TaskViewModel): number => {
	switch (task.status) {
		case "DONE":
			return 100;
		case "IN_PROGRESS":
			return 50;
		case "CANCELLED":
			return 100;
		default:
			return 0;
	}
};
