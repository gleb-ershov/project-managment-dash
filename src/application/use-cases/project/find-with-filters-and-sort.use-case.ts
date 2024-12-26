import { ValidationError } from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectStatus } from "@prisma/client";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";

export interface FindWithFiltersAndSortUseCaseRequest {
	userId: string;
	searchQuery?: string;
	status?: ProjectStatus;
	sortBy?: "latest" | "oldest";
}

export class FindWithFiltersAndSortUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(
		params: FindWithFiltersAndSortUseCaseRequest
	): Promise<ProjectEntity[]> {
		if (!params.userId) {
			throw new ValidationError("User ID is required");
		}

		const projects = await this.projectRepository.findWithFiltersAndSort({
			userId: params.userId,
			searchQuery: params.searchQuery,
			status: params.status,
			sortBy: params.sortBy || "latest",
		});

		if (!projects) {
			return [];
		}
		return projects;
	}
}
