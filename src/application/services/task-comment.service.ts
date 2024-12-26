import { CreateTaskCommentUseCase } from "../use-cases/task-comment/create-task-comment.use-case";
import { UpdateTaskCommentUseCase } from "../use-cases/task-comment/update-task-comment.use-case";
import { TaskCommentViewModel } from "../view-models/task-comment.view-model";
import { TaskCommentMapper } from "../mappers/task-comment.mapper";

export class TaskCommentService {
	constructor(
		private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,
		private updateTaskCommentUseCase: UpdateTaskCommentUseCase
	) {}

	async createTaskComment(
		taskId: string,
		content: string,
		authorId: string
	): Promise<TaskCommentViewModel> {
		const comment = await this.createTaskCommentUseCase.execute(
			{ taskId, content },
			authorId
		);
		return TaskCommentMapper.toViewModel(comment);
	}

	async updateTaskComment(
		currentUserId: string,
		taskId: string,
		content: string,
		commentId: string
	): Promise<TaskCommentViewModel> {
		const comment = await this.updateTaskCommentUseCase.execute(
			commentId,
			{ id: taskId, content },
			currentUserId
		);
		return TaskCommentMapper.toViewModel(comment);
	}
}
