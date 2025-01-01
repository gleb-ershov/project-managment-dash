"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getUsersSharedProjects = async (
	userId: string,
	currentUserId: string
): Promise<ProjectViewModel[]> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");

		const projects = await projectService.findUsersSharedProjects(
			currentUserId,
			userId
		);
		return projects;
	} catch (error) {
		throw error;
	}
};
