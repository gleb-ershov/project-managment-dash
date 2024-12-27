"use server";

import { ZodError } from "zod";
import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";
import { registerSchema } from "@/src/application/dtos/auth.dto";

interface RegisterActionArgs {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const register = async (data: RegisterActionArgs) => {
	try {
		const VALIDATED_DATA = registerSchema.parse(data);
		const AUTH_SERVICE = Container.getInstance().resolve("AuthService");
		const ACTION_RESULT = await AUTH_SERVICE.register(VALIDATED_DATA);

		return {
			data: ACTION_RESULT,
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
