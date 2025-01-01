"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";
import { ProjectStatus } from "@prisma/client";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { QueryResponse } from "../../types/query-response";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { querySuccessHandler } from "../../helpers/query-success-handler";

export interface GetFiltereAndSortedProjectsArgs {
	searchQuery?: string;
	status?: ProjectStatus;
	sortBy?: "latest" | "oldest";
}

export const getFilteredAndSortedProjects = async (
	params: GetFiltereAndSortedProjectsArgs
): Promise<QueryResponse<ProjectViewModel[]>> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const projects = await projectService.findWithFiltersAndSort({
			...params,
			userId: currentUser.id,
		});
		return querySuccessHandler(projects);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching projects:");
	}
};
