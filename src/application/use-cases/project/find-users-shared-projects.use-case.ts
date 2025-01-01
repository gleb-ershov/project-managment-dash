import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindUsersSharedProjectsUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<ProjectEntity[]> {
		try {
			const projects =
				await this.projectRepository.findUsersSharedProjects(
					currentUserId,
					userId
				);
			if (!projects) {
				throw new NotFoundError("No projects was found");
			}

			return projects;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
