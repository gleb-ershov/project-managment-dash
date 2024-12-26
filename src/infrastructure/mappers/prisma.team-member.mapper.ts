import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { Team, TeamMember, User } from "@prisma/client";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { TeamMemberWithRelations } from "./mapper.types";

export class PrismaTeamMemberMapper {
	static toDomain(
		prismaTeamMember: TeamMemberWithRelations
	): TeamMemberEntity {
		const user =
			prismaTeamMember.user &&
			new UserEntity(
				prismaTeamMember.user.id,
				Email.create(prismaTeamMember.user.email),
				prismaTeamMember.user.name,
				prismaTeamMember.user.surname,
				prismaTeamMember.user.imageUrl,
				prismaTeamMember.user.plan,
				prismaTeamMember.user.description,
				undefined
			);

		const team =
			prismaTeamMember.team &&
			new TeamEntity(
				prismaTeamMember.team.id,
				prismaTeamMember.team.name,
				prismaTeamMember.team.description || null,
				prismaTeamMember.team.createdAt,
				prismaTeamMember.team.updatedAt,
				[] // Empty array for team members to avoid circular reference
			);

		return new TeamMemberEntity(
			prismaTeamMember.id,
			prismaTeamMember.teamId,
			prismaTeamMember.userId,
			prismaTeamMember.role,
			prismaTeamMember.joinedAt,
			user,
			team
		);
	}

	static toPrisma(
		entity: TeamMemberEntity
	): Omit<TeamMember, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			teamId: entity.teamId,
			userId: entity.userId,
			role: entity.role,
			joinedAt: entity.joinedAt,
		};
	}
}
