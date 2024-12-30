import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { ValidationError } from "@/src/domain/errors/application.error";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { Password } from "@/src/domain/value-objects/password.value-object";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { UpdateUserDTO, updateUserSchema } from "../../dtos/user.dto";

export class UpdateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
		const validatedData = updateUserSchema.safeParse(data);

		if (validatedData.success === false) {
			throw new ValidationError("Invalid data");
		}

		const existingUser = await this.userRepository.findById(id);
		if (!existingUser) {
			throw new ValidationError("User not found");
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
		} = validatedData.data;

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
		if ("description" in validatedData.data)
			updateData.description = validatedData.data.description;
		if (updateData.email) {
			await this.validateBusinessRules(id, updateData.email);
		}

		const updatedUser = await this.userRepository.update(id, updateData);
		return updatedUser;
	}

	private async validateBusinessRules(
		id: string,
		email: Email
	): Promise<void> {
		const existingUser = await this.userRepository.findByEmail(
			email.getValue()
		);
		if (existingUser && existingUser.id !== id) {
			throw new ValidationError("Email already exists");
		}
	}
}
