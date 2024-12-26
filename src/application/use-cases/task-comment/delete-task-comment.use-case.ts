import {
	ForbiddenError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";

export class DeleteTaskCommentUseCase {
	constructor(private taskCommentRepository: ITaskCommentRepository) {}

	async execute(id: string, currentUserId: string): Promise<void> {
		const comment = await this.taskCommentRepository.findById(id);
		if (!comment) {
			throw new NotFoundError("Comment not found");
		}

		if (comment.authorId !== currentUserId) {
			throw new ForbiddenError(
				"Cannot delete comment created by other user"
			);
		}
		return this.taskCommentRepository.delete(id);
	}
}
