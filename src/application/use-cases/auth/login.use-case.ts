import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { AuthResponseDTO } from "../../dtos/auth/auth-response.dto";
import { LoginDTO } from "../../dtos/auth/login.dto";
import { ValidationError } from "@/src/domain/errors/application.error";
import { IJWTService } from "@/src/domain/services/jwt.service.interface";

export class LoginUseCase {
	constructor(
		private userRepository: IUserRepository,
		private readonly jwtService: IJWTService
	) {}

	async execute(data: LoginDTO): Promise<AuthResponseDTO> {
		// Find user by email
		const user = await this.userRepository.findByEmail(data.email);
		if (!user) {
			throw new ValidationError("Invalid credentials");
		}

		// Fix later
		if (!user.password) {
			throw new ValidationError("No password");
		}

		// Verify password
		const isPasswordValid = await user.password.compare(data.password);
		if (!isPasswordValid) {
			throw new ValidationError("Invalid credentials");
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
	}
}
