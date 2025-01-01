import { getUsersSharedProjects } from "@/src/application/queries/project/get-users-shared-projects";
import { getUsersSharedTasks } from "@/src/application/queries/task/get-users-shared-tasks";
import { getUsersSharedTeams } from "@/src/application/queries/team/get-users-shared-teams";
import { Card, CardHeader } from "@/src/presentation/components/ui/card";
import { UserProfile } from "@/src/presentation/components/user/cards/user-profile-card";
import { UserStatsContainer } from "@/src/presentation/components/user/cards/user-stats-container";
import { UserSettingsButton } from "@/src/presentation/components/user/form-elements/user-settings-button";
import { Suspense } from "react";

export default async function UserPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const USER_ID = (await params).id;
	const sharedProjects = await getUsersSharedProjects(USER_ID);
	const sharedTasks = await getUsersSharedTasks(USER_ID);
	const sharedTeams = await getUsersSharedTeams(USER_ID);
	console.log("SHARED PROJECTS", sharedProjects);
	console.log("SHARED TASKS", sharedTasks);
	console.log("SHARED TEAMS", sharedTeams);

	return (
		<div className="container mx-auto py-8 flex flex-col gap-6">
			<div className="flex items-center gap-4">
				<h1 className="text-3xl font-semibold">User Details</h1>
				<p className="text-sm text-muted-foreground">
					View and manage user information
				</p>
				<UserSettingsButton userId={USER_ID} className="ml-auto" />
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<UserProfile userId={USER_ID} />
			</Suspense>
			<div className="flex gap-6">
				<Suspense fallback={<div>Loading...</div>}>
					<UserStatsContainer userId={USER_ID} />
				</Suspense>
				<Card className="dark:bg-[#18181B] flex-1" />
				<Card className="dark:bg-[#18181B] flex-1" />
				<Card className="dark:bg-[#18181B] flex-1" />

				{/* <Card className="dark:bg-[#18181B] flex-1">
					<CardHeader>Shared activities</CardHeader>
					<div className="flex items-center justify-between gap-4">
						<div className="h-[340px] border-r-[1px] border-[#272727] flex-1" />
						<div className="h-[340px] flex-1" />
						<div className="h-[340px] border-l-[1px] border-[#272727] flex-1" />
					</div>
				</Card> */}
				{/* SharedProjects */}
				{/* SharedTasks */}
				{/* SharedTeams */}
			</div>
		</div>
	);
}
