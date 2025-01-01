import { ValidationError } from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";

export class FindUsersSharedTasksUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(
		currentUserId: string,
		userId: string
	): Promise<TaskEntity[]> {
		const tasks = await this.taskRepository.findUsersSharedTasks(
			currentUserId,
			userId
		);
		if (!tasks) {
			throw new ValidationError("No projects was found");
		}

		return tasks;
	}
}
