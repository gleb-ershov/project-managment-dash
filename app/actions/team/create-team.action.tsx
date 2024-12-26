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
		const useCase = Container.getInstance().resolve(
			"CreateTeamWithMembersUseCase"
		);

		const members = parseMultipleValues(formData.get("members") as string);

		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			members,
		};

		const team = await useCase.execute(payload, userId);
		revalidatePath("/");

		return team;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
