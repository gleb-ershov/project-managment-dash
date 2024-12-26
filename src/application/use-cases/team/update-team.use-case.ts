import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, Team } from "@prisma/client";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { CreateTeamDTO } from "../../dtos/team.dto";

export class UpdateTeamUseCase {
	constructor(
		private prisma: PrismaClient,
		private teamRepository: ITeamRepository,
		private teamMemberRepository: ITeamMemberRepository
	) {}

	async execute(
		data: Partial<CreateTeamDTO>,
		teamId: string
	): Promise<TeamEntity> {
		return this.prisma.$transaction(async (tx) => {
			const team = await this.teamRepository.findById(teamId);

			if (!team) {
				throw new Error("Team not found");
			}

			const memberPromises = data.memberIds
				? data.memberIds.map((memberId) => {
						const teamMember = TeamMemberEntity.create({
							teamId,
							userId: memberId,
							role: "MEMBER",
						});
						return this.teamMemberRepository.create(teamMember, tx);
				  })
				: [];

			await Promise.all(memberPromises);

			return new TeamEntity(
				team.id,
				team.name,
				team.description,
				team.createdAt,
				team.updatedAt,
				team.teamMembers
			);
		});
	}
}
