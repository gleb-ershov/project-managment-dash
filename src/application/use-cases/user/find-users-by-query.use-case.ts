import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { NotFoundError } from "@/src/domain/errors/application.error";
import { UserEntity } from "@/src/domain/enitites/user.entity";

export class FindUsersByQuery {
	constructor(private userRepository: IUserRepository) {}

	async execute(query: string): Promise<UserEntity[]> {
		const users = await this.userRepository.findAllByQuery(query);
		if (!users) {
			throw new NotFoundError("No users were found");
		}
		return users;
	}
}