import { TaskService } from "@/src/application/services/task.service";
import { PrismaTaskRepository } from "../repositories/prisma.task.repository";
import { prisma } from "@/prisma/db";
import { CreateTaskUseCase } from "@/src/application/use-cases/task/create-task.use-case";
import { DeleteTaskUseCase } from "@/src/application/use-cases/task/delete-task.use-case";
import { GetUserLatestTasksUseCase } from "@/src/application/use-cases/task/get-user-latest-tasks.use-case";
import { FindTaskByIdUseCase } from "@/src/application/use-cases/task/find-task-by-id.use-case";
import { GetUserTasksGroupedByDateUseCase } from "@/src/application/use-cases/task/get-user-tasks-grouped-by-date";
import { UpdateTaskUseCase } from "@/src/application/use-cases/task/update-task.use-case";
import { FindUsersSharedTasksUseCase } from "@/src/application/use-cases/task/find-users-shared-tasks.use-case";

const taskRepository = new PrismaTaskRepository(prisma);
const createTaskUseCase = new CreateTaskUseCase(taskRepository);

const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

const getUserLatestTasksUseCase = new GetUserLatestTasksUseCase(taskRepository);

const findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository);

const getUserTasksGroupedByDateUseCase = new GetUserTasksGroupedByDateUseCase(
	taskRepository
);

const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const findUsersSharedTasksUseCase = new FindUsersSharedTasksUseCase(
	taskRepository
);

export function createTaskService(): TaskService {
	return new TaskService(
		createTaskUseCase,
		updateTaskUseCase,
		deleteTaskUseCase,
		findTaskByIdUseCase,
		getUserLatestTasksUseCase,
		getUserTasksGroupedByDateUseCase,
		findUsersSharedTasksUseCase
	);
}
