import { TaskViewModel } from "./../view-models/task.view-model";
import { TaskGroup } from "@/src/domain/repositories/task.repository.interface";
import {
	GetUserLatestTasksOptions,
	GetUserLatestTasksUseCase,
} from "../use-cases/task/get-user-latest-tasks.use-case";
import { GetUserTasksGroupedByDateUseCase } from "../use-cases/task/get-user-tasks-grouped-by-date";
import { TaskMapper } from "../mappers/task.mapper";
import { FindTaskByIdUseCase } from "../use-cases/task/find-task-by-id.use-case";
import { CreateTaskUseCase } from "../use-cases/task/create-task.use-case";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";
import { UpdateTaskUseCase } from "../use-cases/task/update-task.use-case";
import { DeleteTaskUseCase } from "../use-cases/task/delete-task.use-case";
import { FindUsersSharedTasksUseCase } from "../use-cases/task/find-users-shared-tasks.use-case";
import {
	DatabaseError,
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export interface TaskViewModelGroupWithLabel {
	label: string;
	tasks: TaskViewModel[];
}

export class TaskService {
	constructor(
		private readonly createTaskUseCase: CreateTaskUseCase,
		private readonly updateTaskUseCase: UpdateTaskUseCase,
		private readonly deleteTaskUseCase: DeleteTaskUseCase,
		private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
		private readonly getUserLatestTasksUseCase: GetUserLatestTasksUseCase,
		private readonly getUserTasksGroupedByDateUseCase: GetUserTasksGroupedByDateUseCase,
		private readonly findUsersSharedTasksUseCase: FindUsersSharedTasksUseCase
	) {}

	async findUsersSharedTasks(
		currentUserId: string,
		userId: string
	): Promise<TaskViewModel[]> {
		try {
			const tasks = await this.findUsersSharedTasksUseCase.execute(
				currentUserId,
				userId
			);
			return TaskMapper.toViewModels(tasks);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async deleteTask(id: string): Promise<void> {
		try {
			await this.deleteTaskUseCase.execute(id);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createTask(data: CreateTaskDTO): Promise<TaskViewModel> {
		try {
			const task = await this.createTaskUseCase.execute(data);
			return TaskMapper.toViewModel(task);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateTask(id: string, data: UpdateTaskDTO): Promise<TaskViewModel> {
		try {
			const task = await this.updateTaskUseCase.execute(id, data);
			return TaskMapper.toViewModel(task);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getTaskById(id: string): Promise<TaskViewModel | null> {
		try {
			const task = await this.findTaskByIdUseCase.execute(id);
			return task ? TaskMapper.toViewModel(task) : null;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUserLatestTasks(
		options: GetUserLatestTasksOptions
	): Promise<TaskViewModel[]> {
		try {
			const tasks = await this.getUserLatestTasksUseCase.execute(options);
			return TaskMapper.toViewModels(tasks);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUserTasksGroupedByDate(
		userId: string
	): Promise<TaskViewModelGroupWithLabel[]> {
		try {
			const groups = await this.getUserTasksGroupedByDateUseCase.execute(
				userId
			);
			return groups.map((group: TaskGroup) => ({
				label: group.label,
				tasks: TaskMapper.toViewModels(group.tasks),
			}));
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
