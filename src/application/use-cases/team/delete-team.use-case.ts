import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";

export class DeleteTeamUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(teamId: string): Promise<void> {
		try {
			await this.teamRepository.delete(teamId);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
