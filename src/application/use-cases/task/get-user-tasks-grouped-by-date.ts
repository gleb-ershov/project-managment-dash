import {
	ITaskRepository,
	TaskGroup,
} from "@/src/domain/repositories/task.repository.interface";
import { ValidationError } from "@/src/domain/errors/application.error";

export class GetUserTasksGroupedByDateUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(userId: string): Promise<TaskGroup[]> {
		if (!userId) {
			throw new ValidationError("User ID is required");
		}
		return await this.taskRepository.findUserTasksGroupedByDueDate(userId);
	}
}
