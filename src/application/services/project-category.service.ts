import { CreateProjectCategoryUseCase } from "../use-cases/project-category/create-project-category.use-case";
import { UpdateProjectCategoryUseCase } from "../use-cases/project-category/update-project-category.use-case";
import { DeleteProjectCategoryUseCase } from "../use-cases/project-category/delete-project-category.use-case";
import {
	CreateProjectCategoryDTO,
	UpdateProjectCategoryDTO,
} from "../dtos/project-category.dto";
import { ProjectCategoryViewModel } from "../view-models/project-category.view-model";
import { ProjectCategoryMapper } from "../mappers/project-category.mapper";
import { FindProjectCategoriesByQueryUseCase } from "../use-cases/project-category/find-project-category.use-case";

export class ProjectCategoryService {
	constructor(
		private readonly createProjectCategoryUseCase: CreateProjectCategoryUseCase,
		private readonly updateProjectCategoryUseCase: UpdateProjectCategoryUseCase,
		private readonly deleteProjectUseCase: DeleteProjectCategoryUseCase,
		private readonly findCategoriesByQueryUseCase: FindProjectCategoriesByQueryUseCase
	) {}

	async findCategoriesByQuery(
		query: string
	): Promise<ProjectCategoryViewModel[]> {
		const categories = await this.findCategoriesByQueryUseCase.execute(
			query
		);
		return categories.map((category) =>
			ProjectCategoryMapper.toViewModel(category)
		);
	}

	async createProjectCategory(
		fields: CreateProjectCategoryDTO
	): Promise<ProjectCategoryViewModel> {
		const projectCategory = await this.createProjectCategoryUseCase.execute(
			fields
		);
		return ProjectCategoryMapper.toViewModel(projectCategory);
	}

	async updateProjectCategory(
		id: string,
		fields: UpdateProjectCategoryDTO
	): Promise<ProjectCategoryViewModel> {
		const projectCategory = await this.updateProjectCategoryUseCase.execute(
			id,
			{ ...fields }
		);
		return ProjectCategoryMapper.toViewModel(projectCategory);
	}

	async deleteProjectCategory(id: string): Promise<void> {
		return this.deleteProjectUseCase.execute(id);
	}
}
