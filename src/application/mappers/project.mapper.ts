import { UserMapper } from "./user.mapper";
import { format } from "date-fns";
import { ProjectViewModel } from "../view-models/project.view-model";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { TaskMapper } from "./task.mapper";
import { ProjectCategoryMapper } from "./project-category.mapper";

export class ProjectMapper {
	static toViewModel(entity: ProjectEntity): ProjectViewModel {
		return {
			id: entity.id,
			title: entity.title,
			userId: entity.userId,
			status: entity.status,
			dueDate: format(entity.dueDate, "PPP"),
			description: entity.description as string | undefined,
			createdAt: format(entity.createdAt, "PPP"),
			updatedAt: format(entity.updatedAt, "PPP"),

			// Map related entities if they exist
			members: entity.members
				? UserMapper.toViewModels(entity.members)
				: undefined,

			tasks: entity.tasks
				? TaskMapper.toViewModels(entity.tasks)
				: undefined,

			categories: entity.categories
				? ProjectCategoryMapper.toViewModels(entity.categories)
				: undefined,

			createdBy: entity.createdBy
				? UserMapper.toViewModel(entity.createdBy)
				: undefined,
		};
	}

	static toViewModels(entities: ProjectEntity[]): ProjectViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
