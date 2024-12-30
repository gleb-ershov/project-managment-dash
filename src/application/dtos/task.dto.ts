import { TaskStatus, TaskPriority } from "@prisma/client";
import { z } from "zod";

export const createtaskSchema = z.object({
	title: z
		.string()
		.min(2, "Title must be at least 2 characters")
		.max(100, "Title must be less than 100 characters"),
	userId: z.string(),
	projectId: z.string(),
	priority: z.nativeEnum(TaskPriority).default(TaskPriority.NORMAL),
	status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
	dueDate: z.date(),
	externalLinks: z.array(z.string().url("Invalid URL")).default([]),
	tags: z.array(z.string()).default([]),
	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.nullable(),
});

export const updateTaskSchema = createtaskSchema
	.omit({ userId: true })
	.partial();

export interface CreateTaskDTO extends z.infer<typeof createtaskSchema> {
	memberIds: string[];
}
export interface UpdateTaskDTO extends z.infer<typeof updateTaskSchema> {
	membersIds?: string[];
}
