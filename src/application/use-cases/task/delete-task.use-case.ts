import { ValidationError } from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";

export class DeleteProjectUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<void> {
		const existingTask = await this.taskRepository.findById(id);
		if (!existingTask) {
			throw new ValidationError("Task not found");
		}

		await this.taskRepository.delete(id);
	}
}
