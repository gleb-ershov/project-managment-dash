"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const deleteTaskAction = async (taskId: string): Promise<void> => {
	try {
		const taskService = Container.getInstance().resolve("TaskService");
		await taskService.deleteTask(taskId);

		revalidatePath("/");
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
