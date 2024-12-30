"use server";

import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (
	projectId: string,
	currentState: unknown,
	formState: FormData
): Promise<ProjectViewModel> => {
	try {
		const PROJECT_SERVICE =
			Container.getInstance().resolve("ProjectService");

		const DUE_DATE_FIELD_VALUE = new Date(
			formState.get("dueDate") as string
		);

		const UPDATED_PROJECT = await PROJECT_SERVICE.updateProject(projectId, {
			title: formState.get("title") as string,
			description: formState.get("description") as string,
			status: formState.get("status") as ProjectStatus,
			dueDate: DUE_DATE_FIELD_VALUE,
			memberIds: formState.getAll("members") as string[],
		});

		revalidatePath("/");
		return UPDATED_PROJECT;
	} catch (error) {
		throw new Error("Failed to update project");
	}
};
