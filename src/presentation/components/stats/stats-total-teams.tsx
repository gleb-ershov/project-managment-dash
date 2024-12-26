import { Ellipsis, UsersRound } from "lucide-react";
import { getUserTeamsCount } from "../../../application/queries/team/get-user-teams-count";

export const StatsTotalTeams = async () => {
	const totalTeamsCount = await getUserTeamsCount();

	return (
		<div className="flex h-36 w-[200px] flex-col gap-2 rounded-lg border-[1px] border-[#f3f3f3] p-4 shadow-sm duration-300 hover:border-transparent">
			<div className="flex w-full justify-between">
				<span className="w-fit rounded-lg bg-[#FAFAFA] p-2">
					<UsersRound fill="#F3477D" color="#F3477D" size={28} />
				</span>
				<Ellipsis size={22} color="#8A8A8E" />
			</div>
			<span className="text-xl font-semibold text-[#050402]">
				{totalTeamsCount}
			</span>
			<span className="text-[#8A8A8E]">Total Teams</span>
		</div>
	);
};
