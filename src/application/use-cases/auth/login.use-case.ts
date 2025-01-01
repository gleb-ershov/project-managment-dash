import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import {
	DatabaseError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { IJWTService } from "@/src/domain/services/jwt.service.interface";
import { AuthResponseDTO, LoginDTO } from "../../dtos/auth.dto";
import { BaseError } from "@/src/domain/errors/base.error";

export class LoginUseCase {
	constructor(
		private userRepository: IUserRepository,
		private readonly jwtService: IJWTService
	) {}

	async execute(data: LoginDTO): Promise<AuthResponseDTO> {
		try {
			const user = await this.userRepository.findByEmail(data.email);
			if (!user) {
				throw new NotFoundError("User not found");
			}

			if (!user.password) {
				throw new ValidationError("No password");
			}

			// Verify password
			const isPasswordValid = await user.password.compare(data.password);
			if (!isPasswordValid) {
				throw new ValidationError("Incorrect password");
			}

			// Generate JWT token
			const tokens = await this.jwtService.generateTokenPair({
				userId: user.id,
				email: user.email.getValue(),
			});

			return {
				user: {
					id: user.id,
					email: user.email.getValue(),
					name: user.name,
					surname: user.surname,
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
