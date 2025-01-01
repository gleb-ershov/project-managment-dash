import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class GetUserTeamsCountUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(userId: string): Promise<number> {
		try {
			if (!userId) {
				throw new ValidationError("User ID is required");
			}

			const teamsCount = await this.teamRepository.countTeamsByUserId(
				userId
			);
			return teamsCount;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
