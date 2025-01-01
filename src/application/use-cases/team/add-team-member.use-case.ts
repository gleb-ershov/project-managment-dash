import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { UserRole } from "@prisma/client";

export class AddTeamMemberUseCase {
	constructor(
		private teamRepository: ITeamRepository,
		private teamMemberRepository: ITeamMemberRepository
	) {}

	async execute(
		teamId: string,
		userId: string,
		role: UserRole
	): Promise<TeamMemberEntity> {
		try {
			const team = await this.teamRepository.findById(teamId);
			if (!team) {
				throw new NotFoundError("Team not found");
			}

			const teamMember = TeamMemberEntity.create({
				teamId,
				userId,
				role,
			});

			return this.teamMemberRepository.create(teamMember);
		} catch (error) {
			if (
				error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
