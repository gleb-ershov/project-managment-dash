import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindProjectCategoriesByQueryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(query: string): Promise<ProjectCategoryEntity[]> {
		try {
			const categories = await this.projectCategoryRepository.findByQuery(
				query
			);
			if (!categories) {
				throw new NotFoundError("No categories were found");
			}
			return categories;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
