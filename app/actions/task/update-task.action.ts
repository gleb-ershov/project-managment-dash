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
		const TASK_SERVICE = Container.getInstance().resolve("TaskService");

		// Get form data
		const TITLE_FIELD_VALUE = formData.get("title") as string;
		const DESCRIPTION_FIELD_VALUE = formData.get("description") as string;
		const STATUS_FIELD_VALUE = formData.get("status") as TaskStatus;
		const DUE_DATE_FIELD_VALUE = formData.get("dueDate") as string;
		const PRIORITY_FIELD_VALUE = formData.get("priority") as TaskPriority;
		const MEMBERS_FIELD_VALUE = formData.get("members") as string;

		// Parse arrays
		const TAGS_FIELD_VALUE = parseMultipleValues(
			formData.get("tags") as string
		);
		const EXTERNAL_LINKS_FIELD_VALUE = parseExternalLinks(
			formData.get("externalLinks") as string
		);

		const UPDATED_TASK = await TASK_SERVICE.updateTask(taskId, {
			title: TITLE_FIELD_VALUE,
			status: STATUS_FIELD_VALUE,
			description: DESCRIPTION_FIELD_VALUE,
			dueDate: new Date(DUE_DATE_FIELD_VALUE),
			externalLinks: EXTERNAL_LINKS_FIELD_VALUE,
			priority: PRIORITY_FIELD_VALUE,
			tags: TAGS_FIELD_VALUE,
			membersIds: MEMBERS_FIELD_VALUE.split(","),
		});

		revalidatePath("/");
		return UPDATED_TASK;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
