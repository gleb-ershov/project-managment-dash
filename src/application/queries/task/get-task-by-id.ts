import { Container } from "@/src/infrastructure/container/container";
import { TaskViewModel } from "../../view-models/task.view-model";

export async function getTaskById(id: string): Promise<TaskViewModel | null> {
	try {
		const taskService = Container.getInstance().resolve("TaskService");
		const task = taskService.getTaskById(id);
		return task;
	} catch (error) {
		console.error("Error fetching task:", error);
		throw new Error("Failed to fetch task");
	}
}
