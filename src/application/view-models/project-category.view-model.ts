import { ProjectViewModel } from "./project.view-model";

export interface ProjectCategoryViewModel {
	id: string;
	name: string;

	projects?: ProjectViewModel[];
}
