"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

interface DeleteCommentActionArgs {
	commentId: string;
	taskId: string;
}

export const updateTaskCommentAction = async (
	args: DeleteCommentActionArgs
): Promise<void> => {
	try {
		const taskCommentService =
			Container.getInstance().resolve("TaskCommentService");
		const { commentId, taskId } = args;
		await taskCommentService.deleteTaskComment(commentId);
		revalidatePath(`/tasks/${taskId}`);
	} catch (error) {}
};
