import { ValidationError } from "@/src/domain/errors/application.error";
import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { JWTService } from "@/src/infrastructure/services/jwt.service";
import { TokenPair } from "@/src/types/jwt";

export class RefreshTokenUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(refreshToken: string): Promise<TokenPair> {
		try {
			// Verify refresh token
			const payload = await JWTService.verifyRefreshToken(refreshToken);

			// Check if user still exists
			const user = await this.userRepository.findById(payload.userId);
			if (!user) {
				throw new ValidationError("User not found");
			}

			// Generate new token pair
			return JWTService.generateTokenPair({
				userId: user.id,
				email: user.email.getValue(),
			});
		} catch {
			throw new ValidationError("Invalid refresh token");
		}
	}
}
