"use server";

import { Container } from "@/src/infrastructure/container/container";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { redirect } from "next/navigation";
import { queryErrorHandler } from "@/src/application/helpers/query-error-handler";
import { QueryResponse } from "@/src/application/types/query-response";
import { querySuccessHandler } from "@/src/application/helpers/query-success-handler";

export const updateUserAction = async (
	id: string,
	currentState: unknown,
	formState: FormData
): Promise<QueryResponse<UserViewModel>> => {
	try {
		const userService = Container.getInstance().resolve("UserService");

		const name = formState.get("name") as string;
		const surname = formState.get("surname") as string;
		const email = formState.get("email") as string;
		const description = formState.get("description") as string;

		const newUserData = {
			...(name.length > 0 && { name }),
			...(surname.length > 0 && { surname }),
			...(email.length > 0 && { email }),
			...(description.length > 0 && { description }),
		};

		const user = await userService.updateUser(id, newUserData);
		return querySuccessHandler(user);
	} catch (error) {
		return queryErrorHandler(error);
	} finally {
		redirect(`/users/${id}`);
	}
};
