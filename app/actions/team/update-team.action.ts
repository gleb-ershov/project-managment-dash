"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const updateTeamAction = async (
	teamId: string,
	currentState: unknown,
	formData: FormData
) => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
		};

		const team = await teamService.updateTeam(payload, teamId);
		revalidatePath("/");

		return team;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
