import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindUsersSharedTeamsUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<TeamEntity[]> {
		try {
			const teams = await this.teamRepository.findUsersSharedTeams(
				currentUserId,
				userId
			);
			if (!teams) {
				throw new NotFoundError("No projects was found");
			}

			return teams;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
