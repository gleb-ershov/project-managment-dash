"use server";

import { ProjectMapper } from "@/src/application/mappers/project.mapper";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (
	projectId: string,
	currentState: unknown,
	formState: FormData
): Promise<ProjectViewModel> => {
	const useCase = Container.getInstance().resolve("UpdateProjectUseCase");

	const dueDate = new Date(formState.get("dueDate") as string);

	const project = await useCase.execute(projectId, {
		title: formState.get("title") as string,
		description: formState.get("description") as string,
		status: formState.get("status") as ProjectStatus,
		dueDate,
	});

	revalidatePath("/");
	return ProjectMapper.toViewModel(project);
};
