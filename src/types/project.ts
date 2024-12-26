import { Project, ProjectCategory, ProjectStatus, User } from "@prisma/client";

export type UpdateProjectArgs = Partial<{
	title: string;
	description: string;
	dueDate: Date;
	status: ProjectStatus;
}>;

export type CreateProjectArgs = {
	title: string;
	description: string;
	dueDate: Date;
	status: ProjectStatus;
	userId: string;
};

export type Member = Omit<User, "password">;

export interface ProjectWithMembers extends Project {
	members: Member[];
}

export interface ProjectWithRelations extends ProjectWithMembers {
	createdBy: User;
	categories?: ProjectCategory[];
}
