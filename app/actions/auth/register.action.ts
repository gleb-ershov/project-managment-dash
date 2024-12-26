"use server";

import { registerSchema } from "@/src/application/dtos/auth/auth.dto";
import { ZodError } from "zod";
import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";

interface RegisterActionArgs {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const register = async (data: RegisterActionArgs) => {
	try {
		const validatedData = registerSchema.parse(data);
		const registerUseCase =
			Container.getInstance().resolve("RegisterUseCase");
		const result = await registerUseCase.execute(validatedData);

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
