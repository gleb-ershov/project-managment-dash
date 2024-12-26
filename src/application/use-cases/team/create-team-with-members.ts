import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, Team } from "@prisma/client";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { CreateTeamDTO } from "../../dtos/team.dto";

export class CreateTeamWithMembersUseCase {
	constructor(
		private prisma: PrismaClient,
		private teamRepository: ITeamRepository,
		private teamMemberRepository: ITeamMemberRepository
	) {}

	async execute(data: CreateTeamDTO, creatorId: string): Promise<TeamEntity> {
		return this.prisma.$transaction(async (tx) => {
			const team = TeamEntity.create({
				name: data.name,
				description: data.description,
			});

			const createdTeam = await this.teamRepository.create(team, tx);

			const creatorMember = TeamMemberEntity.create({
				teamId: createdTeam.id,
				userId: creatorId,
				role: "ADMIN",
			});

			await this.teamMemberRepository.create(creatorMember, tx);

			const memberPromises = data.memberIds
				? data.memberIds.map((memberId) => {
						const teamMember = TeamMemberEntity.create({
							teamId: createdTeam.id,
							userId: memberId,
							role: "MEMBER",
						});
						return this.teamMemberRepository.create(teamMember, tx);
				  })
				: [];

			await Promise.all(memberPromises);

			return new TeamEntity(
				createdTeam.id,
				createdTeam.name,
				createdTeam.description,
				createdTeam.createdAt,
				createdTeam.updatedAt,
				createdTeam.teamMembers
			);
		});
	}
}
