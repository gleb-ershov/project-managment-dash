import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindTasksByProjectId {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<TaskEntity[]> {
		try {
			const tasks = await this.taskRepository.findByProjectId(id);
			if (!tasks) {
				throw new NotFoundError("No tasks were found in this project");
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
