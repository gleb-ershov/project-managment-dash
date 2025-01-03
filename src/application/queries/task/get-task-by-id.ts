"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModel } from "../../view-models/task.view-model";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { queryErrorHandler } from "../../helpers/query-error-handler";

export async function getTaskById(
	id: string
): Promise<QueryResponse<TaskViewModel>> {
	try {
		const taskService = Container.getInstance().resolve("TaskService");
		const task = await taskService.getTaskById(id);
		return querySuccessHandler(task);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching task:");
	}
}
