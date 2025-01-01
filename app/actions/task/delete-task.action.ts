"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { Container } from "@/src/infrastructure/container/container";
import { redirect } from "next/navigation";

export const deleteTaskAction = async (
	taskId: string
): Promise<QueryResponse<void>> => {
	try {
		const TASK_SERVICE = Container.getInstance().resolve("TaskService");
		await TASK_SERVICE.deleteTask(taskId);

		redirect("/");
	} catch (error) {
		return queryErrorHandler(error, "Error while deleting task");
	}
};
