import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { NotFoundError } from "@/src/domain/errors/application.error";
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
	}
}
