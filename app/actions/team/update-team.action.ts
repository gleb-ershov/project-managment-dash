"use server";

import { Container } from "@/src/infrastructure/container/container";
import { revalidatePath } from "next/cache";

export const updateTeamAction = async (
	currentState: unknown,
	formData: FormData
) => {
	try {
		// FIX CREATE

		const useCase = Container.getInstance().resolve("UpdateTeamUseCase");

		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
		};

		const team = await useCase.execute(payload);
		revalidatePath("/");

		return team;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
