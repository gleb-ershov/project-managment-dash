import { getUsersSharedProjects } from "@/src/application/queries/project/get-users-shared-projects";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { SharedEntityListCard } from "../../shared/shared-entity-list-card";
import { FolderCheck } from "lucide-react";

interface SharedProjectsListProps {
	userId: string;
	currentUserId: string;
}

export const SharedProjectsList = async ({
	userId,
	currentUserId,
}: SharedProjectsListProps) => {
	const projects = await getUsersSharedProjects(userId, currentUserId);
	return (
		<Card className="dark:bg-[#18181B] flex-1 h-[500px]">
			<CardHeader className="py-4 flex items-center justify-between flex-row">
				Shared projects
				<FolderCheck
				size={20}
					strokeWidth={1.5}
					className="text-muted-foreground"
				/>
			</CardHeader>
			<Separator className="w-[90%] mx-auto" />
			<CardContent className="overflow-y-auto max-h-[80%] flex flex-col gap-4 w-[95%] pt-4">
				{projects.map((project) => (
					<SharedEntityListCard
						key={project.id}
						entity={project}
						type="project"
					/>
				))}
			</CardContent>
		</Card>
	);
};
