"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModel } from "../../view-models/task.view-model";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";

export const getUserLatestTasks = async (
	limit: number = 4
): Promise<TaskViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const taskService = Container.getInstance().resolve("TaskService");
		const tasks = await taskService.getUserLatestTasks({
			userId: currentUser.id,
			limit,
		});

		return tasks;
	} catch (error) {
		console.error("Error fetching user latest tasks:", error);
		return [];
	}
};
