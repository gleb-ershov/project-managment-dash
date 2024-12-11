import { getUserRelatedTeams } from '@/utils/data-access/getUserRelatedTeams';
import { UserTeamsMembersListCardSkeleton } from './UserTeamsMembersListCardSkeleton';
import { UserTeamsMembersListCard } from './UserTeamsMembersListCard';

export const UserTeamsMembersList = async () => {
    const teams = await getUserRelatedTeams('');
    if ('data' in teams) {
        return (
            <>
                {teams.data.length > 0 ? (
                    <>
                        {teams.data.map((team) =>
                            team.users.map((user) => (
                                <UserTeamsMembersListCard {...user} />
                            ))
                        )}
                    </>
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-[#BBBBBC]">
                        No teams
                    </span>
                )}
            </>
        );
    }
    return <>error</>;
};
