import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { CreateProjectDTO, createprojectSchema } from "../../dtos/project.dto";

export class CreateProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(data: CreateProjectDTO): Promise<ProjectEntity> {
		const validatedData = createprojectSchema.parse(data);

		const projectEntity = ProjectEntity.create({
			...validatedData,
			membersIds: data.memberIds,
			categoriesIds: data.categoriesIds,
		});

		const createdProject = await this.projectRepository.create(projectEntity);

		return createdProject;
	}
}
