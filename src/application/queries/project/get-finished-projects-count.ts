"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";

export const getUserFinishedProjectsCount = async (): Promise<number> => {
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
		return count;
	} catch (error) {
		throw new Error("Error fetching finished projects count");
	}
};
