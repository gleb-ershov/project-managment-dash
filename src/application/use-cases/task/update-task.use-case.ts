import { ValidationError } from "@/src/domain/errors/application.error";
import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { UpdateTaskDTO, updateTaskSchema } from "../../dtos/task.dto";

export class UpdateTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(id: string, data: UpdateTaskDTO): Promise<TaskEntity> {
		const validatedData = updateTaskSchema.parse(data);

		const existingTask = await this.taskRepository.findById(id);
		if (!existingTask) {
			throw new ValidationError("Task not found");
		}

		const updateData: UpdateTaskDTO = {};

		if (validatedData.title) updateData.title = validatedData.title;
		if (validatedData.dueDate) updateData.dueDate = validatedData.dueDate;
		if (validatedData.status) updateData.status = validatedData.status;
		if ("description" in validatedData)
			updateData.description = validatedData.description;
		if (validatedData.projectId)
			updateData.projectId = validatedData.projectId;
		if (validatedData.externalLinks)
			updateData.externalLinks = validatedData.externalLinks;
		if (validatedData.tags) updateData.tags = validatedData.tags;
		if (validatedData.priority)
			updateData.priority = validatedData.priority;
		
		const updatedTask = await this.taskRepository.update(id, updateData);

		return updatedTask;
	}
}
