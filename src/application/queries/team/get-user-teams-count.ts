"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";

export const getUserTeamsCount = async (): Promise<number | null> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const teamService = Container.getInstance().resolve("TeamService");
		return await teamService.getUserTeamsCount(currentUser.id);
	} catch (error) {
		console.error("Error fetching user teams:", error);
		return null;
	}
};
