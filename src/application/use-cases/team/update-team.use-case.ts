import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, Team } from "@prisma/client";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { CreateTeamDTO } from "../../dtos/team.dto";
import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

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
			try {
				const team = await this.teamRepository.findById(teamId);

				if (!team) {
					throw new NotFoundError("Team not found");
				}

				if (data.name?.length === 0) {
					throw new ValidationError("Team name can not be empty");
				}

				if (data.membersIds?.length === 0) {
					throw new ValidationError(
						"Team members Ids can not be empty, use remove members action instead"
					);
				}

				const memberPromises = data.membersIds
					? data.membersIds.map((memberId) => {
							const teamMember = TeamMemberEntity.create({
								teamId,
								userId: memberId,
								role: "MEMBER",
							});
							return this.teamMemberRepository.create(
								teamMember,
								tx
							);
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
			} catch (error) {
				if (error instanceof BaseError) {
					throw error;
				}
				throw new InternalServerError(
					"An unexpected error occured",
					error
				);
			}
		});
	}
}
