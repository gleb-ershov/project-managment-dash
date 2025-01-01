import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindTeamByIdUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(id: string): Promise<TeamEntity | null> {
		try {
			const team = await this.teamRepository.findById(id);
			return team;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
