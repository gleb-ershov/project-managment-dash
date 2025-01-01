"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TeamViewModel } from "../../view-models/team.view-model";

export const getUsersSharedTeams = async (
	userId: string,
	currentUserId: string
): Promise<TeamViewModel[]> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const teams = await teamService.findUsersSharedTeams(
			currentUserId,
			userId
		);
		return teams;
	} catch (error) {
		throw error;
	}
};
