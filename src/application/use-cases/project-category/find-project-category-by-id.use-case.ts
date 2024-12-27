import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";

export class FindProjectCategoryByIdUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(id: string): Promise<ProjectCategoryEntity | null> {
		const category = await this.projectCategoryRepository.findById(id);
		if (!category) {
			throw new ValidationError("No users were found");
		}
		return category;
	}
}
