import { CreateTeamWithMembersUseCase } from "../use-cases/team/create-team-with-members";
import { CreateTeamDTO } from "../dtos/team.dto";
import { TeamViewModel } from "../view-models/team.view-model";
import { TeamMapper } from "../mappers/team.mapper";

export class TeamMemberService {
	constructor(
		private readonly createTeamWithMembersUseCase: CreateTeamWithMembersUseCase
	) {}

	async createTeamWithMembers(
		creatorId: string,
		payload: CreateTeamDTO
	): Promise<TeamViewModel> {
		const team = await this.createTeamWithMembersUseCase.execute(
			payload,
			creatorId
		);
		return TeamMapper.toViewModel(team);
	}
}
