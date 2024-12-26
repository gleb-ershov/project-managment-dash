import { TeamMapper } from "../mappers/team.mapper";
import { GetUserTeamsCountUseCase } from "../use-cases/team/get-user-teams-count.use-case";
import { GetUserTeamsUseCase } from "../use-cases/team/get-user-teams-with-members.use-case";
import { TeamViewModel } from "../view-models/team.view-model";

export class TeamService {
	constructor(
		private readonly getUserTeamsCountUseCase: GetUserTeamsCountUseCase,
		private readonly getUserTeamsUseCase: GetUserTeamsUseCase
	) {}

	async getUserTeamsCount(userId: string): Promise<number> {
		return await this.getUserTeamsCountUseCase.execute(userId);
	}
	async getUserTeams(userId: string): Promise<TeamViewModel[]> {
		const teams = await this.getUserTeamsUseCase.execute(userId);
		return TeamMapper.toViewModels(teams);
	}
}
