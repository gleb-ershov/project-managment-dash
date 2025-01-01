"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";

export const getUserFinishedProjectsCount = async (): Promise<
	QueryResponse<number>
> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const count = await projectService.getUserFinishedProjectsCount(
			currentUser.id
		);
		return querySuccessHandler(count);
	} catch (error) {
		return queryErrorHandler(error, "Error projects count:");
	}
};
