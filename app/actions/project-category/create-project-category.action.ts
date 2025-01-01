"use server";
import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { Container } from "@/src/infrastructure/container/container";

export const createProjectCategoryAction = async (
	currentState: unknown,
	formState: FormData
): Promise<QueryResponse<ProjectCategoryViewModel>> => {
	try {
		const PROJECT_CATEGORY_NAME_VALUE = formState.get("name") as string;
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const NEW_PROJECT_CATEGORY =
			await PROJECT_CATEGORY_SERVICE.createProjectCategory({
				name: PROJECT_CATEGORY_NAME_VALUE,
			});
		return querySuccessHandler(NEW_PROJECT_CATEGORY);
	} catch (error) {
		return queryErrorHandler(error, "Error while creating new category");
	}
};
