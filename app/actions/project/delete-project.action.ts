"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { Container } from "@/src/infrastructure/container/container";
import { redirect } from "next/navigation";

export const deleteProjectAction = async (
	projectId: string
): Promise<QueryResponse<void>> => {
	try {
		const PROJECT_SERVICE =
			Container.getInstance().resolve("ProjectService");
		await PROJECT_SERVICE.deleteProject(projectId);
		redirect("/");
	} catch (error) {
		return queryErrorHandler(error);
	}
};
