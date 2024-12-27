import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";

export class DeleteTeamUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(teamId: string): Promise<void> {
		await this.teamRepository.delete(teamId);
	}
}
