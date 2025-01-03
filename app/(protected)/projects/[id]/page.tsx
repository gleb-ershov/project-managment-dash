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
import { toast } from "sonner";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const PROJECT_ID = (await params).id;
	const USER = await getCurrentUser();
	const PROJECT = await getProjectById(PROJECT_ID).then((result) => {
		if (!result.success && result.error) {
			toast.error(result.error?.message);
		}
		return result;
	});

	if (!PROJECT.data) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto space-y-8">
				<ProjectHeader
					project={PROJECT.data}
					currentUserId={USER?.id}
				/>

				<Tabs defaultValue="overview" className="w-full">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="tasks">Tasks</TabsTrigger>
						<TabsTrigger value="members">Members</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="mt-6">
						<ProjectOverview {...PROJECT.data} />
					</TabsContent>

					<TabsContent value="tasks" className="mt-6">
						<ProjectTasks project={PROJECT.data} />
					</TabsContent>

					<TabsContent value="members" className="mt-6">
						<ProjectMembers
							project={PROJECT.data}
							currentUserId={USER?.id}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
