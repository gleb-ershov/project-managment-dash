import { CreateProjectUseCase } from "../use-cases/project/create-project.use-case";
import { UpdateProjectUseCase } from "../use-cases/project/update-project.use-case";
import { DeleteProjectUseCase } from "../use-cases/project/delete-project.use-case";
import { SoftDeleteProjectUseCase } from "../use-cases/project/soft-delete-project.use-case";
import { FindProjectByIdUseCase } from "../use-cases/project/find-project-by-id.use-case";
import { FindProjectsByUserIdUseCase } from "../use-cases/project/find-projects-by-user-id.use-case";
import { GetUserFinishedProjectsCountUseCase } from "../use-cases/project/get-user-finished-projects-count.use-case";
import { FindWithFiltersAndSortUseCase } from "../use-cases/project/find-with-filters-and-sort.use-case";
import { ProjectStatus } from "@prisma/client";
import { CreateProjectDTO, UpdateProjectDTO } from "../dtos/project.dto";
import { ProjectMapper } from "../mappers/project.mapper";
import { ProjectViewModel } from "../view-models/project.view-model";
import { FindProjectsByQueryAndUserUseCase } from "../use-cases/project/find-projects-by-query-and-user.use-case";
import { FindUsersSharedProjectsUseCase } from "../use-cases/project/find-users-shared-projects.use-case";
import {
	DatabaseError,
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

interface FindWithFiltersAndSortUseCaseRequest {
	userId: string;
	searchQuery?: string;
	status?: ProjectStatus;
	sortBy?: "latest" | "oldest";
}

export class ProjectService {
	constructor(
		private readonly createProjectUseCase: CreateProjectUseCase,
		private readonly updateProjectUseCase: UpdateProjectUseCase,
		private readonly deleteProjectUseCase: DeleteProjectUseCase,
		private readonly softDeleteProjectUseCase: SoftDeleteProjectUseCase,
		private readonly findProjectByIdUseCase: FindProjectByIdUseCase,
		private readonly findProjectsByUserIdUseCase: FindProjectsByUserIdUseCase,
		private readonly getUserFinishedProjectsCountUseCase: GetUserFinishedProjectsCountUseCase,
		private readonly findWithFiltersAndSortUseCase: FindWithFiltersAndSortUseCase,
		private readonly findProjectsByQueryUseCase: FindProjectsByQueryAndUserUseCase,
		private readonly findUsersSharedProjectsUseCase: FindUsersSharedProjectsUseCase
	) {}

	async findUsersSharedProjects(
		currentUserId: string,
		userId: string
	): Promise<ProjectViewModel[]> {
		try {
			const projects = await this.findUsersSharedProjectsUseCase.execute(
				currentUserId,
				userId
			);
			return ProjectMapper.toViewModels(projects);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findProjectsByQuery(
		userId: string,
		query: string
	): Promise<ProjectViewModel[]> {
		try {
			const projects = await this.findProjectsByQueryUseCase.execute(
				userId,
				query
			);
			return ProjectMapper.toViewModels(projects);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findWithFiltersAndSort(
		params: FindWithFiltersAndSortUseCaseRequest
	): Promise<ProjectViewModel[]> {
		try {
			const projects = await this.findWithFiltersAndSortUseCase.execute(
				params
			);
			return ProjectMapper.toViewModels(projects);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUserFinishedProjectsCount(userId: string): Promise<number> {
		try {
			return await this.getUserFinishedProjectsCountUseCase.execute(
				userId
			);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createProject(fields: CreateProjectDTO): Promise<ProjectViewModel> {
		try {
			const project = await this.createProjectUseCase.execute(fields);
			return ProjectMapper.toViewModel(project);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateProject(
		id: string,
		fields: UpdateProjectDTO
	): Promise<ProjectViewModel> {
		try {
			const project = await this.updateProjectUseCase.execute(id, {
				...fields,
			});
			return ProjectMapper.toViewModel(project);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async deleteProject(id: string): Promise<void> {
		try {
			await this.deleteProjectUseCase.execute(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async softDeleteProject(id: string): Promise<void> {
		try {
			await this.softDeleteProjectUseCase.execute(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findProjectById(id: string): Promise<ProjectViewModel | null> {
		try {
			const project = await this.findProjectByIdUseCase.execute(id);
			return project ? ProjectMapper.toViewModel(project) : null;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async findProjectsByUserId(userId: string): Promise<ProjectViewModel[]> {
		try {
			const projects = await this.findProjectsByUserIdUseCase.execute(
				userId
			);
			return ProjectMapper.toViewModels(projects);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
