"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { TeamViewModel } from "../../view-models/team.view-model";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";

export const getUserTeams = async (): Promise<
	QueryResponse<TeamViewModel[]>
> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const teamService = Container.getInstance().resolve("TeamService");
		const teams = teamService.getUserTeams(currentUser.id);
		return querySuccessHandler(teams);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching users teams");
	}
};
