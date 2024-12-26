import { TaskViewModel } from "./task.view-model";
import { UserViewModel } from "./user.view-model";

export interface TaskCommentViewModel {
	id: string;
	taskId: string;
	content: string;
	createdAt: string;
	updatedAt: string;

	task?: TaskViewModel;
	author?: UserViewModel;
}
