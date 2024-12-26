"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";
import { ProjectStatus } from "@prisma/client";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";

export interface GetFiltereAndSortedProjectsArgs {
	searchQuery?: string;
	status?: ProjectStatus;
	sortBy?: "latest" | "oldest";
}

export const getFilteredAndSortedProjects = async (
	params: GetFiltereAndSortedProjectsArgs
): Promise<ProjectViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const projects = await projectService.findWithFiltersAndSort({
			...params,
			userId: currentUser.id,
		});
		return projects;
	} catch (error) {
		console.error("Error fetching filtered projects:", error);
		throw new Error("Error fetching filtered projects");
	}
};
