import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { Password } from "@/src/domain/value-objects/password.value-object";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { CreateUserDTO, createUserSchema } from "../../dtos/user.dto";
import {
	DuplicateError,
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class CreateUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(data: CreateUserDTO): Promise<UserEntity> {
		try {
			const existingUser = await this.userRepository.findByEmail(
				data.email
			);
			if (existingUser) {
				throw new DuplicateError("User with this email already exists");
			}

			const parseResult = createUserSchema.safeParse(data);

			if (parseResult.error) {
				throw new ValidationError(
					"Validation error",
					parseResult.error
				);
			}

			const {
				email,
				password,
				name,
				surname,
				imageUrl,
				plan,
				description,
			} = parseResult.data;

			const user = UserEntity.create({
				email: Email.create(email),
				password: await Password.create(password),
				name,
				surname,
				imageUrl,
				plan,
				description,
			});

			await this.userRepository.create(user);
			return user;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
