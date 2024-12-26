import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { NotFoundError } from "@/src/domain/errors/application.error";
import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { CreateTaskCommentDTO } from "../../dtos/task-comment.dto";

export class CreateTaskCommentUseCase {
	constructor(
		private taskCommentRepository: ITaskCommentRepository,
		private taskRepository: ITaskRepository
	) {}

	async execute(
		dto: CreateTaskCommentDTO,
		authorId: string
	): Promise<TaskCommentEntity> {
		// Verify task exists
		const task = await this.taskRepository.findById(dto.taskId);
		if (!task) {
			throw new NotFoundError("Task not found");
		}

		const comment = TaskCommentEntity.create({
			content: dto.content,
			taskId: dto.taskId,
			authorId,
		});

		return this.taskCommentRepository.create(comment);
	}
}
