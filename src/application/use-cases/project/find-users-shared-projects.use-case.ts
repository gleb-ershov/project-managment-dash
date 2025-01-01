import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export class FindUsersSharedProjectsUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<ProjectEntity[]> {
		const projects = await this.projectRepository.findUsersSharedProjects(
			currentUserId,
			userId
		);
		if (!projects) {
			throw new ValidationError("No projects was found");
		}

		return projects;
	}
}
