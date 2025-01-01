import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";
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
				throw new NotFoundError("User not found");
			}

			// Generate new token pair
			return JWTService.generateTokenPair({
				userId: user.id,
				email: user.email.getValue(),
			});
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
