import {
	Project,
	ProjectCategory,
	Task,
	TaskComment,
	Team,
	TeamMember,
	User,
} from "@prisma/client";

export interface TaskCommentWithRelations extends TaskComment {
	// Required
	author: User;
	task: TaskWithRelations;
}

export type ProjectWithRelations = Project & {
	// Required
	createdBy: User;
	members?: User[];
	tasks?: TaskWithRelations[];
	categories?: ProjectCategory[];
};

export type TaskWithRelations = Task & {
	// Required
	createdBy: User;
	members?: User[];
	project: ProjectWithRelations;
	comments?: TaskCommentWithRelations[];
};

export interface TeamMemberWithRelations extends TeamMember {
	user?: User;
	team?: Team;
}

export type TeamWithRelations = Team & {
	members?: (TeamMember & {
		// Required
		user: User;
	})[];
};

export interface PrismaUserWithRelations extends User {
	tasks?: TaskWithRelations[];
	projects?: ProjectWithRelations[];
	taskComments?: TaskCommentWithRelations[];
	teamMembers?: TeamMemberWithRelations[];
}
