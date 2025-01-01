"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModelGroupWithLabel } from "../../services/task.service";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { getCurrentUser } from "../user/get-current-user";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { QueryResponse } from "../../types/query-response";
import { queryErrorHandler } from "../../helpers/query-error-handler";

export const getUserTasksGroupedByDate = async (): Promise<
	QueryResponse<TaskViewModelGroupWithLabel[]>
> => {
	const currentUser = await getCurrentUser();
	try {
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const taskService = Container.getInstance().resolve("TaskService");
		const tasks = await taskService.getUserTasksGroupedByDate(
			currentUser.id || ""
		);
		return querySuccessHandler(tasks);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching tasks:");
	}
};
