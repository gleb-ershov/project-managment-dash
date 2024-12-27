"use server";

import { Container } from "@/src/infrastructure/container/container";

export const deleteProjectCategoryAction = async (
	categoryId: string
): Promise<void> => {
	try {
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		await PROJECT_CATEGORY_SERVICE.deleteProjectCategory(categoryId);
	} catch (error) {
		throw Error;
	}
};
