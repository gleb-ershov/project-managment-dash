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

		console.log("UPDATED PROJ DATA", updatedProjectData);

		const UPDATED_PROJECT = await PROJECT_SERVICE.updateProject(
			projectId,
			updatedProjectData
		);

		revalidatePath(`/projects/${projectId}`);
		return UPDATED_PROJECT;
	} catch (error) {
		console.log("ERROR IS HERE", error);
		throw new Error("Failed to update project");
	}
};
