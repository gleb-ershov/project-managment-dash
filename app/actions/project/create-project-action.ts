"use server";

import { ProjectMapper } from "@/src/application/mappers/project.mapper";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateProjectActionArgs {
	userId: string;
}

export const createProjectAction = async (
	args: CreateProjectActionArgs,
	currentState: unknown,
	formState: FormData
): Promise<ProjectViewModel> => {
	const { userId } = args;

	const useCase = Container.getInstance().resolve("CreateProjectUseCase");

	const dueDate = new Date(formState.get("dueDate") as string);
	const categoriesIds = formState.get("categories") as string;
	const membersIds = formState.get("members") as string;

	const project = await useCase.execute({
		title: formState.get("title") as string,
		description: formState.get("description") as string,
		status: formState.get("status") as ProjectStatus,
		dueDate,
		userId,
		memberIds: membersIds ? membersIds.split(",") : [],
		categoriesIds: categoriesIds ? categoriesIds.split(",") : [],
	});

	revalidatePath("/");
	return ProjectMapper.toViewModel(project);
};
