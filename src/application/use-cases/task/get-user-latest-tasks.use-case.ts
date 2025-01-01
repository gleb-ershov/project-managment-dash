import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { BaseError } from "@/src/domain/errors/base.error";

export interface GetUserLatestTasksOptions {
	userId: string;
	limit?: number;
	status?: "ONGOING" | "TODO";
}

export class GetUserLatestTasksUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute({
		userId,
		limit = 4,
		status = "ONGOING",
	}: GetUserLatestTasksOptions): Promise<TaskEntity[]> {
		try {
			if (!userId) {
				throw new ValidationError("User ID is required");
			}

			return await this.taskRepository.findLatestUserTasks({
				userId,
				limit,
				status,
			});
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
