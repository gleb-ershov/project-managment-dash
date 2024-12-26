import { UserEntity } from "@/src/domain/enitites/user.entity";
import { UserViewModel } from "../view-models/user.view-model";
import { TaskMapper } from "./task.mapper";
import { ProjectMapper } from "./project.mapper";
import { TaskCommentMapper } from "./task-comment.mapper";
import { TeamMemberMapper } from "./team-member.mapper";

export class UserMapper {
	static toViewModel(entity: UserEntity): UserViewModel {
		return {
			id: entity.id,
			name: entity.name,
			surname: entity.surname,
			imageUrl: entity.imageUrl,
			email: entity.email.getValue(), // Since email is a value object
			plan: entity.plan,
			description: entity.description || undefined,

			// Map related entities if they exist
			tasks: entity.tasks
				? TaskMapper.toViewModels(entity.tasks)
				: undefined,
			projects: entity.projects
				? ProjectMapper.toViewModels(entity.projects)
				: undefined,
			teamMembers: entity.teamMemberships
				? TeamMemberMapper.toViewModels(entity.teamMemberships)
				: undefined,
			taskComments: entity.taskComments
				? TaskCommentMapper.toViewModels(entity.taskComments)
				: undefined,
		};
	}

	static toViewModels(entities: UserEntity[]): UserViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
