import { TaskGroup } from "@/src/domain/repositories/task.repository.interface";
import {
	GetUserLatestTasksOptions,
	GetUserLatestTasksUseCase,
} from "../use-cases/task/get-user-latest-tasks.use-case";
import { GetUserTasksGroupedByDateUseCase } from "../use-cases/task/get-user-tasks-grouped-by-date";
import { TaskViewModel } from "../view-models/task.view-model";
import { TaskMapper } from "../mappers/task.mapper";
import { FindTaskByIdUseCase } from "../use-cases/task/find-task-by-id.use-case";
import { CreateTaskUseCase } from "../use-cases/task/create-task.use-case";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";
import { UpdateTaskUseCase } from "../use-cases/task/update-task.use-case";

export interface TaskViewModelGroupWithLabel {
	label: string;
	tasks: TaskViewModel[];
}

export class TaskService {
	constructor(
		private readonly createTaskUseCase: CreateTaskUseCase,
		private readonly updateTaskUseCase: UpdateTaskUseCase,
		// TODO
		private readonly deleteTaskUseCase: DeleteTaskUseCase,
		private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
		private readonly getUserLatestTasksUseCase: GetUserLatestTasksUseCase,
		private readonly getUserTasksGroupedByDateUseCase: GetUserTasksGroupedByDateUseCase
	) {}

	async deleteTask(id: string): Promise<void> {
		await this.deleteTaskUseCase.execute(id);
	}

	async createTask(data: CreateTaskDTO): Promise<TaskViewModel> {
		const task = await this.createTaskUseCase.execute(data);
		return TaskMapper.toViewModel(task);
	}

	async updateTask(id: string, data: UpdateTaskDTO): Promise<TaskViewModel> {
		const task = await this.updateTaskUseCase.execute(id, data);
		return TaskMapper.toViewModel(task);
	}

	async getTaskById(id: string): Promise<TaskViewModel | null> {
		const task = await this.findTaskByIdUseCase.execute(id);
		return task ? TaskMapper.toViewModel(task) : null;
	}

	async getUserLatestTasks(
		options: GetUserLatestTasksOptions
	): Promise<TaskViewModel[]> {
		const tasks = await this.getUserLatestTasksUseCase.execute(options);
		return TaskMapper.toViewModels(tasks);
	}

	async getUserTasksGroupedByDate(
		userId: string
	): Promise<TaskViewModelGroupWithLabel[]> {
		const groups = await this.getUserTasksGroupedByDateUseCase.execute(
			userId
		);
		return groups.map((group: TaskGroup) => ({
			label: group.label,
			tasks: TaskMapper.toViewModels(group.tasks),
		}));
	}
}
