"server-only";

import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { Container } from "@/src/infrastructure/container/container";

export const getUser = async (id: string): Promise<UserViewModel | null> => {
	try {
		const userService = Container.getInstance().resolve("UserService");
		const user = await userService.getUser(id);
		return user;
	} catch (error) {
		throw error;
	}
};
