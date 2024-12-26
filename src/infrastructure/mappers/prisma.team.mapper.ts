import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { Team, TeamMember, User } from "@prisma/client";
import { PrismaTeamMemberMapper } from "./prisma.team-member.mapper";
import { TeamWithRelations } from "./mapper.types";

export class PrismaTeamMapper {
	static toDomain(prismaTeam: TeamWithRelations): TeamEntity {
		// First create the team entity without members
		const team = TeamEntity.reconstitute({
			id: prismaTeam.id,
			name: prismaTeam.name,
			description: prismaTeam.description,
			createdAt: prismaTeam.createdAt,
			updatedAt: prismaTeam.updatedAt,
			teamMembers: [], // Initialize with empty array
		});

		// Then map the members with both user and team references
		const teamMembers = prismaTeam.members
			? prismaTeam.members.map((member) =>
					PrismaTeamMemberMapper.toDomain({
						id: member.id,
						teamId: prismaTeam.id,
						userId: member.user.id,
						role: member.role,
						joinedAt: member.joinedAt,
						user: member.user,
						team: prismaTeam,
					})
			  )
			: [];

		// Reconstitute the team with members
		return TeamEntity.reconstitute({
			id: prismaTeam.id,
			name: prismaTeam.name,
			description: prismaTeam.description,
			createdAt: prismaTeam.createdAt,
			updatedAt: prismaTeam.updatedAt,
			teamMembers: teamMembers,
		});
	}

	static toPrisma(entity: TeamEntity): Omit<Team, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
		};
	}
}
