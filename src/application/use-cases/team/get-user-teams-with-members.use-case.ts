import { TeamEntity } from "@/src/domain/enitites/team.entity";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";

export class GetUserTeamsUseCase {
	constructor(private readonly teamRepository: ITeamRepository) {}

	async execute(userId: string, limit?: number): Promise<TeamEntity[]> {
		try {
			if (!userId) {
				throw new ValidationError("User ID is required");
			}
			const teams = await this.teamRepository.findByUserId(userId, limit);
			return teams;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
