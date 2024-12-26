import { ProjectCategoryEntity } from "../enitites/project-category.entity";

export interface IProjectCategoryRepository {
	findById(id: string): Promise<ProjectCategoryEntity | null>;
	findAll(): Promise<ProjectCategoryEntity[]>;
	create(category: ProjectCategoryEntity): Promise<ProjectCategoryEntity>;
	update(category: ProjectCategoryEntity): Promise<ProjectCategoryEntity>;
	delete(id: string): Promise<void>;
	findByQuery(query: string): Promise<ProjectCategoryEntity[]>;
}
