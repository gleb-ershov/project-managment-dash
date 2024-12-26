import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { ValidationError } from "@/src/domain/errors/application.error";

export class GetUserTeamsCountUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(userId: string): Promise<number> {
		if (!userId) {
			throw new ValidationError("User ID is required");
		}

		const teamsCount = await this.teamRepository.countTeamsByUserId(userId);
		return teamsCount;
	}
}
