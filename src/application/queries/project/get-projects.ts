"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { ProjectViewModel } from "../../view-models/project.view-model";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { getCurrentUser } from "../user/get-current-user";

export const getProjectsWithMembers = async (): Promise<ProjectViewModel[]> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const projects = await projectService.findProjectsByUserId(
			currentUser.id
		);
		return projects;
	} catch (error) {
		throw new Error("Error fetching projects");
	}
};
