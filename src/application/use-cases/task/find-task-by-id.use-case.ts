import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindTaskByIdUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<TaskEntity | null> {
		try {
			const task = await this.taskRepository.findById(id);
			if (!task) {
				throw new NotFoundError("Task not found");
			}

			return task;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
