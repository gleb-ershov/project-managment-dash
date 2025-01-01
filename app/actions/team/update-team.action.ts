"use server";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { TeamViewModel } from "@/src/application/view-models/team.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const updateTeamAction = async (
	teamId: string,
	currentState: unknown,
	formData: FormData
): Promise<QueryResponse<TeamViewModel>> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
		};

		const team = await teamService.updateTeam(payload, teamId);
		revalidatePath("/");

		return querySuccessHandler(team);
	} catch (error) {
		return queryErrorHandler(error);
	}
};
