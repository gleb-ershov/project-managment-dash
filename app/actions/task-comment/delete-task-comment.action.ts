"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

interface DeleteCommentActionArgs {
	commentId: string;
	taskId: string;
}

export const updateTaskCommentAction = async (
	args: DeleteCommentActionArgs
): Promise<QueryResponse<void>> => {
	try {
		const taskCommentService =
			Container.getInstance().resolve("TaskCommentService");
		const { commentId, taskId } = args;
		const comment = await taskCommentService.deleteTaskComment(commentId);
		revalidatePath(`/tasks/${taskId}`);
		return querySuccessHandler(comment);
	} catch (error) {
		return queryErrorHandler(error);
	}
};
