import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindProjectCategoryByIdUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(id: string): Promise<ProjectCategoryEntity | null> {
		try {
			const category = await this.projectCategoryRepository.findById(id);
			if (!category) {
				throw new NotFoundError("Category was not found");
			}
			return category;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
