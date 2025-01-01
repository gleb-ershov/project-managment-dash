"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { queryErrorHandler } from "../../helpers/query-error-handler";

export const getUsersSharedProjects = async (
	userId: string,
	currentUserId: string
): Promise<QueryResponse<ProjectViewModel[]>> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");

		const projects = await projectService.findUsersSharedProjects(
			currentUserId,
			userId
		);
		return querySuccessHandler(projects);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching projects:");
	}
};
