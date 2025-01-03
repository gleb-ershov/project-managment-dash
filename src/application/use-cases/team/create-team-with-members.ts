import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, Team } from "@prisma/client";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { CreateTeamDTO } from "../../dtos/team.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateTeamWithMembersUseCase {
	constructor(
		private prisma: PrismaClient,
		private teamRepository: ITeamRepository,
		private teamMemberRepository: ITeamMemberRepository
	) {}

	async execute(data: CreateTeamDTO, creatorId: string): Promise<TeamEntity> {
		return this.prisma.$transaction(async (tx) => {
			try {
				if (data.name.length === 0) {
					throw new ValidationError("Team's name can not be empty");
				}

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

				if (!data.membersIds || data.membersIds?.length === 0) {
					throw new ValidationError(
						"Cannot pass an empty ids for members"
					);
				}

				const memberPromises = data.membersIds.map((memberId) => {
					const teamMember = TeamMemberEntity.create({
						teamId: createdTeam.id,
						userId: memberId,
						role: "MEMBER",
					});
					return this.teamMemberRepository.create(teamMember, tx);
				});

				const r = await Promise.all(memberPromises);
				console.log(r, "PROMSUS");
				return new TeamEntity(
					createdTeam.id,
					createdTeam.name,
					createdTeam.description,
					createdTeam.createdAt,
					createdTeam.updatedAt,
					createdTeam.teamMembers
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
