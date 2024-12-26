import { ProjectViewModel } from "./project.view-model";
import { TaskCommentViewModel } from "./task-comment.view-model";
import { UserViewModel } from "./user.view-model";

export interface TaskViewModel {
	id: string;
	title: string;
	userId: string;
	projectId: string;
	priority: string;
	status: string;
	dueDate: string;
	externalLinks: string[];
	tags: string[];
	description?: string;
	createdAt: string;
	updatedAt: string;

	project?: ProjectViewModel;
	createdBy?: UserViewModel;
	members?: UserViewModel[];
	comments?: TaskCommentViewModel[];
}
