import { ProjectHeader } from "@/src/presentation/components/project/cards/project-header";
import { ProjectOverview } from "@/src/presentation/components/project/cards/project-overview";
import { ProjectTasks } from "@/src/presentation/components/project/cards/project-tasks";
import { ProjectMembers } from "@/src/presentation/components/project/lists/project-members-list";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/presentation/components/ui/tabs";
import { getProjectById } from "@/src/application/queries/project/get-project-by-id";
import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import { notFound } from "next/navigation";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const projectId = (await params).id;
	const user = await getCurrentUser();
	const project = await getProjectById(projectId);

	if (!project) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto space-y-8">
				<ProjectHeader project={project} currentUserId={user?.id} />

				<Tabs defaultValue="overview" className="w-full">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="tasks">Tasks</TabsTrigger>
						<TabsTrigger value="members">Members</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="mt-6">
						<ProjectOverview {...project} />
					</TabsContent>

					<TabsContent value="tasks" className="mt-6">
						<ProjectTasks project={project} />
					</TabsContent>

					<TabsContent value="members" className="mt-6">
						<ProjectMembers
							project={project}
							currentUserId={user?.id}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
