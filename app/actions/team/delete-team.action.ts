"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const deleteTeamAction = async (teamId: string): Promise<void> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		await teamService.deleteTeam(teamId);
		revalidatePath("/");
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
