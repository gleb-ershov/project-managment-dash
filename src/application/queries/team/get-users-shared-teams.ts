"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TeamViewModel } from "../../view-models/team.view-model";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";

export const getUsersSharedTeams = async (
	userId: string,
	currentUserId: string
): Promise<QueryResponse<TeamViewModel[]>> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const teams = await teamService.findUsersSharedTeams(
			currentUserId,
			userId
		);
		return querySuccessHandler(teams);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching teams");
	}
};
