import { UserStatsCard } from "./user-stats-card";
import { Card } from "../../ui/card";
import { getUser } from "@/src/application/queries/user/get-user";

export const UserStatsContainer = async ({ userId }: { userId: string }) => {
	const USER_DATA = await getUser(userId);

	return (
		<Card className="grid grid-cols-3 gap-8 mt-8 p-4">
			<UserStatsCard
				label="Tasks: "
				amount={USER_DATA?.tasks?.length || 0}
				icon={<></>}
			/>
			<UserStatsCard
				label="Projects: "
				amount={USER_DATA?.projects?.length || 0}
				icon={<></>}
			/>
			<UserStatsCard
				label="Teams: "
				amount={USER_DATA?.teamMembers?.length || 0}
				icon={<></>}
			/>
		</Card>
	);
};
