"use server";

import { Container } from "@/src/infrastructure/container/container";
import { parseMultipleValues } from "@/src/presentation/utils/shared/parse-multiple-values";
import { revalidatePath } from "next/cache";

export const createTeamAction = async (
	userId: string,
	currentState: unknown,
	formData: FormData
) => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");

		const members = parseMultipleValues(formData.get("members") as string);

		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			members,
		};

		const team = await teamService.createTeamWithMembers(payload, userId);
		revalidatePath("/");

		return team;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
