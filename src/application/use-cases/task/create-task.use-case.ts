import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { CreateTaskDTO, createtaskSchema } from "../../dtos/task.dto";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(data: CreateTaskDTO): Promise<TaskEntity> {
		try {
			const parseResult = createtaskSchema.safeParse(data);
			if (parseResult.error) {
				throw new ValidationError(
					"Form validation error",
					parseResult.error.flatten()
				);
			}

			const taskEntity = await TaskEntity.create({
				...parseResult.data,
				membersIds: data.membersIds,
			});

			const createdTask = await this.taskRepository.create(taskEntity);
			return createdTask;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
