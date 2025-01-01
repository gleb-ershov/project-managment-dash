import { CreateProjectCategoryUseCase } from "../use-cases/project-category/create-project-category.use-case";
import { UpdateProjectCategoryUseCase } from "../use-cases/project-category/update-project-category.use-case";
import { DeleteProjectCategoryUseCase } from "../use-cases/project-category/delete-project-category.use-case";
import {
	CreateProjectCategoryDTO,
	UpdateProjectCategoryDTO,
} from "../dtos/project-category.dto";
import { ProjectCategoryViewModel } from "../view-models/project-category.view-model";
import { ProjectCategoryMapper } from "../mappers/project-category.mapper";
import { FindProjectCategoriesByQueryUseCase } from "../use-cases/project-category/find-project-category-by-query.use-case";
import { FindProjectCategoryByIdUseCase } from "../use-cases/project-category/find-project-category-by-id.use-case";
import {
	InternalServerError
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class ProjectCategoryService {
	constructor(
		private readonly createProjectCategoryUseCase: CreateProjectCategoryUseCase,
		private readonly updateProjectCategoryUseCase: UpdateProjectCategoryUseCase,
		private readonly deleteProjectUseCase: DeleteProjectCategoryUseCase,
		private readonly findCategoriesByQueryUseCase: FindProjectCategoriesByQueryUseCase,
		private readonly findCategoryByIdUseCase: FindProjectCategoryByIdUseCase
	) {}

	async findCategoryById(
		id: string
	): Promise<ProjectCategoryViewModel | null> {
		try {
			const projectCategory = await this.findCategoryByIdUseCase.execute(
				id
			);
			return projectCategory
				? ProjectCategoryMapper.toViewModel(projectCategory)
				: null;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findCategoriesByQuery(
		query: string
	): Promise<ProjectCategoryViewModel[]> {
		try {
			const categories = await this.findCategoriesByQueryUseCase.execute(
				query
			);
			return categories.map((category) =>
				ProjectCategoryMapper.toViewModel(category)
			);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createProjectCategory(
		fields: CreateProjectCategoryDTO
	): Promise<ProjectCategoryViewModel> {
		try {
			const projectCategory =
				await this.createProjectCategoryUseCase.execute(fields);
			return ProjectCategoryMapper.toViewModel(projectCategory);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateProjectCategory(
		id: string,
		fields: UpdateProjectCategoryDTO
	): Promise<ProjectCategoryViewModel> {
		try {
			const projectCategory =
				await this.updateProjectCategoryUseCase.execute(id, {
					...fields,
				});
			return ProjectCategoryMapper.toViewModel(projectCategory);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async deleteProjectCategory(id: string): Promise<void> {
		try {
			return this.deleteProjectUseCase.execute(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
