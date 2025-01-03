import { Suspense } from "react";
import { Clock, DollarSign } from "lucide-react";
import { StatsBlockSkeleton } from "../skeletons/stats-block-skeleton";
import { StatsFinishedProjectsBlock } from "./stats-finished-projects";
import { StatsTotalTeams } from "./stats-total-teams";
import { StatCard } from "./stat-card";

export const StatsWrapper = () => {
	return (
		<section className="mx-auto mt-8 flex w-[95%] items-center justify-center gap-16">
			<Suspense
				fallback={<StatsBlockSkeleton />}
				key="finished_projects_stat"
			>
				<StatsFinishedProjectsBlock />
			</Suspense>
			<Suspense fallback={<StatsBlockSkeleton />} key="total_teams_stat">
				<StatsTotalTeams />
			</Suspense>
			<StatCard
				icon={<Clock fill="#F3B947" color="white" size={28} />}
				value="20h 30m"
				label="Time Tracked (Week)"
			/>
			<StatCard
				icon={<DollarSign color="#DC49F3" size={28} />}
				value="2130$"
				label="Total Revenue"
			/>
		</section>
	);
};
