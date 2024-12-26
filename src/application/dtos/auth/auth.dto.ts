import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		),
	name: z.string().min(2, "Name must be at least 2 characters"),
	surname: z.string().min(2, "Surname must be at least 2 characters"),
});

