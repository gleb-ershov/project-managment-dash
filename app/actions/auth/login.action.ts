"use server";

import { ZodError } from "zod";
import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";
import { loginSchema } from "@/src/application/dtos/auth.dto";

export const login = async (data: { email: string; password: string }) => {
	try {
		const VALIDATED_DATA = loginSchema.parse(data);
		const AUTH_SERVICE = Container.getInstance().resolve("AuthService");
		const ACTION_RESULT = await AUTH_SERVICE.login(VALIDATED_DATA);

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
