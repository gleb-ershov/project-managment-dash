"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { TeamViewModel } from "../../view-models/team.view-model";

export const getUsersSharedTeams = async (
	userId: string
): Promise<TeamViewModel[]> => {
	try {
		const currentUser = await getCurrentUser();
		const currentUserId = currentUser?.id || "";
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
