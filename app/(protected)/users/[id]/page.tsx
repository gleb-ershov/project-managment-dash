import UserProfile from "@/src/presentation/components/user/cards/user-profile-card";
import { UserStatsContainer } from "@/src/presentation/components/user/cards/user-stats-container";
import { UserSettingsButton } from "@/src/presentation/components/user/form-elements/user-settings-button";
import { Suspense } from "react";

export default async function UserPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const USER_ID = (await params).id;

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
			<Suspense fallback={<div>Loading...</div>}>
				<UserStatsContainer userId={USER_ID} />
			</Suspense>
		</div>
	);
}
