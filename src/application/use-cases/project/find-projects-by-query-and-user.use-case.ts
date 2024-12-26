import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export class FindProjectsByQueryAndUserUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(query: string, userId: string): Promise<ProjectEntity[]> {
		const projects = await this.projectRepository.findByQueryAndUser(
			query,
			userId
		);
		if (!projects) {
			throw new ValidationError("No users were found");
		}
		return projects;
	}
}
