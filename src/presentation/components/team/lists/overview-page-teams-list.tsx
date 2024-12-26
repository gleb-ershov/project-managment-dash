import Link from "next/link";
import { OverviewPageTeamsListCard } from "../cards/overview-page-team-list-card";
import { getUserTeams } from "@/src/application/queries/team/get-user-teams";
import { AddEntityButton } from "../../shared/add-entity-button";

export const OverviewPageTeamsList = async () => {
	const teams = await getUserTeams();

	if (!teams?.length) {
		return (
			<div className="flex flex-col gap-4 h-full w-full items-center justify-center">
				<Link
					href="/teams/create"
					className="text-sm rounded-lg bg-pink-200 text-[#131313] w-full text-center py-2"
				>
					Create team
				</Link>
				<span className="text-neutral-400">No teams</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<AddEntityButton
				path="/teams/create"
				label="Create new team"
				className="h-[32px]"
			/>
			{teams.flatMap((team) => (
				<OverviewPageTeamsListCard key={team.id} {...team} />
			))}
		</div>
	);
};
