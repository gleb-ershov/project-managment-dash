"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProjectAction = async (
	userId: string,
	currentState: unknown,
	formState: FormData
): Promise<QueryResponse<ProjectViewModel>> => {
	try {
		const PROJECT_SERVICE =
			Container.getInstance().resolve("ProjectService");

		const DUE_DATE_FIELD_VALUE = new Date(
			formState.get("dueDate") as string
		);
		const CATEGORIES_ID_VALUES = formState.get("categories") as string;
		const MEMBERS_ID_VALUES = formState.get("members") as string;

		const NEW_PROJECT = await PROJECT_SERVICE.createProject({
			title: formState.get("title") as string,
			description: formState.get("description") as string,
			status: formState.get("status") as ProjectStatus,
			dueDate: DUE_DATE_FIELD_VALUE,
			userId,
			membersIds: MEMBERS_ID_VALUES ? MEMBERS_ID_VALUES.split(",") : [],
			categoriesIds: CATEGORIES_ID_VALUES
				? CATEGORIES_ID_VALUES.split(",")
				: [],
		});

		revalidatePath("/");
		return querySuccessHandler(NEW_PROJECT);
	} catch (error) {
		return queryErrorHandler(
			error,
			"Error occurred while creating new project"
		);
	}
};
