import { CreateTaskCommentUseCase } from "../use-cases/task-comment/create-task-comment.use-case";
import { UpdateTaskCommentUseCase } from "../use-cases/task-comment/update-task-comment.use-case";
import { TaskCommentViewModel } from "../view-models/task-comment.view-model";
import { TaskCommentMapper } from "../mappers/task-comment.mapper";
import { DeleteTaskCommentUseCase } from "../use-cases/task-comment/delete-task-comment.use-case";
import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class TaskCommentService {
	constructor(
		private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,
		private readonly updateTaskCommentUseCase: UpdateTaskCommentUseCase,
		private readonly deleteTaskCommentUseCase: DeleteTaskCommentUseCase
	) {}

	async deleteTaskComment(commentId: string): Promise<void> {
		try {
			await this.deleteTaskCommentUseCase.execute(commentId);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createTaskComment(
		taskId: string,
		content: string,
		authorId: string
	): Promise<TaskCommentViewModel> {
		try {
			const comment = await this.createTaskCommentUseCase.execute(
				{ taskId, content },
				authorId
			);
			return TaskCommentMapper.toViewModel(comment);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateTaskComment(
		currentUserId: string,
		taskId: string,
		content: string,
		commentId: string
	): Promise<TaskCommentViewModel> {
		try {
			const comment = await this.updateTaskCommentUseCase.execute(
				commentId,
				{ id: taskId, content },
				currentUserId
			);
			return TaskCommentMapper.toViewModel(comment);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
