import { Card, CardContent, CardHeader } from "../../ui/card";
import { getUsersSharedTeams } from "@/src/application/queries/team/get-users-shared-teams";
import { SharedEntityListCard } from "../../shared/shared-entity-list-card";
import { Separator } from "../../ui/separator";
import { UsersRound } from "lucide-react";

interface SharedTeamsListProps {
	userId: string;
	currentUserId: string;
}

export const SharedTeamsList = async ({
	userId,
	currentUserId,
}: SharedTeamsListProps) => {
	const teams = await getUsersSharedTeams(userId, currentUserId);
	return (
		<Card className="dark:bg-[#18181B] flex-1 h-[500px]">
			<CardHeader className="py-4 flex items-center justify-between flex-row">
				Shared teams
				<UsersRound
					size={20}
					strokeWidth={1.5}
					className="text-muted-foreground"
				/>
			</CardHeader>
			<Separator className="w-[90%] mx-auto" />
			<CardContent className="overflow-y-auto max-h-[80%] flex flex-col gap-4 w-[95%] pt-4">
				{teams.map((team) => (
					<SharedEntityListCard
						key={team.id}
						entity={team}
						type="team"
					/>
				))}
			</CardContent>
		</Card>
	);
};
