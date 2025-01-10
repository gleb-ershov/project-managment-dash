import { CheckCircle, FolderArchive, Users, LucideIcon } from "lucide-react";
import { UserStatsCard } from "./user-stats-card";
import { getUser } from "@/src/application/queries/user/get-user";
import { memo } from "react";

type StatCardConfig = {
	label: string;
	icon: LucideIcon;
	getAmount: (data: any) => number;
	description: string;
};

// Extract static configuration
const STAT_CARDS_CONFIG: StatCardConfig[] = [
	{
		label: "Tasks",
		icon: CheckCircle,
		getAmount: (data) => data?.tasks?.length || 0,
		description: "Total tasks user currently working on",
	},
	{
		label: "Projects",
		icon: FolderArchive,
		getAmount: (data) => data?.projects?.length || 0,
		description: "Total projects user currently working on",
	},
	{
		label: "Teams",
		icon: Users,
		getAmount: (data) => data?.teamMembers?.length || 0,
		description: "Total teams user currently working in",
	},
];

const StatCard = memo(
	({
		Icon,
		label,
		amount,
		description,
		isLoading,
	}: {
		Icon: LucideIcon;
		label: string;
		amount: number;
		description: string;
		isLoading?: boolean;
	}) => (
		<UserStatsCard
			label={label}
			amount={amount}
			icon={
				<Icon
					strokeWidth={1.5}
					className={`text-muted-foreground ${
						isLoading ? "animate-pulse" : ""
					}`}
				/>
			}
			content={
				<span
					className={`text-xs sm:text-sm text-muted-foreground ${
						isLoading ? "animate-pulse" : ""
					}`}
				>
					{isLoading ? "Loading..." : description}
				</span>
			}
		/>
	)
);

StatCard.displayName = "StatCard";

export const UserStatsContainerSkeleton = () => (
	<div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col gap-3 sm:gap-4">
		{STAT_CARDS_CONFIG.map((config) => (
			<StatCard
				key={config.label}
				Icon={config.icon}
				label={config.label}
				amount={0}
				description=""
				isLoading={true}
			/>
		))}
	</div>
);

UserStatsContainerSkeleton.displayName = "UserStatsContainerSkeleton";

export const UserStatsContainer = memo(
	async ({ userId }: { userId: string }) => {
		const { data } = await getUser(userId);

		return (
			<div
				className="w-full sm:w-full xl:w-1/3 flex flex-col gap-3 sm:gap-4 
                      transition-all duration-300 ease-in-out"
			>
				{STAT_CARDS_CONFIG.map((config) => (
					<StatCard
						key={config.label}
						Icon={config.icon}
						label={config.label}
						amount={config.getAmount(data)}
						description={config.description}
					/>
				))}
			</div>
		);
	}
);

UserStatsContainer.displayName = "UserStatsContainer";
