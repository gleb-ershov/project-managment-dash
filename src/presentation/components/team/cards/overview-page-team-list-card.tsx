import { memo } from "react";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import Link from "next/link";
import { TeamViewModel } from "@/src/application/view-models/team.view-model";
import { UserViewModel } from "@/src/application/view-models/user.view-model";

export const OverviewPageTeamsListCard = memo((props: TeamViewModel) => {
	const { name, id, teamMembers } = props;
	const membersToUser = teamMembers
		? teamMembers.map((member) => {
				const { user } = member;
				return user as UserViewModel;
		  })
		: null;

	return (
		<div className="flex items-center justify-between h-[32px] bg-gray-50 rounded-lg px-2">
			<Link
				href={`/teams/${id}`}
				className="text-sm text-gray-600 hover:text-black duration-300"
			>
				{name}
			</Link>
			{membersToUser ? (
				<LinkedUsersAvatarList
					members={membersToUser}
					labelVisible={false}
				/>
			) : null}
		</div>
	);
});

OverviewPageTeamsListCard.displayName = "OverviewPageTeamsListCard";
