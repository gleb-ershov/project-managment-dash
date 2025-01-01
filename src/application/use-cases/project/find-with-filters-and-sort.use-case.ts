import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ProjectStatus } from "@prisma/client";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { BaseError } from "@/src/domain/errors/base.error";

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
		try {
			const projects =
				await this.projectRepository.findWithFiltersAndSort({
					userId: params.userId,
					searchQuery: params.searchQuery,
					status: params.status,
					sortBy: params.sortBy || "latest",
				});
			if (!projects) {
				throw new NotFoundError(
					"No projects with this filters were found"
				);
			}

			return projects;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
