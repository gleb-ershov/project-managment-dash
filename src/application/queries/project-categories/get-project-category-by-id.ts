"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { QueryResponse } from "../../types/query-response";
import { ProjectCategoryViewModel } from "../../view-models/project-category.view-model";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { querySuccessHandler } from "../../helpers/query-success-handler";

export const getProjectCategoryById = async (
	id: string
): Promise<QueryResponse<ProjectCategoryViewModel>> => {
	try {
		const projectCategoryService = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const category = await projectCategoryService.findCategoryById(id);
		return querySuccessHandler(category);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching category:");
	}
};
