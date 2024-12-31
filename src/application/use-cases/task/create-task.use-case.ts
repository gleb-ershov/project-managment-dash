import { ITaskRepository } from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { CreateTaskDTO, createtaskSchema } from "../../dtos/task.dto";

export class CreateTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(data: CreateTaskDTO): Promise<TaskEntity> {
		const validatedData = createtaskSchema.parse(data);

		const taskEntity = await TaskEntity.create({
			...validatedData,
			membersIds: data.membersIds,
		});

		const createdTask = await this.taskRepository.create(taskEntity);
		return createdTask;
	}
}
