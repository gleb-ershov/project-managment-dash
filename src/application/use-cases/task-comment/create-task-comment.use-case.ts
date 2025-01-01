import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { CreateTaskCommentDTO } from "../../dtos/task-comment.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateTaskCommentUseCase {
	constructor(
		private taskCommentRepository: ITaskCommentRepository,
		private taskRepository: ITaskRepository
	) {}

	async execute(
		dto: CreateTaskCommentDTO,
		authorId: string
	): Promise<TaskCommentEntity> {
		try {
			const task = await this.taskRepository.findById(dto.taskId);
			if (!task) {
				throw new NotFoundError("Task not found");
			}

			if (dto.content.length === 0) {
				throw new ValidationError("Comment's content can not be empty");
			}

			const comment = TaskCommentEntity.create({
				content: dto.content,
				taskId: dto.taskId,
				authorId,
			});

			return this.taskCommentRepository.create(comment);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
