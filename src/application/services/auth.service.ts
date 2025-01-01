import { TokenPair } from "@/src/types/jwt";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { LoginUseCase } from "../use-cases/auth/login.use-case";
import { RefreshTokenUseCase } from "../use-cases/auth/refresh-token.use-case";
import { RegisterUseCase } from "../use-cases/auth/register.use-case";
import { InternalServerError } from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class AuthService {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly registerUseCase: RegisterUseCase,
		private readonly refreshTokenUseCase: RefreshTokenUseCase
	) {}

	async login(data: LoginDTO): Promise<AuthResponseDTO> {
		try {
			const loginResponse = await this.loginUseCase.execute(data);
			return loginResponse;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async refreshToken(refreshToken: string): Promise<TokenPair> {
		try {
			const refreshTokenResponse = await this.refreshTokenUseCase.execute(
				refreshToken
			);
			return refreshTokenResponse;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async register(data: RegisterDTO): Promise<AuthResponseDTO> {
		try {
			const registerResponse = await this.registerUseCase.execute(data);
			return registerResponse;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
