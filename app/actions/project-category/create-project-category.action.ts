"use server";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { Container } from "@/src/infrastructure/container/container";

export const createProjectCategoryAction = async (
	currentState: unknown,
	formState: FormData
): Promise<ProjectCategoryViewModel> => {
	try {
		const name = formState.get("name") as string;
		const projectCategoryService = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const projectCategory =
			await projectCategoryService.createProjectCategory({
				name,
			});
		return projectCategory;
	} catch (error) {
		throw Error;
	}
};
