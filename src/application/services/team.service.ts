import { UpdateTeamUseCase } from "./../use-cases/team/update-team.use-case";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { TeamMapper } from "../mappers/team.mapper";
import { GetUserTeamsCountUseCase } from "../use-cases/team/get-user-teams-count.use-case";
import { GetUserTeamsUseCase } from "../use-cases/team/get-user-teams-with-members.use-case";
import { TeamViewModel } from "../view-models/team.view-model";
import { CreateTeamDTO } from "../dtos/team.dto";
import { DeleteTeamUseCase } from "../use-cases/team/delete-team.use-case";
import { FindTeamByIdUseCase } from "../use-cases/team/find-team-by-id.use-case";
import { FindUsersSharedTeamsUseCase } from "../use-cases/team/find-users-shared-teams.use-case";
import {
	DatabaseError,
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class TeamService {
	constructor(
		private readonly getUserTeamsCountUseCase: GetUserTeamsCountUseCase,
		private readonly getUserTeamsUseCase: GetUserTeamsUseCase,
		private readonly findTeamByIdUseCase: FindTeamByIdUseCase,
		private readonly createTeamWithMembersUseCase: CreateTeamWithMembersUseCase,
		private readonly updateTeamUseCase: UpdateTeamUseCase,
		private readonly deleteTeamUseCase: DeleteTeamUseCase,
		private readonly findUsersSharedTeamsUseCase: FindUsersSharedTeamsUseCase
	) {}

	async findUsersSharedTeams(
		currentUserId: string,
		userId: string
	): Promise<TeamViewModel[]> {
		try {
			const teams = await this.findUsersSharedTeamsUseCase.execute(
				currentUserId,
				userId
			);
			return TeamMapper.toViewModels(teams);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findTeamById(teamId: string): Promise<TeamViewModel | null> {
		try {
			const team = await this.findTeamByIdUseCase.execute(teamId);
			return team ? TeamMapper.toViewModel(team) : null;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async deleteTeam(teamId: string): Promise<void> {
		try {
			await this.deleteTeamUseCase.execute(teamId);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUserTeamsCount(userId: string): Promise<number> {
		try {
			return await this.getUserTeamsCountUseCase.execute(userId);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUserTeams(userId: string): Promise<TeamViewModel[]> {
		try {
			const teams = await this.getUserTeamsUseCase.execute(userId);
			return TeamMapper.toViewModels(teams);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createTeamWithMembers(
		teamData: CreateTeamDTO,
		creatorId: string
	): Promise<TeamViewModel> {
		try {
			const team = await this.createTeamWithMembersUseCase.execute(
				teamData,
				creatorId
			);
			return TeamMapper.toViewModel(team);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateTeam(
		teamData: CreateTeamDTO,
		teamId: string
	): Promise<TeamViewModel> {
		try {
			const team = await this.updateTeamUseCase.execute(teamData, teamId);
			return TeamMapper.toViewModel(team);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
