import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { CreateProjectCategoryDTO } from "../../dtos/project-category.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateProjectCategoryUseCase {
	constructor(
		private projectCategoryRepository: IProjectCategoryRepository
	) {}

	async execute(
		dto: CreateProjectCategoryDTO
	): Promise<ProjectCategoryEntity> {
		try {
			if (dto.name.length === 0) {
				throw new ValidationError("Category name can not be empty");
			}

			const category = ProjectCategoryEntity.create({
				name: dto.name,
			});

			return this.projectCategoryRepository.create(category);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
