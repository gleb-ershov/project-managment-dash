import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { CreateProjectCategoryDTO } from "../../dtos/project-category.dto";

export class CreateProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(
		dto: CreateProjectCategoryDTO
	): Promise<ProjectCategoryEntity> {
		const category = ProjectCategoryEntity.create({
			name: dto.name,
		});

		return this.projectCategoryRepository.create(category);
	}
}
