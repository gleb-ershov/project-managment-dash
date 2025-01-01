import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import {
	ForbiddenError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { UpdateTaskCommentDTO } from "../../dtos/task-comment.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class UpdateTaskCommentUseCase {
	constructor(
		private taskCommentRepository: ITaskCommentRepository,
		private taskRepository: ITaskRepository
	) {}

	async execute(
		commentId: string,
		dto: UpdateTaskCommentDTO,
		currentUserId: string
	): Promise<TaskCommentEntity> {
		try {
			if (dto.content.length === 0) {
				throw new ValidationError(
					"Comment content should not be empty"
				);
			}

			const task = await this.taskRepository.findById(dto.id);
			if (!task) {
				throw new NotFoundError("Task not found");
			}

			const comment = await this.taskCommentRepository.findById(
				commentId
			);
			if (!comment) {
				throw new NotFoundError("Comment not found");
			}

			if (comment.authorId !== currentUserId) {
				throw new ForbiddenError(
					"Cannot update comment created by other user"
				);
			}

			const updated = comment.update(dto.content);
			return this.taskCommentRepository.update(updated);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
