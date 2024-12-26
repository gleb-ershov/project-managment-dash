import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { ProjectCategoryViewModel } from "../view-models/project-category.view-model";
import { ProjectMapper } from "./project.mapper";

export class ProjectCategoryMapper {
	static toViewModel(
		entity: ProjectCategoryEntity
	): ProjectCategoryViewModel {
		return {
			id: entity.id,
			name: entity.name,

			// Map related entities if they exist
			projects: entity.projects
				? ProjectMapper.toViewModels(entity.projects)
				: undefined,
		};
	}

	static toViewModels(
		entities: ProjectCategoryEntity[]
	): ProjectCategoryViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
