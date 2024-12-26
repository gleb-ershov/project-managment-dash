import { UserRole } from "@prisma/client";
import { TeamMemberEntity } from "../enitites/team-member.entity";

export interface ITeamMemberRepository {
	findByTeamId(teamId: string): Promise<TeamMemberEntity[]>;
	findByUserId(userId: string): Promise<TeamMemberEntity[]>;
	create(teamMember: TeamMemberEntity, tx?: any): Promise<TeamMemberEntity>;
	delete(teamId: string, userId: string): Promise<void>;
	updateRole(
		teamId: string,
		userId: string,
		role: UserRole
	): Promise<TeamMemberEntity>;
}
