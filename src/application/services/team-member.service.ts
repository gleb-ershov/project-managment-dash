import { CreateTeamWithMembersUseCase } from "../use-cases/team/create-team-with-members.use-case";
import { CreateTeamDTO } from "../dtos/team.dto";
import { TeamViewModel } from "../view-models/team.view-model";
import { TeamMapper } from "../mappers/team.mapper";
import {
	DatabaseError,
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class TeamMemberService {
	constructor(
		private readonly createTeamWithMembersUseCase: CreateTeamWithMembersUseCase
	) {}

	async createTeamWithMembers(
		creatorId: string,
		payload: CreateTeamDTO
	): Promise<TeamViewModel> {
		try {
			const team = await this.createTeamWithMembersUseCase.execute(
				payload,
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
}
