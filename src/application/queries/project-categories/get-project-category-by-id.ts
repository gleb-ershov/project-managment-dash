"server-only";

import { Container } from "@/src/infrastructure/container/container";

export const getProjectCategoryById = async (id: string) => {
	try {
		const projectCategoryService = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const category = await projectCategoryService.findCategoryById(id);
		return category;
	} catch (error) {}
};
