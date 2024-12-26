import { UpdateTeamUseCase } from "./../use-cases/team/update-team.use-case";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { TeamMapper } from "../mappers/team.mapper";
import { GetUserTeamsCountUseCase } from "../use-cases/team/get-user-teams-count.use-case";
import { GetUserTeamsUseCase } from "../use-cases/team/get-user-teams-with-members.use-case";
import { TeamViewModel } from "../view-models/team.view-model";
import { CreateTeamDTO } from "../dtos/team.dto";

export class TeamService {
	constructor(
		private readonly getUserTeamsCountUseCase: GetUserTeamsCountUseCase,
		private readonly getUserTeamsUseCase: GetUserTeamsUseCase,
		private readonly createTeamWithMembersUseCase: CreateTeamWithMembersUseCase,
		private readonly updateTeamUseCase: UpdateTeamUseCase
	) {}

	async getUserTeamsCount(userId: string): Promise<number> {
		return await this.getUserTeamsCountUseCase.execute(userId);
	}

	async getUserTeams(userId: string): Promise<TeamViewModel[]> {
		const teams = await this.getUserTeamsUseCase.execute(userId);
		return TeamMapper.toViewModels(teams);
	}

	async createTeamWithMembers(
		teamData: CreateTeamDTO,
		creatorId: string
	): Promise<TeamViewModel> {
		const team = await this.createTeamWithMembersUseCase.execute(
			teamData,
			creatorId
		);
		return TeamMapper.toViewModel(team);
	}

	async updateTeam(
		teamData: CreateTeamDTO,
		teamId: string
	): Promise<TeamViewModel> {
		const team = await this.updateTeamUseCase.execute(teamData, teamId);
		return TeamMapper.toViewModel(team);
	}
}
