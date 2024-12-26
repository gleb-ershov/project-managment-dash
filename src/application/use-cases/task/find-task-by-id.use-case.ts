import { ValidationError } from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";

export class FindTaskByIdUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<TaskEntity | null> {
		const task = await this.taskRepository.findById(id);
		if (!task) {
			throw new ValidationError("Task not found");
		}

		return task;
	}
}
