"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getProjectById = async (
	id: string
): Promise<ProjectViewModel | null> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const project = await projectService.findProjectById(id);
		return project;
	} catch (error) {
		throw new Error("Error fetching project by ID");
	}
};
