import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { CreateProjectDTO, createprojectSchema } from "../../dtos/project.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(data: CreateProjectDTO): Promise<ProjectEntity> {
		try {
			const parseResult = createprojectSchema.safeParse(data);

			if (parseResult.error) {
				throw new ValidationError(
					"Validation error",
					parseResult.error
				);
			}

			const projectEntity = ProjectEntity.create({
				...parseResult.data,
				membersIds: data.membersIds,
				categoriesIds: data.categoriesIds,
			});

			const createdProject = await this.projectRepository.create(
				projectEntity
			);
			return createdProject;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
