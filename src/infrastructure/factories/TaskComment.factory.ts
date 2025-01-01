import { PrismaTaskRepository } from "../repositories/prisma.task.repository";
import { prisma } from "@/prisma/db";
import { TaskCommentService } from "@/src/application/services/task-comment.service";
import { PrismaTaskCommentRepository } from "../repositories/prisma.task-comment.repository";
import { CreateTaskCommentUseCase } from "@/src/application/use-cases/task-comment/create-task-comment.use-case";
import { UpdateTaskCommentUseCase } from "@/src/application/use-cases/task-comment/update-task-comment.use-case";
import { DeleteTaskCommentUseCase } from "@/src/application/use-cases/task-comment/delete-task-comment.use-case";

const taskRepository = new PrismaTaskRepository(prisma);
const taskCommentRepository = new PrismaTaskCommentRepository(prisma);
const createTaskCommentUseCase = new CreateTaskCommentUseCase(
	taskCommentRepository,
	taskRepository
);

const updateTaskCommentUseCase = new UpdateTaskCommentUseCase(
	taskCommentRepository,
	taskRepository
);

const deleteTaskCommentUseCase = new DeleteTaskCommentUseCase(
	taskCommentRepository
);

export function createTaskCommentService(): TaskCommentService {
	return new TaskCommentService(
		createTaskCommentUseCase,
		updateTaskCommentUseCase,
		deleteTaskCommentUseCase
	);
}
