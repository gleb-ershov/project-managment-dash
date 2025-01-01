import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";

export class DeleteProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(id: string): Promise<void> {
		try {
			return this.projectCategoryRepository.delete(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
