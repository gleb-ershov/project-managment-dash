import { Email } from "@/src/domain/value-objects/email.value-object";
import { Password } from "@/src/domain/value-objects/password.value-object";
import {
	DuplicateError,
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { IJWTService } from "@/src/domain/services/jwt.service.interface";
import { AuthResponseDTO, RegisterDTO } from "../../dtos/auth.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class RegisterUseCase {
	constructor(
		private userRepository: IUserRepository,
		private readonly jwtService: IJWTService
	) {}

	async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
		try {
			// Create value objects
			const email = Email.create(data.email);
			const password = await Password.create(data.password);

			// Check if user exists
			const existingUser = await this.userRepository.findByEmail(
				data.email
			);
			if (existingUser) {
				throw new DuplicateError("User with this email already exist");
			}

			// Create user entity
			const user = UserEntity.create({
				email,
				password,
				name: data.name,
				surname: data.surname,
				imageUrl: "", // Default value
				plan: "FREE",
				description: null, // Default plan
			});

			// Save user
			const createdUser = await this.userRepository.create(user);

			// Generate JWT token
			const tokens = await this.jwtService.generateTokenPair({
				userId: user.id,
				email: user.email.getValue(),
			});

			return {
				user: {
					id: createdUser.id,
					email: createdUser.email.getValue(),
					name: createdUser.name,
					surname: createdUser.surname,
				},
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			};
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
