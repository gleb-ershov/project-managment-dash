import { UpdateTeamUseCase } from "./../use-cases/team/update-team.use-case";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { TeamMapper } from "../mappers/team.mapper";
import { GetUserTeamsCountUseCase } from "../use-cases/team/get-user-teams-count.use-case";
import { GetUserTeamsUseCase } from "../use-cases/team/get-user-teams-with-members.use-case";
import { TeamViewModel } from "../view-models/team.view-model";
import { CreateTeamDTO } from "../dtos/team.dto";
import { DeleteTeamUseCase } from "../use-cases/team/delete-team.use-case";
import { FindTeamByIdUseCase } from "../use-cases/team/find-team-by-id.use-case";

export class TeamService {
	constructor(
		private readonly getUserTeamsCountUseCase: GetUserTeamsCountUseCase,
		private readonly getUserTeamsUseCase: GetUserTeamsUseCase,
		private readonly findTeamByIdUseCase: FindTeamByIdUseCase,
		private readonly createTeamWithMembersUseCase: CreateTeamWithMembersUseCase,
		private readonly updateTeamUseCase: UpdateTeamUseCase,
		private readonly deleteTeamUseCase: DeleteTeamUseCase
	) {}

	async findTeamById(teamId: string): Promise<TeamViewModel | null> {
		const team = await this.findTeamByIdUseCase.execute(teamId);
		return team ? TeamMapper.toViewModel(team) : null;
	}

	async deleteTeam(teamId: string): Promise<void> {
		await this.deleteTeamUseCase.execute(teamId);
	}

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
