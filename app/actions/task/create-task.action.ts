"use server";

import { TaskViewModel } from "@/src/application/view-models/task.view-model";
import { TaskMapper } from "../../../src/application/mappers/task.mapper";

import { Container } from "@/src/infrastructure/container/container";
import { parseExternalLinks } from "@/src/presentation/utils/parse-external-links";
import { parseMultipleValues } from "@/src/presentation/utils/parse-multiple-values";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { QueryResponse } from "@/src/application/types/query-response";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";

export const createTaskAction = async (
	userId: string,
	currentState: unknown,
	formData: FormData
): Promise<QueryResponse<TaskViewModel>> => {
	try {
		const TASK_SERVICE = Container.getInstance().resolve("TaskService");

		// Get form data
		const TITLE_FIELD_VALUE = formData.get("title") as string;
		const DESCRIPTION_FIELD_VALUE = formData.get("description") as string;
		const STATUS_FIELD_VALUE = formData.get("status") as TaskStatus;
		const DUE_DATE_FIELD_VALUE = formData.get("dueDate") as string;
		const PRIORITY_FIELD_VALUE = formData.get("priority") as TaskPriority;
		const PROJECT_ID = formData.get("projectId") as string;

		// Parse arrays
		const MEMBERS_ID_VALUES = parseMultipleValues(
			formData.get("members") as string
		);
		const TAGS_FIELD_VALUE = parseMultipleValues(
			formData.get("tags") as string
		);
		const EXTERNAL_LINKS_FIELD_VALUE = parseExternalLinks(
			formData.get("externalLinks") as string
		);

		const CREATED_TASK = await TASK_SERVICE.createTask({
			title: TITLE_FIELD_VALUE,
			description: DESCRIPTION_FIELD_VALUE,
			status: STATUS_FIELD_VALUE,
			dueDate: new Date(DUE_DATE_FIELD_VALUE),
			userId,
			membersIds: MEMBERS_ID_VALUES,
			externalLinks: EXTERNAL_LINKS_FIELD_VALUE,
			priority: PRIORITY_FIELD_VALUE,
			projectId: PROJECT_ID,
			tags: TAGS_FIELD_VALUE,
		});

		revalidatePath("/");
		return querySuccessHandler(CREATED_TASK);
	} catch (error) {
		console.error("Error creating task:", error);
		throw queryErrorHandler(error, "Error while creating task");
	}
};
