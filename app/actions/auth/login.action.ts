"use server";

import { loginSchema } from "@/src/application/dtos/auth/auth.dto";
import { ZodError } from "zod";
import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";

export const login = async (data: { email: string; password: string }) => {
	try {
		const validatedData = loginSchema.parse(data);
		const loginUseCase = Container.getInstance().resolve("LoginUseCase");
		const result = await loginUseCase.execute(validatedData);

		return {
			data: result,
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
				message: "Authentication failed",
			},
		};
	}
};
