"use server";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { Container } from "@/src/infrastructure/container/container";

export const createProjectCategoryAction = async (
	currentState: unknown,
	formState: FormData
): Promise<ProjectCategoryViewModel> => {
	try {
		const PROJECT_CATEGORY_NAME_VALUE = formState.get("name") as string;
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const NEW_PROJECT_CATEGORY =
			await PROJECT_CATEGORY_SERVICE.createProjectCategory({
				name: PROJECT_CATEGORY_NAME_VALUE,
			});
		return NEW_PROJECT_CATEGORY;
	} catch (error) {
		throw Error;
	}
};
