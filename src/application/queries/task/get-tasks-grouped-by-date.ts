"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModelGroupWithLabel } from "../../services/task.service";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { getCurrentUser } from "../user/get-current-user";

export const getUserTasksGroupedByDate = async (): Promise<
	TaskViewModelGroupWithLabel[]
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
		return tasks;
	} catch (error) {
		console.error("Error fetching user tasks grouped by date:", error);
		return [];
	}
};
