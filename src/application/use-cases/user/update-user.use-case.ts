import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import {
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { Password } from "@/src/domain/value-objects/password.value-object";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { UpdateUserDTO, updateUserSchema } from "../../dtos/user.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class UpdateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
		try {
			const parseResult = updateUserSchema.safeParse(data);

			if (parseResult.error) {
				throw new ValidationError(
					"Validation Error",
					parseResult.error
				);
			}

			const existingUser = await this.userRepository.findById(id);
			if (!existingUser) {
				throw new NotFoundError("User not found");
			}

			// Fix later
			if (!existingUser.password) {
				throw new ValidationError("Current password does not exist");
			}

			let updateData: {
				[key: string]: any;
			} = {};
			const {
				email,
				currentPassword,
				newPassword,
				name,
				surname,
				imageUrl,
				plan,
			} = parseResult.data;

			if (email) {
				updateData.email = Email.create(email);
			}

			if (newPassword) {
				if (!currentPassword) {
					throw new ValidationError("Current password is required");
				}

				const isPasswordValid = await existingUser.password.compare(
					currentPassword
				);

				if (!isPasswordValid) {
					throw new ValidationError("Current password is incorrect");
				}

				updateData.password = await Password.create(newPassword);
			}

			if (name) updateData.name = name;
			if (surname) updateData.surname = surname;
			if (imageUrl) updateData.imageUrl = imageUrl;
			if (plan) updateData.plan = plan;
			if ("description" in parseResult.data)
				updateData.description = parseResult.data.description;
			if (updateData.email) {
				await this.validateBusinessRules(id, updateData.email);
			}

			const updatedUser = await this.userRepository.update(
				id,
				updateData
			);
			return updatedUser;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	private async validateBusinessRules(
		id: string,
		email: Email
	): Promise<void> {
		const existingUser = await this.userRepository.findByEmail(
			email.getValue()
		);
		if (existingUser && existingUser.id !== id) {
			throw new DuplicateError("User with this email already exists");
		}
	}
}
