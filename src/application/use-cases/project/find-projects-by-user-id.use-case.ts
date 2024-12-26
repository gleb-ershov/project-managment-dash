import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export class FindProjectsByUserIdUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(userId: string): Promise<ProjectEntity[]> {
		const projects = await this.projectRepository.findByUserId(userId);
		if (!projects) {
			throw new ValidationError("No projects was found");
		}

		return projects;
	}
}
