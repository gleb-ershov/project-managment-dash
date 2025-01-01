import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindProjectsByQueryAndUserUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(query: string, userId: string): Promise<ProjectEntity[]> {
		try {
			const projects = await this.projectRepository.findByQueryAndUser(
				query,
				userId
			);
			if (!projects) {
				throw new NotFoundError("No projects for this user were found");
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
