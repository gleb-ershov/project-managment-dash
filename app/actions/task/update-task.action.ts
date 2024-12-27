"use server";

import { TaskViewModel } from "@/src/application/view-models/task.view-model";
import { TaskMapper } from "../../../src/application/mappers/task.mapper";

import { Container } from "@/src/infrastructure/container/container";
import { parseExternalLinks } from "@/src/presentation/utils/shared/parse-external-links";
import { parseMultipleValues } from "@/src/presentation/utils/shared/parse-multiple-values";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTaskAction = async (
	taskId: string,
	currentState: unknown,
	formData: FormData
): Promise<TaskViewModel> => {
	try {
		const taskService = Container.getInstance().resolve("TaskService");

		// Get form data
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const status = formData.get("status") as TaskStatus;
		const dueDate = formData.get("dueDate") as string;
		const priority = formData.get("priority") as TaskPriority;

		// Parse arrays
		const tags = parseMultipleValues(formData.get("tags") as string);
		const externalLinks = parseExternalLinks(
			formData.get("externalLinks") as string
		);

		const task = await taskService.updateTask(taskId, {
			title,
			status,
			description,
			dueDate: new Date(dueDate),
			externalLinks,
			priority,
			tags,
		});

		revalidatePath("/");
		return task;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
