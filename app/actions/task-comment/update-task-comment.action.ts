"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { TaskCommentViewModel } from "@/src/application/view-models/task-comment.view-model";
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
): Promise<QueryResponse<TaskCommentViewModel>> => {
	try {
		const taskCommentService =
			Container.getInstance().resolve("TaskCommentService");
		const { commentId, userId, taskId } = args;
		const content = formData.get("content") as string;
		const comment = await taskCommentService.updateTaskComment(
			userId,
			taskId,
			content,
			commentId
		);
		revalidatePath(`/tasks/${taskId}`);
		return querySuccessHandler(comment);
	} catch (error) {
		return queryErrorHandler(error);
	}
};
