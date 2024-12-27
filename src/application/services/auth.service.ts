import { TokenPair } from "@/src/types/jwt";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { LoginUseCase } from "../use-cases/auth/login.use-case";
import { RefreshTokenUseCase } from "../use-cases/auth/refresh-token.use-case";
import { RegisterUseCase } from "../use-cases/auth/register.use-case";

export class AuthService {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly registerUseCase: RegisterUseCase,
		private readonly refreshTokenUseCase: RefreshTokenUseCase
	) {}

	async login(data: LoginDTO): Promise<AuthResponseDTO> {
		const loginResponse = await this.loginUseCase.execute(data);
		return loginResponse;
	}

	async refreshToken(refreshToken: string): Promise<TokenPair> {
		const refreshTokenResponse = await this.refreshTokenUseCase.execute(
			refreshToken
		);
		return refreshTokenResponse;
	}

	async register(data: RegisterDTO): Promise<AuthResponseDTO> {
		const registerResponse = await this.registerUseCase.execute(data);
		return registerResponse;
	}
}
