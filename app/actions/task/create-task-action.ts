"use server";

import { TaskViewModel } from "@/src/application/view-models/task.view-model";
import { TaskMapper } from "./../../../src/application/mappers/task.mapper";

import { Container } from "@/src/infrastructure/container/container";
import { parseExternalLinks } from "@/src/presentation/utils/shared/parse-external-links";
import { parseMultipleValues } from "@/src/presentation/utils/shared/parse-multiple-values";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateTaskActionArgs {
	userId: string;
}

export const createTaskAction = async (
	args: CreateTaskActionArgs,
	currentState: unknown,
	formData: FormData
): Promise<TaskViewModel> => {
	const { userId } = args;

	try {
		const useCase = Container.getInstance().resolve("CreateTaskUseCase");

		// Get form data
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const status = formData.get("status") as TaskStatus;
		const dueDate = formData.get("dueDate") as string;
		const priority = formData.get("priority") as TaskPriority;
		const projectId = formData.get("projectId") as string;

		// Parse arrays
		const memberIds = parseMultipleValues(
			formData.get("members") as string
		);
		const tags = parseMultipleValues(formData.get("tags") as string);
		const externalLinks = parseExternalLinks(
			formData.get("externalLinks") as string
		);

		const task = await useCase.execute({
			title,
			description,
			status,
			dueDate: new Date(dueDate),
			userId,
			memberIds,
			externalLinks,
			priority,
			projectId,
			tags,
		});

		revalidatePath("/");
		return TaskMapper.toViewModel(task);
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
