import { prisma } from "@/prisma/db";
import { AuthService } from "@/src/application/services/auth.service";
import { LoginUseCase } from "@/src/application/use-cases/auth/login.use-case";
import { RefreshTokenUseCase } from "@/src/application/use-cases/auth/refresh-token.use-case";
import { RegisterUseCase } from "@/src/application/use-cases/auth/register.use-case";
import { PrismaUserRepository } from "../repositories/prisma.user.repository";
import { JWTService } from "../services/jwt.service";

const userRepository = new PrismaUserRepository(prisma);

const loginUseCase = new LoginUseCase(userRepository, JWTService);
const registerUseCase = new RegisterUseCase(userRepository, JWTService);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);

export function createAuthService(): AuthService {
	return new AuthService(loginUseCase, registerUseCase, refreshTokenUseCase);
}
