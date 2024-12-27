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
		const taskCommentService =
			Container.getInstance().resolve("TaskCommentService");
		const content = formState.get("content") as string;
		const comment = await taskCommentService.createTaskComment(
			taskId,
			content,
			userId
		);
		revalidatePath(`/tasks/${taskId}`);
		return comment;
	} catch (error) {
		throw new Error("Error creating task comment: " + error);
	}
};
