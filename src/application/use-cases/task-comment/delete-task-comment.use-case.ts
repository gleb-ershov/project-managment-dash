import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";

export class DeleteTaskCommentUseCase {
	constructor(private taskCommentRepository: ITaskCommentRepository) {}

	async execute(id: string): Promise<void> {
		try {
			const comment = await this.taskCommentRepository.findById(id);
			if (!comment) {
				throw new NotFoundError("Comment not found");
			}

			return this.taskCommentRepository.delete(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
