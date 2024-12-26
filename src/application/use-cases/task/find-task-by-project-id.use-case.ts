import { ValidationError } from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";

export class FindTasksByProjectId {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<TaskEntity[]> {
		const tasks = await this.taskRepository.findByProjectId(id);
		if (!tasks) {
			throw new ValidationError("No tasks were found in this project");
		}

		return tasks;
	}
}
