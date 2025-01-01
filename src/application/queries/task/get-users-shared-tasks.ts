"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModel } from "../../view-models/task.view-model";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { queryErrorHandler } from "../../helpers/query-error-handler";

export const getUsersSharedTasks = async (
	userId: string,
	currentUserId: string
): Promise<QueryResponse<TaskViewModel[]>> => {
	try {
		const taskService = Container.getInstance().resolve("TaskService");

		const tasks = await taskService.findUsersSharedTasks(
			currentUserId,
			userId
		);
		return querySuccessHandler(tasks);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching tasks:");
	}
};
