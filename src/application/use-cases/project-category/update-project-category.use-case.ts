import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { UpdateProjectCategoryDTO } from "../../dtos/project-category.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class UpdateProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(
		id: string,
		dto: UpdateProjectCategoryDTO
	): Promise<ProjectCategoryEntity> {
		try {
			if (!dto.name) {
				throw new ValidationError(
					"Name field is required for updating category data"
				);
			}

			const category = ProjectCategoryEntity.reconstitute({
				id,
				name: dto.name,
			});
			return this.projectCategoryRepository.update(category);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
