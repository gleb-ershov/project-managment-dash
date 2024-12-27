"use server";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { Container } from "@/src/infrastructure/container/container";

export const updateProjectCategoryAction = async (
	categoryId: string,
	currentState: unknown,
	formState: FormData
): Promise<ProjectCategoryViewModel> => {
	try {
		const PROJECT_CATEGORY_NAME_VALUE = formState.get("name") as string;
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const UPDATED_PROJECT_CATEGORY =
			await PROJECT_CATEGORY_SERVICE.updateProjectCategory(categoryId, {
				name: PROJECT_CATEGORY_NAME_VALUE,
			});
		return UPDATED_PROJECT_CATEGORY;
	} catch (error) {
		throw Error;
	}
};
