"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const createTaskCommentAction = async (
	taskId: string,
	userId: string,
	currentState: unknown,
	formState: FormData
) => {
	try {
		const useCase = Container.getInstance().resolve(
			"CreateTaskCommentUseCase"
		);
		const content = formState.get("content") as string;
		await useCase.execute({ content, taskId }, userId);
		revalidatePath(`/tasks/${taskId}`);
		return { success: true, status: 200 };
	} catch (error) {}
};