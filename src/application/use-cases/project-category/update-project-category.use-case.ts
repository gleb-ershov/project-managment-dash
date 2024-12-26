import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { UpdateProjectCategoryDTO } from "../../dtos/project-category.dto";

export class UpdateProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(
		id: string,
		dto: UpdateProjectCategoryDTO
	): Promise<ProjectCategoryEntity> {
		if (!dto.name) {
			throw new Error("Name is required");
		}

		const category = ProjectCategoryEntity.reconstitute({
			id,
			name: dto.name,
		});
		return this.projectCategoryRepository.update(category);
	}
}
