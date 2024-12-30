import { ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const createprojectSchema = z.object({
	title: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	userId: z.string(),
	dueDate: z.date(),
	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.nullable(),
	status: z.nativeEnum(ProjectStatus).default(ProjectStatus.IN_PROGRESS),
});

export const updateProjectSchema = createprojectSchema
	.omit({ userId: true })
	.partial();

export interface CreateProjectDTO extends z.infer<typeof createprojectSchema> {
	memberIds: string[];
	categoriesIds: string[];
}
export interface UpdateProjectDTO extends z.infer<typeof updateProjectSchema> {
	memberIds?: string[];
}
