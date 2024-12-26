"use server";

import { prisma } from "@/prisma/db";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-user.use-case";
import { ValidationError } from "@/src/domain/errors/application.error";
import { PrismaUserRepository } from "@/src/infrastructure/repositories/prisma.user.repository";
import { ZodError } from "zod";
import { CreateUserDTO } from "@/src/application/dtos/user.dto";

const userRepository = new PrismaUserRepository(prisma);

export const createUser = async (data: CreateUserDTO) => {
	try {
		const createUserUseCase = new CreateUserUseCase(userRepository);
		const user = await createUserUseCase.execute(data);

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
				message: "Failed to create user",
			},
		};
	}
};
