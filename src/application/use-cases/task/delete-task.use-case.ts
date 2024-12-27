import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";

export class DeleteTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
