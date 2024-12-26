"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { TeamViewModel } from "../../view-models/team.view-model";
import { UnauthorizedError } from "@/src/domain/errors/application.error";

export const getUserTeams = async (): Promise<TeamViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const teamService = Container.getInstance().resolve("TeamService");
		const teams = teamService.getUserTeams(currentUser.id);
		return teams;
	} catch (error) {
		console.error("Error fetching user teams:", error);
		return [];
	}
};
