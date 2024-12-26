"use server";

import { prisma } from "@/prisma/db";
import { ValidationError } from "@/src/domain/errors/application.error";
import { PrismaUserRepository } from "@/src/infrastructure/repositories/prisma.user.repository";
import { ZodError } from "zod";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.use-case";
import { UpdateUserDTO } from "@/src/application/dtos/user.dto";

const userRepository = new PrismaUserRepository(prisma);

export const updateUser = async (id: string, data: UpdateUserDTO) => {
	try {
		const updateUserUseCase = new UpdateUserUseCase(userRepository);
		const user = await updateUserUseCase.execute(id, data);

		return {
			data: user,
			error: null,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				data: null,
				error: {
					message: "Validation failed",
					errors: error.errors.map((err) => ({
						field: err.path.join("."),
						message: err.message,
					})),
				},
			};
		}

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
				message: "Failed to update user",
			},
		};
	}
};
