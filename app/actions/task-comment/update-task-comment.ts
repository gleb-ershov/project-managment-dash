"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

interface UpdateCommentActionArgs {
	commentId: string;
	userId: string;
	taskId: string;
}

export const updateTaskCommentAction = async (
	args: UpdateCommentActionArgs,
	currentState: unknown,
	formData: FormData
) => {
	try {
		const useCase = Container.getInstance().resolve(
			"UpdateTaskCommentUseCase"
		);
		const { commentId, userId, taskId } = args;
		const content = formData.get("content") as string;
		await useCase.execute(commentId, { content, id: taskId }, userId);
		revalidatePath(`/tasks/${taskId}`);
		return { success: true, status: 200 };
	} catch (error) {}
};
