import { NotFoundError } from "@/src/domain/errors/application.error";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";

export class DeleteTaskCommentUseCase {
	constructor(private taskCommentRepository: ITaskCommentRepository) {}

	async execute(id: string): Promise<void> {
		const comment = await this.taskCommentRepository.findById(id);
		if (!comment) {
			throw new NotFoundError("Comment not found");
		}

		return this.taskCommentRepository.delete(id);
	}
}
