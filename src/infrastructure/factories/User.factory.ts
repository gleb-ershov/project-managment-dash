import { UserService } from "@/src/application/services/user.service";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-user.use-case";
import { FindUsersByQuery } from "@/src/application/use-cases/user/find-users-by-query.use-case";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.use-case";
import { PrismaUserRepository } from "../repositories/prisma.user.repository";
import { prisma } from "@/prisma/db";

const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const findUsersByQueryUseCase = new FindUsersByQuery(userRepository);

export function createUserService(): UserService {
	return new UserService(
		createUserUseCase,
		getUserUseCase,
		findUsersByQueryUseCase,
		updateUserUseCase
	);
}
