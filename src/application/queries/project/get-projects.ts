"server-only";

import { querySuccessHandler } from "./../../helpers/query-success-handler";

import { Container } from "@/src/infrastructure/container/container";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { getCurrentUser } from "../user/get-current-user";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { QueryResponse } from "../../types/query-response";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getProjectsWithMembers = async (): Promise<
	QueryResponse<ProjectViewModel[]>
> => {
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
		return querySuccessHandler(projects);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching projects:");
	}
};
