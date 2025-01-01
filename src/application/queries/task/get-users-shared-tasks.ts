"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModel } from "../../view-models/task.view-model";

export const getUsersSharedTasks = async (
	userId: string,
	currentUserId: string
): Promise<TaskViewModel[]> => {
	try {
		const taskService = Container.getInstance().resolve("TaskService");

		const tasks = await taskService.findUsersSharedTasks(
			currentUserId,
			userId
		);
		return tasks;
	} catch (error) {
		throw error;
	}
};
