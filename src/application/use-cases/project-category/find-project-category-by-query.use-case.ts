import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";

export class FindProjectCategoriesByQueryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(query: string): Promise<ProjectCategoryEntity[]> {
		const categories = await this.projectCategoryRepository.findByQuery(
			query
		);
		if (!categories) {
			throw new ValidationError("No users were found");
		}
		return categories;
	}
}
