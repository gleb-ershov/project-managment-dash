import { CheckCircle, FolderArchive, Users } from "lucide-react";
import { UserStatsCard } from "./user-stats-card";
import { getUser } from "@/src/application/queries/user/get-user";

export const UserStatsContainer = async ({ userId }: { userId: string }) => {
	const { data } = await getUser(userId);

	return (
		<div className="w-1/3 flex flex-col gap-4">
			<UserStatsCard
				label="Tasks"
				amount={data?.tasks?.length || 0}
				icon={
					<CheckCircle
						strokeWidth={1.5}
						className="text-muted-foreground"
					/>
				}
				content={
					<span className="text-[12px] text-muted-foreground">
						Total tasks user currently working on
					</span>
				}
			/>
			<UserStatsCard
				label="Projects"
				amount={data?.projects?.length || 0}
				icon={
					<FolderArchive
						strokeWidth={1.5}
						className="text-muted-foreground"
					/>
				}
				content={
					<span className="text-[12px] text-muted-foreground">
						Total projects user currently working on
					</span>
				}
			/>
			<UserStatsCard
				label="Teams"
				amount={data?.teamMembers?.length || 0}
				icon={
					<Users
						strokeWidth={1.5}
						className="text-muted-foreground"
					/>
				}
				content={
					<span className="text-[12px] text-muted-foreground">
						Total teams user currently working in
					</span>
				}
			/>
		</div>
	);
};
