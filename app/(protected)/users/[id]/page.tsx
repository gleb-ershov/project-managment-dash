import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import {
	SharedEntityListSkeleton,
	SharedProjectsList,
} from "@/src/presentation/components/project/lists/shared-projects-list";
import { SharedTasksList } from "@/src/presentation/components/task/lists/shared-tasks-list";
import { SharedTeamsList } from "@/src/presentation/components/team/lists/shared-teams-list";
import {
	UserProfile,
	UserProfileSkeleton,
} from "@/src/presentation/components/user/cards/user-profile-card";
import {
	UserStatsContainer,
	UserStatsContainerSkeleton,
} from "@/src/presentation/components/user/cards/user-stats-container";
import { UserSettingsButton } from "@/src/presentation/components/user/form-elements/user-settings-button";
import { Suspense } from "react";

export default async function UserPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const USER_ID = (await params).id;
	const currentUser = await getCurrentUser();
	const currentUserId = currentUser?.id || "";

	return (
		<div className="mx-auto py-8 flex flex-col gap-6 w-[95%]">
			<div className="flex items-center gap-4">
				<h1 className="text-xl lg:text-3xl font-semibold">
					User Details
				</h1>
				<p className="hidden lg:inline text-sm text-muted-foreground">
					View and manage user information
				</p>
				<UserSettingsButton
					userId={USER_ID}
					currentUserId={currentUserId}
					className="ml-auto px-2 py-1 text-sm lg:text-base lg:px-4 lg:py-2"
				/>
			</div>
			<Suspense fallback={<UserProfileSkeleton />}>
				<UserProfile userId={USER_ID} />
			</Suspense>

			<div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
				<Suspense fallback={<UserStatsContainerSkeleton />}>
					<UserStatsContainer userId={USER_ID} />
				</Suspense>

				<Suspense fallback={<SharedEntityListSkeleton />}>
					<SharedProjectsList
						userId={USER_ID}
						currentUserId={currentUserId}
					/>
				</Suspense>

				<Suspense fallback={<SharedEntityListSkeleton />}>
					<SharedTasksList
						userId={USER_ID}
						currentUserId={currentUserId}
					/>
				</Suspense>

				<Suspense fallback={<SharedEntityListSkeleton />}>
					<SharedTeamsList
						userId={USER_ID}
						currentUserId={currentUserId}
					/>
				</Suspense>
			</div>
		</div>
	);
}
