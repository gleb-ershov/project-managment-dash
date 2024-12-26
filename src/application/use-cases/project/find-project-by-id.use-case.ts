import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export class FindProjectByIdUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string): Promise<ProjectEntity | null> {
		const project = await this.projectRepository.findById(id);
		if (!project) {
			throw new ValidationError("Project not found");
		}

		return project;
	}
}
