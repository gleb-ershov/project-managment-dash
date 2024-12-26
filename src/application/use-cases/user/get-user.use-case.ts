import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { ValidationError } from "@/src/domain/errors/application.error";
import { UserEntity } from "@/src/domain/enitites/user.entity";

export class GetUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string): Promise<UserEntity | null> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new ValidationError("User not found");
		}
		return user;
	}
}