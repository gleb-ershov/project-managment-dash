"use server";

import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const createProjectAction = async (
	userId: string,
	currentState: unknown,
	formState: FormData
): Promise<ProjectViewModel> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");

		const dueDate = new Date(formState.get("dueDate") as string);
		const categoriesIds = formState.get("categories") as string;
		const membersIds = formState.get("members") as string;

		const project = await projectService.createProject({
			title: formState.get("title") as string,
			description: formState.get("description") as string,
			status: formState.get("status") as ProjectStatus,
			dueDate,
			userId,
			memberIds: membersIds ? membersIds.split(",") : [],
			categoriesIds: categoriesIds ? categoriesIds.split(",") : [],
		});

		revalidatePath("/");
		return project;
	} catch (error) {
		throw new Error("Failed to create project");
	}
};
