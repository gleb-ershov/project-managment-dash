import { CreateUserUseCase } from "../use-cases/user/create-user.use-case";
import { GetUserUseCase } from "../use-cases/user/get-user.use-case";
import { UpdateUserUseCase } from "../use-cases/user/update-user.use-case";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { UserViewModel } from "../view-models/user.view-model";
import { UserMapper } from "../mappers/user.mapper";
import { FindUsersByQuery } from "../use-cases/user/find-users-by-query.use-case";
import {
	DatabaseError,
	DuplicateError,
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class UserService {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly getUserUseCase: GetUserUseCase,
		private readonly findUsersByQueryUseCase: FindUsersByQuery,
		private readonly updateUserUseCase: UpdateUserUseCase
	) {}

	async findUsersByQuery(query: string): Promise<UserViewModel[]> {
		try {
			const users = await this.findUsersByQueryUseCase.execute(query);
			return UserMapper.toViewModels(users);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async getUser(id: string): Promise<UserViewModel | null> {
		try {
			const user = await this.getUserUseCase.execute(id);
			return user ? UserMapper.toViewModel(user) : null;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async createUser(fields: CreateUserDTO): Promise<UserViewModel> {
		try {
			const user = await this.createUserUseCase.execute(fields);
			return UserMapper.toViewModel(user);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}

	async updateUser(
		id: string,
		fields: UpdateUserDTO
	): Promise<UserViewModel> {
		try {
			const user = await this.updateUserUseCase.execute(id, {
				...fields,
			});
			return UserMapper.toViewModel(user);
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
