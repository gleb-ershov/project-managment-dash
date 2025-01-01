"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { QueryResponse } from "../../types/query-response";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getProjectById = async (
	id: string
): Promise<QueryResponse<ProjectViewModel>> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const project = await projectService.findProjectById(id);
		return querySuccessHandler(project);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching project:");
	}
};
