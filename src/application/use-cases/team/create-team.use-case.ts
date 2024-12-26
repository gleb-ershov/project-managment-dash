import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { CreateTeamDTO } from "../../dtos/team.dto";

export class CreateTeamUseCase {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(dto: CreateTeamDTO): Promise<TeamEntity> {
		const team = TeamEntity.create({
			name: dto.name,
			description: dto.description,
		});

		return this.teamRepository.create(team);
	}
}
