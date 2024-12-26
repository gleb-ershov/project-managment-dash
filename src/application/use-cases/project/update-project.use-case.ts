import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { UpdateProjectDTO, updateProjectSchema } from "../../dtos/project.dto";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export class UpdateProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(id: string, data: UpdateProjectDTO): Promise<ProjectEntity> {
		const validatedData = updateProjectSchema.parse(data);

		const existingProject = await this.projectRepository.findById(id);
		if (!existingProject) {
			throw new ValidationError("Project not found");
		}

		const updateData: UpdateProjectDTO = {};

		if (validatedData.title) updateData.title = validatedData.title;
		if (validatedData.dueDate) updateData.dueDate = validatedData.dueDate;
		if (validatedData.status) updateData.status = validatedData.status;
		if ("description" in validatedData)
			updateData.description = validatedData.description;

		const updatedProject = await this.projectRepository.update(
			id,
			updateData
		);

		return updatedProject;
	}
}
