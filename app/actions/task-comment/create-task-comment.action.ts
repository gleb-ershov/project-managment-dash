"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { TaskCommentViewModel } from "@/src/application/view-models/task-comment.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const createTaskCommentAction = async (
	taskId: string,
	userId: string,
	currentState: unknown,
	formState: FormData
): Promise<QueryResponse<TaskCommentViewModel>> => {
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
		return querySuccessHandler(comment);
	} catch (error) {
		return queryErrorHandler(error);
	}
};
