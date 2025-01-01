import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import {
	InternalServerError,
	NotFoundError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { BaseError } from "@/src/domain/errors/base.error";

export class GetUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository.findById(id);
			if (!user) {
				throw new NotFoundError("User not found");
			}
			return user;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
