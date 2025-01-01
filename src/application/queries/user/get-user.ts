"server-only";

import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { queryErrorHandler } from "../../helpers/query-error-handler";
import { NotFoundError } from "@/src/domain/errors/application.error";
import { querySuccessHandler } from "../../helpers/query-success-handler";
import { QueryResponse } from "../../types/query-response";

export const getUser = async (
	id: string
): Promise<QueryResponse<UserViewModel>> => {
	try {
		const userService = Container.getInstance().resolve("UserService");
		const user = await userService.getUser(id);
		if (!user) {
			throw new NotFoundError("User not found");
		}
		return querySuccessHandler(user);
	} catch (error) {
		return queryErrorHandler(error, "Error fetching user:");
	}
};
