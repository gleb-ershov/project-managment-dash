"server-only";
import { Container } from "@/src/infrastructure/container/container";
import { getCurrentUser } from "../user/get-current-user";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { QueryResponse } from "../../types/query-response";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { queryErrorHandler } from "../../helpers/query-error-handler";

export const getUserTeamsCount = async (): Promise<QueryResponse<number>> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			throw new UnauthorizedError("Current user not found");
		}
		const teamService = Container.getInstance().resolve("TeamService");
		const count = await teamService.getUserTeamsCount(currentUser.id);
		return querySuccessHandler(count);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching teams count:");
	}
};
