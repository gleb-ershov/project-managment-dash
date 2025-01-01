import { ValidationError } from "@/src/domain/errors/application.error";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { TeamEntity } from "@/src/domain/enitites/team.entity";

export class FindUsersSharedTeamsUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<TeamEntity[]> {
		const teams = await this.teamRepository.findUsersSharedTeams(
			currentUserId,
			userId
		);
		if (!teams) {
			throw new ValidationError("No projects was found");
		}

		return teams;
	}
}
