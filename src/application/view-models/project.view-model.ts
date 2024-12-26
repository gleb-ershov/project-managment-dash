import { ProjectCategoryViewModel } from "./project-category.view-model";
import { TaskViewModel } from "./task.view-model";
import { UserViewModel } from "./user.view-model";

export interface ProjectViewModel {
	id: string;
	title: string;
	userId: string;
	status: string;
	description?: string;
	dueDate: string;
	createdAt: string;
	updatedAt: string;

	createdBy?: UserViewModel;
	members?: UserViewModel[];
	tasks?: TaskViewModel[];
	categories?: ProjectCategoryViewModel[];
}
