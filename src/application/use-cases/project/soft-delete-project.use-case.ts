import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";

export class SoftDeleteProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string): Promise<void> {
		const existingProject = await this.projectRepository.findById(id);
		if (!existingProject) {
			throw new ValidationError("Project not found");
		}

		await this.projectRepository.softDelete(id);
	}
}
