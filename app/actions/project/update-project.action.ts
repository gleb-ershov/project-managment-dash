"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (
	projectId: string,
	currentState: unknown,
	formState: FormData
): Promise<QueryResponse<ProjectViewModel>> => {
	try {
		const PROJECT_SERVICE =
			Container.getInstance().resolve("ProjectService");

		const DUE_DATE_FIELD_VALUE =
			new Date(formState.get("dueDate") as string) || "";
		const MEMBERS_ID_VALUES =
			(formState.get("members") as string).split(",") || [];
		const title = (formState.get("title") as string) || "";
		const description = (formState.get("description") as string) || "";
		const status = (formState.get("status") as ProjectStatus) || "";

		const updatedProjectData = {
			...(title.length > 0 && { title }),
			...(description.length > 0 && { description }),
			...(DUE_DATE_FIELD_VALUE.getTime() > 0 && {
				dueDate: DUE_DATE_FIELD_VALUE,
			}),
			...(status.length > 0 && { status }),
			...(MEMBERS_ID_VALUES.length > 0 && {
				membersIds: MEMBERS_ID_VALUES,
			}),
		};

		const UPDATED_PROJECT = await PROJECT_SERVICE.updateProject(
			projectId,
			updatedProjectData
		);

		revalidatePath(`/projects/${projectId}`);
		return querySuccessHandler(UPDATED_PROJECT);
	} catch (error) {
		return queryErrorHandler(
			error,
			"Error occurred while updating project"
		);
	}
};
