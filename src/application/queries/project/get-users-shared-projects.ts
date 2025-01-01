"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getUsersSharedProjects = async (
	userId: string
): Promise<ProjectViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		const currentUserId = currentUser?.id || "";
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
