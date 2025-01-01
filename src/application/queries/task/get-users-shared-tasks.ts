"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { TaskViewModel } from "../../view-models/task.view-model";

export const getUsersSharedTasks = async (
	userId: string
): Promise<TaskViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		const currentUserId = currentUser?.id || "";
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
