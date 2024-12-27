import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { TeamEntity } from "@/src/domain/enitites/team.entity";

export class FindTeamByIdUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(id: string): Promise<TeamEntity | null> {
		const team = await this.teamRepository.findById(id);
		return team;
	}
}
