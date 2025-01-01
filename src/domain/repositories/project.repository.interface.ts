import { ProjectStatus } from "@prisma/client";
import { ProjectEntity } from "./../enitites/project.entity";

export interface ProjectFiltersAndSort {
	userId: string;
	searchQuery?: string;
	status?: ProjectStatus;
	sortBy: "latest" | "oldest";
}

export interface IProjectRepository {
	create(data: ProjectEntity): Promise<ProjectEntity>;
	update(id: string, project: Partial<ProjectEntity>): Promise<ProjectEntity>;
	delete(id: string): Promise<void>;
	softDelete(id: string): Promise<void>;
	findById(id: string): Promise<ProjectEntity | null>;
	findByUserId(userId: string): Promise<ProjectEntity[]>;
	addMember(projectId: string, membersIds: string[]): Promise<ProjectEntity>;
	findUsersSharedProjects(
		currentUserId: string,
		userId: string
	): Promise<ProjectEntity[]>;
	// removeMember(projectId: string, userId: string): Promise<ProjectEntity>;
	findFinishedProjectsByUserId(userId: string): Promise<ProjectEntity[]>;
	findWithFiltersAndSort(
		params: ProjectFiltersAndSort
	): Promise<ProjectEntity[]>;
	findByQueryAndUser(query: string, userId: string): Promise<ProjectEntity[]>;
}
