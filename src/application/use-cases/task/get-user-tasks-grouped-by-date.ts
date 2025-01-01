import {
	ITaskRepository,
	TaskGroup,
} from "@/src/domain/repositories/task.repository.interface";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class GetUserTasksGroupedByDateUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(userId: string): Promise<TaskGroup[]> {
		try {
			if (!userId) {
				throw new ValidationError("User ID is required");
			}
			return await this.taskRepository.findUserTasksGroupedByDueDate(
				userId
			);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
