import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindProjectByIdUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string): Promise<ProjectEntity | null> {
		try {
			const project = await this.projectRepository.findById(id);
			if (!project) {
				throw new NotFoundError("Project not found");
			}

			return project;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
