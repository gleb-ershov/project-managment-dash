import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { CreateTeamDTO } from "../../dtos/team.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateTeamUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(dto: CreateTeamDTO): Promise<TeamEntity> {
		try {
			if (dto.name.length === 0) {
				throw new ValidationError("Team's name can not be empty");
			}
			const team = TeamEntity.create({
				name: dto.name,
				description: dto.description,
			});

			return this.teamRepository.create(team);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
