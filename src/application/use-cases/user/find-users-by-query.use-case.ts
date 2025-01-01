import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import {
	InternalServerError,
	NotFoundError,
} from "@/src/domain/errors/application.error";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class FindUsersByQuery {
	constructor(private userRepository: IUserRepository) {}

	async execute(query: string): Promise<UserEntity[]> {
		try {
			const users = await this.userRepository.findAllByQuery(query);
			if (!users) {
				throw new NotFoundError("No users were found");
			}
			return users;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
