import { UserEntity } from "../enitites/user.entity";

export interface IUserRepository {
	findById(id: string): Promise<UserEntity | null>;
	findByEmail(email: string): Promise<UserEntity | null>;
	findAllByQuery(query: string): Promise<UserEntity[]>;
	create(user: UserEntity): Promise<UserEntity>;
	update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
	delete(id: string): Promise<void>;
}
