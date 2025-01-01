import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";

export class SoftDeleteProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string): Promise<void> {
		try {
			const existingProject = await this.projectRepository.findById(id);
			if (!existingProject) {
				throw new NotFoundError("Project not found");
			}

			await this.projectRepository.softDelete(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
