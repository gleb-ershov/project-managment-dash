import { UserMapper } from "./user.mapper";
import { format } from "date-fns";
import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { TaskCommentViewModel } from "../view-models/task-comment.view-model";
import { TaskMapper } from "./task.mapper";

export class TaskCommentMapper {
	static toViewModel(entity: TaskCommentEntity): TaskCommentViewModel {
		return {
			id: entity.id,
			taskId: entity.taskId,
			content: entity.content,
			createdAt: format(entity.createdAt, "PPP"),
			updatedAt: format(entity.updatedAt, "PPP"),

			// Map related entities if they exist
			task: entity.task ? TaskMapper.toViewModel(entity.task) : undefined,

			author: entity.author
				? UserMapper.toViewModel(entity.author)
				: undefined,
		};
	}

	static toViewModels(entities: TaskCommentEntity[]): TaskCommentViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
