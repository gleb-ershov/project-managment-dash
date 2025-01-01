import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { CalendarIcon } from "lucide-react";

import { calculateProgress } from "./projects-page-list-card";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { EntityActionsMenu } from "../../shared/entity-actions-menu";

interface ProjectHeaderProps {
	project: ProjectViewModel;
	currentUserId?: string;
}

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

export const ProjectHeader = ({
	project,
	currentUserId,
}: ProjectHeaderProps) => {
	const progress = calculateProgress(project);
	const isOwner = project.userId === currentUserId;

	return (
		<div className="space-y-4">
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold text-gray-900">
							{project.title}
						</h1>
						<ProjectStatusBadge status={project.status} />
					</div>

					<p className="mt-2 text-gray-500 max-w-2xl">
						{project.description}
					</p>
				</div>

				{isOwner && (
					<EntityActionsMenu entity="project" entityId={project.id} />
				)}
			</div>

			<div className="flex items-center gap-6 text-sm text-gray-500">
				<div className="flex items-center gap-2">
					<CalendarIcon className="h-4 w-4" />
					<span>Started {project.createdAt}</span>
				</div>
				<div className="flex items-center gap-2">
					<CalendarIcon className="h-4 w-4" />
					<span>Due {project.dueDate}</span>
				</div>
			</div>

			<div className="max-w-xl">
				<div className="flex items-center justify-between text-sm mb-1">
					<span className="text-gray-500">Progress</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} />
			</div>
		</div>
	);
};
