import { UserPlan } from "@prisma/client";
import { Email } from "../domain/value-objects/email.value-object";
import { Password } from "../domain/value-objects/password.value-object";

export type UpdateUserArgs = Partial<{
	email: Email;
	password: Password;
	name: string;
	surname: string;
	imageUrl: string;
	plan: UserPlan;
	description?: string;
}>;

export type CreateUserArgs = {
	name: string;
	password: string;
	surname: string;
	email: string;
	plan: "FREE" | "PRO";
	description?: string;
};
