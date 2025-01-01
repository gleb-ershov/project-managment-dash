import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindUsersSharedTasksUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<TaskEntity[]> {
		try {
			const tasks = await this.taskRepository.findUsersSharedTasks(
				currentUserId,
				userId
			);
			if (!tasks) {
				throw new NotFoundError("No tasks was found");
			}

			return tasks;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
