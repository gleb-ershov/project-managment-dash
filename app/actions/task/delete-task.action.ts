"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const deleteTaskAction = async (taskId: string): Promise<void> => {
	try {
		const TASK_SERVICE = Container.getInstance().resolve("TaskService");
		await TASK_SERVICE.deleteTask(taskId);

		revalidatePath("/");
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
