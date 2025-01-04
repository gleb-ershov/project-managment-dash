"use server";

import { CreateTeamDTO } from "@/src/application/dtos/team.dto";
import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { TeamViewModel } from "@/src/application/view-models/team.view-model";
import { Container } from "@/src/infrastructure/container/container";
import { parseMultipleValues } from "@/src/presentation/utils/parse-multiple-values";
import { revalidatePath } from "next/cache";

export const createTeamAction = async (
	userId: string,
	currentState: unknown,
	formData: FormData
): Promise<QueryResponse<TeamViewModel>> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const members = parseMultipleValues(formData.get("members") as string);
		const payload: CreateTeamDTO = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			membersIds: members,
		};
		const team = await teamService.createTeamWithMembers(payload, userId);
		revalidatePath("/");
		return querySuccessHandler(team);
	} catch (error) {
		return queryErrorHandler(error);
	}
};
