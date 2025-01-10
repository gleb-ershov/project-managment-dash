	import { UserPlan } from "@prisma/client";
	import { z } from "zod";

	export const userBaseSchema = z.object({
		name: z
			.string()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name must be less than 50 characters"),
		surname: z
			.string()
			.min(2, "Surname must be at least 2 characters")
			.max(50, "Surname must be less than 50 characters"),
		email: z.string().email("Invalid email format"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		imageUrl: z.string().url("Invalid image URL"),
		description: z
			.string()
			.max(500, "Description must be less than 500 characters")
			.nullable(),
		plan: z.nativeEnum(UserPlan).default(UserPlan.FREE),
	});

	export const userBaseWithoutPasswordSchema = userBaseSchema.omit({
		password: true,
	});

	export const createUserSchema = userBaseSchema.extend({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
	});

	export const updateUserSchema = userBaseSchema.partial().extend({
		currentPassword: z.string().optional(),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			)
			.optional(),
	});

	export interface CreateUserDTO extends z.infer<typeof createUserSchema> {}
	export interface UpdateUserDTO extends z.infer<typeof updateUserSchema> {}
