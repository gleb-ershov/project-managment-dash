"server-only";

import { Container } from "@/src/infrastructure/container/container";
import { TeamViewModel } from "../../view-models/team.view-model";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { QueryResponse } from "../../types/query-response";

export const findTeamById = async (
	id: string
): Promise<QueryResponse<TeamViewModel>> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");
		const team = await teamService.findTeamById(id);
		return querySuccessHandler(team);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching team");
	}
};
