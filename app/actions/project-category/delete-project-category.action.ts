"use server";

import { Container } from "@/src/infrastructure/container/container";

export const deleteProjectCategoryAction = async (
	categoryId: string
): Promise<void> => {
	try {
		const projectCategoryService = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		await projectCategoryService.deleteProjectCategory(categoryId);
	} catch (error) {
		throw Error;
	}
};
