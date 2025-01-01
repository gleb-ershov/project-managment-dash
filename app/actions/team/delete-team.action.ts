"use server";

import { redirect } from "next/navigation";

import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { Container } from "@/src/infrastructure/container/container";
import { QueryResponse } from "@/src/application/types/query-response";

export const deleteTeamAction = async (
	teamId: string
): Promise<QueryResponse<void>> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		await teamService.deleteTeam(teamId);
		redirect("/");
	} catch (error) {
		return queryErrorHandler(error);
	}
};
