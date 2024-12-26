import { format } from "date-fns";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";

interface ProjectListCardProps {
	project: ProjectViewModel;
}

export const ProjectListCard = ({ project }: ProjectListCardProps) => {
	const progress = calculateProgress(project);

	return (
		<Link href={`/projects/${project.id}`}>
			<div className="group relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
				<div className="flex items-start gap-4">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-2">
							<h3 className="text-lg font-semibold text-gray-900 truncate">
								{project.title}
							</h3>
							<ProjectStatusBadge status={project.status} />
						</div>

						{project.description && (
							<p className="text-sm text-gray-500 line-clamp-2 mb-4">
								{project.description}
							</p>
						)}

						<div className="flex items-center gap-4 text-sm text-gray-500">
							{project.createdAt && (
								<div className="flex items-center gap-1">
									<CalendarIcon className="h-4 w-4" />
									<span>{project.createdAt}</span>
								</div>
							)}

							{project.dueDate && (
								<div className="flex items-center gap-1">
									<ClockIcon className="h-4 w-4" />
									<span>Due {project.dueDate}</span>
								</div>
							)}
						</div>
					</div>

					{/* Right Side */}
					<div className="flex flex-col items-end gap-2">
						{/* Team Members */}
						{project.members && project.members.length > 0 && (
							<div className="flex -space-x-2">
								<LinkedUsersAvatarList
									members={project.members}
								/>
								{project.members.length > 3 && (
									<div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border-2 border-white">
										<span className="text-xs text-gray-600">
											+{project.members.length - 3}
										</span>
									</div>
								)}
							</div>
						)}

						{/* Category Badge */}
						{project.categories
							? project.categories.map((category) => (
									<Badge variant="outline" key={category.id}>
										{category.name}
									</Badge>
							  ))
							: null}
					</div>
				</div>

				{/* Progress Bar */}
				<div className="mt-4">
					<div className="flex items-center justify-between text-sm mb-1">
						<span className="text-gray-500">Progress</span>
						<span className="font-medium">{progress}</span>
					</div>
					<Progress value={progress} />
				</div>
			</div>
		</Link>
	);
};

const ProjectStatusBadge = ({ status }: { status: string }) => {
	const variants: Record<
		string,
		"default" | "secondary" | "outline" | "destructive"
	> = {
		active: "default",
		completed: "secondary",
		on_hold: "outline",
		cancelled: "destructive",
	};

	return <Badge variant={variants.status}>{status}</Badge>;
};

export const calculateProgress = (project: ProjectViewModel): number => {
	if (project.status === "COMPLETED") return 100;
	if (!project.tasks || project.tasks.length === 0) return 0;

	const completedTasks = project.tasks.filter(
		(task) => task.status === "COMPLETED"
	).length;

	return Math.round((completedTasks / project.tasks.length) * 100);
};
