import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";

export class DeleteTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string): Promise<void> {
		try {
			await this.taskRepository.delete(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
