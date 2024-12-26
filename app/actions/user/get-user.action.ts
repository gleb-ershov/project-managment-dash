"use server";

import { prisma } from "@/prisma/db";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import { ValidationError } from "@/src/domain/errors/application.error";
import { PrismaUserRepository } from "@/src/infrastructure/repositories/prisma.user.repository";

const userRepository = new PrismaUserRepository(prisma);

export const getUser = async (id: string) => {
	try {
		const getUserUseCase = new GetUserUseCase(userRepository);
		const user = await getUserUseCase.execute(id);

		return {
			data: user,
			error: null,
		};
	} catch (error) {
		if (error instanceof ValidationError) {
			return {
				data: null,
				error: {
					message: error.message,
				},
			};
		}

		return {
			data: null,
			error: {
				message: "Failed to fetch user",
			},
		};
	}
};
