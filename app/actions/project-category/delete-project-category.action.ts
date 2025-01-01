"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { Container } from "@/src/infrastructure/container/container";
import { redirect } from "next/navigation";

export const deleteProjectCategoryAction = async (
	categoryId: string
): Promise<QueryResponse<void>> => {
	try {
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		await PROJECT_CATEGORY_SERVICE.deleteProjectCategory(categoryId);
		redirect("/");
	} catch (error) {
		return queryErrorHandler(error, "Error while deleting project");
	}
};
