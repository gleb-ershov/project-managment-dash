import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { UpdateTaskDTO, updateTaskSchema } from "../../dtos/task.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class UpdateTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string, data: UpdateTaskDTO): Promise<TaskEntity> {
		try {
			const parseResult = updateTaskSchema.safeParse(data);
			if (parseResult.error) {
				throw new ValidationError(
					"Validation error",
					parseResult.error
				);
			}

			const existingTask = await this.taskRepository.findById(id);
			if (!existingTask) {
				throw new NotFoundError("Task not found");
			}

			const updateData: UpdateTaskDTO = {};

			const {
				title,
				dueDate,
				status,
				description,
				projectId,
				externalLinks,
				tags,
				priority,
			} = parseResult.data;

			if (title) updateData.title = title;
			if (dueDate) updateData.dueDate = dueDate;
			if (status) updateData.status = status;
			if (description) updateData.description = description;
			if (projectId) updateData.projectId = projectId;
			if (externalLinks) updateData.externalLinks = externalLinks;
			if (tags) updateData.tags = tags;
			if (priority) updateData.priority = priority;

			const updatedTask = await this.taskRepository.update(
				id,
				updateData
			);

			return updatedTask;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
