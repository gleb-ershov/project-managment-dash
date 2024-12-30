"use server";

import { ValidationError } from "@/src/domain/errors/application.error";
import { ZodError } from "zod";
import { Container } from "@/src/infrastructure/container/container";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { revalidatePath } from "next/cache";

export const updateUser = async (
	id: string,
	currentState: unknown,
	formState: FormData
): Promise<UserViewModel> => {
	try {
		const userService = Container.getInstance().resolve("UserService");

		const name = formState.get("name") as string;
		const surname = formState.get("surname") as string;
		const email = formState.get("email") as string;
		const password = formState.get("password") as string;
		const description = formState.get("description") as string;

		const newUserData = {
			...(name.length > 0 && { name }),
			...(surname.length > 0 && { surname }),
			...(email.length > 0 && { email }),
			...(password.length > 0 && { password }),
			...(description.length > 0 && { description }),
		};

		const updatedUser = await userService.updateUser(id, newUserData);
		revalidatePath(`/users/${id}`);
		return updatedUser;
	} catch (error) {
		throw error;
	}
};
