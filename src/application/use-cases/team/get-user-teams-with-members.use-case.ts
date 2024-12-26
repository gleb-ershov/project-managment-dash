import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";

export class GetUserTeamsUseCase {
	constructor(private readonly teamRepository: ITeamRepository) {}

	async execute(userId: string, limit?: number): Promise<TeamEntity[]> {
		if (!userId) {
			throw new Error("User ID is required");
		}

		try {
			const teams = await this.teamRepository.findByUserId(userId, limit);
			return teams;
		} catch {
			throw new Error(`Failed to fetch user teams`);
		}
	}
}
