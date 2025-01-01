import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { UpdateProjectDTO, updateProjectSchema } from "../../dtos/project.dto";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class UpdateProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string, data: UpdateProjectDTO): Promise<ProjectEntity> {
		try {
			const parseResult = updateProjectSchema.safeParse(data);

			if (parseResult.error) {
				throw new ValidationError(
					"Validation error",
					parseResult.error
				);
			}

			const existingProject = await this.projectRepository.findById(id);
			if (!existingProject) {
				throw new NotFoundError("Project not found");
			}

			const updateData: UpdateProjectDTO = {};
			const { title, dueDate, description, status } = parseResult.data;

			// TODO create a mapper
			if (title) updateData.title = title;
			if (dueDate) updateData.dueDate = dueDate;
			if (status) updateData.status = status;
			if (description) updateData.description = description;
			if (data.membersIds) updateData.membersIds = data.membersIds;

			const updatedProject = await this.projectRepository.update(
				id,
				updateData
			);

			return updatedProject;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
