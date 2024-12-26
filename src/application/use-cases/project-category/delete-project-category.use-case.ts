import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";

export class DeleteProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(id: string): Promise<void> {
		return this.projectCategoryRepository.delete(id);
	}
}
